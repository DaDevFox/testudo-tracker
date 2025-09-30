from __future__ import annotations

import logging
from datetime import datetime, timedelta
from typing import List, Sequence

import requests
from pymongo import MongoClient
from pymongo.collection import Collection

from .config import Settings
from .emails import EmailDispatcher
from .models import Notification, SectionAvailability, WatchRecord
from .parser import SectionParser
from .utils import utcnow

_logger = logging.getLogger(__name__)


class ScraperService:
    """Coordinates data retrieval, parsing, and notification delivery."""

    def __init__(
        self,
        settings: Settings,
        *,
        dry_run: bool = False,
        session: requests.Session | None = None,
    ) -> None:
        self.settings = settings
        self._session = session or requests.Session()
        self._parser = SectionParser()
        self._dispatcher = EmailDispatcher(settings, dry_run=dry_run)
        self._dry_run = dry_run

    def close(self) -> None:
        self._session.close()

    def run_once(self) -> int:
        """Poll Testudo for all watches and dispatch notifications as needed."""

        now = utcnow()
        notifications: List[Notification] = []
        updated_records: List[tuple[WatchRecord, datetime]] = []

        with MongoClient(self.settings.mongodb_uri) as client:
            database = client[self.settings.mongodb_database]
            watches_collection = database[self.settings.watches_collection]
            watch_documents = list(watches_collection.find({}))

            _logger.info("Loaded %d watch records", len(watch_documents))

            for document in watch_documents:
                watch = WatchRecord.from_document(document)
                if not watch.has_recipients():
                    _logger.debug("Skipping %s because no recipients are configured", watch.course_id)
                    continue

                try:
                    matches = self._evaluate_watch(watch)
                except Exception:  # pragma: no cover - defensive logging
                    _logger.exception("Failed to evaluate %s", watch.course_id)
                    continue

                for match in matches:
                    if match.open_seats < self.settings.seat_threshold:
                        continue

                    if not self._should_notify(watch, now):
                        continue

                    notifications.append(Notification(watch=watch, match=match))
                    watch.last_notified_at = now
                    updated_records.append((watch, now))

            sent = self._dispatcher.send(notifications)
            _logger.info("Dispatched %d notification emails", sent)

            if not self._dry_run and updated_records:
                self._persist_notifications(watches_collection, updated_records)

        return len(notifications)

    def _should_notify(self, watch: WatchRecord, now) -> bool:
        last_notified = watch.last_notified_at
        if last_notified is None:
            return True

        cooldown = timedelta(seconds=self.settings.cooldown_seconds)
        return now - last_notified >= cooldown

    def _persist_notifications(
        self,
        collection: Collection,
        records: Sequence[tuple[WatchRecord, datetime]],
    ) -> None:
        for watch, timestamp in records:
            if watch.document_id is None:
                continue
            collection.update_one(
                {"_id": watch.document_id},
                {"$set": {"last_notified_at": timestamp}},
            )

    def _evaluate_watch(self, watch: WatchRecord) -> List[SectionAvailability]:
        url = self.settings.build_search_url(watch.course_prefix)
        response = self._fetch(url)

        if response is None:
            return []

        sections = self._parser.parse(response)
        normalized_target_prof = watch.normalized_professor
        desired_section = watch.section_id

        matches: List[SectionAvailability] = []
        for section in sections:
            if section.section_id != desired_section:
                continue

            if normalized_target_prof and section.normalized_professor != normalized_target_prof:
                continue

            matches.append(section)

        return matches

    def _fetch(self, url: str) -> str | None:
        last_exception: Exception | None = None
        for attempt in range(1, self.settings.request_retries + 1):
            try:
                response = self._session.get(
                    url,
                    headers=self.settings.http_headers(),
                    timeout=self.settings.request_timeout,
                )
                response.raise_for_status()
                return response.text
            except Exception as exc:  # pragma: no cover - network error
                last_exception = exc
                _logger.warning(
                    "Request attempt %d/%d failed: %s",
                    attempt,
                    self.settings.request_retries,
                    exc,
                )
        _logger.error("All request attempts failed for %s", url, exc_info=last_exception)
        return None

__all__ = ["ScraperService"]
