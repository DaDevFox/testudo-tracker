from __future__ import annotations

import logging
import smtplib
from contextlib import contextmanager
from email.message import EmailMessage
from typing import Iterable, Sequence

from .config import Settings
from .models import Notification

_logger = logging.getLogger(__name__)


class EmailDispatcher:
    """Handles SMTP connections and sends notifications."""

    def __init__(self, settings: Settings, *, dry_run: bool = False) -> None:
        self._settings = settings
        self._dry_run = dry_run

    @contextmanager
    def _smtp(self):
        if self._dry_run:
            yield None
            return

        security = self._settings.smtp_security.lower()
        host = self._settings.smtp_host
        port = self._settings.smtp_port

        if security == "ssl":
            server = smtplib.SMTP_SSL(host, port, timeout=30)
        else:
            server = smtplib.SMTP(host, port, timeout=30)

        try:
            if security == "starttls":
                server.starttls()
            if self._settings.smtp_username and self._settings.smtp_password:
                server.login(self._settings.smtp_username, self._settings.smtp_password)
            yield server
        finally:
            try:
                server.quit()
            except Exception:  # pragma: no cover - defensive cleanup
                _logger.debug("SMTP shutdown raised an exception", exc_info=True)

    def send(self, notifications: Sequence[Notification]) -> int:
        if not notifications:
            return 0

        sent_messages = 0
        with self._smtp() as server:
            for notification in notifications:
                for recipient in notification.recipients():
                    message = self._build_message(notification, recipient)
                    if self._dry_run:
                        _logger.info("[dry-run] Would send email to %s: %s", recipient, message["Subject"])
                        sent_messages += 1
                        continue

                    try:
                        server.send_message(message)
                        sent_messages += 1
                        _logger.info("Notification sent to %s", recipient)
                    except Exception:
                        _logger.exception("Failed to send email to %s", recipient)
        return sent_messages

    def _build_message(self, notification: Notification, recipient: str) -> EmailMessage:
        message = EmailMessage()
        message["From"] = self._settings.email_sender
        message["To"] = recipient
        message["Subject"] = notification.subject
        message.set_content(
            notification.body(registration_url=self._settings.registration_url)
        )
        return message


__all__ = ["EmailDispatcher"]
