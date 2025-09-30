from __future__ import annotations

import logging
import os
from dataclasses import dataclass, field
from pathlib import Path
from typing import Iterable, List, Optional, Sequence

from dotenv import load_dotenv

_DEFAULT_CRON_EXPRESSIONS = (
    "*/30 7-23 * * MON-SAT",
    "*/30 17-23 * * SUN",
)

_TESTUDO_QUERY_SUFFIX = (
    "&_openSectionsOnly=on&creditCompare=&credits=&courseLevelFilter=ALL"
    "&instructor=&_facetoface=on&_blended=on&_online=on&courseStartCompare="
    "&courseStartHour=&courseStartMin=&courseStartAM=&courseEndHour="
    "&courseEndMin=&courseEndAM=&teachingCenter=ALL&_classDay1=on&_classDay2=on"
    "&_classDay3=on&_classDay4=on&_classDay5=on"
)


def _coerce_cron(expressions: Optional[Sequence[str]]) -> List[str]:
    if not expressions:
        return list(_DEFAULT_CRON_EXPRESSIONS)

    coerced: List[str] = []
    for raw in expressions:
        if not raw:
            continue
        for part in str(raw).split(";"):
            value = part.strip()
            if value:
                coerced.append(value)
    return coerced or list(_DEFAULT_CRON_EXPRESSIONS)


def load_environment(env_file: Optional[Path] = None) -> None:
    """Load environment variables from the provided file or common defaults."""

    candidates: List[Path] = []
    if env_file:
        candidates.append(Path(env_file).expanduser())

    cwd = Path.cwd()
    candidates.extend(
        [
            cwd / ".env",
            cwd / ".env.local",
            cwd / "backend" / ".env",
            cwd / "backend" / ".env.local",
        ]
    )

    loaded_any = False
    for path in candidates:
        if path.exists() and path.is_file():
            load_dotenv(path, override=False)
            logging.getLogger(__name__).debug("Loaded environment from %s", path)
            loaded_any = True

    if not loaded_any:
        logging.getLogger(__name__).debug("No environment files discovered; relying on OS values")


@dataclass(slots=True)
class Settings:
    """Strongly typed configuration object for the scraper service."""

    mongodb_uri: str
    mongodb_database: str = "testudo-index"
    watches_collection: str = "user-watches"
    smtp_host: str = "smtp.gmail.com"
    smtp_port: int = 465
    smtp_username: str = ""
    smtp_password: str = ""
    email_sender: str = ""
    smtp_security: str = "ssl"  # ssl | starttls | plain
    term_id: str = "202408"
    cron_expressions: List[str] = field(default_factory=lambda: list(_DEFAULT_CRON_EXPRESSIONS))
    testudo_search_base: str = "https://app.testudo.umd.edu/soc/search"
    registration_url: str = "https://app.testudo.umd.edu/main/dropAdd"
    request_timeout: float = 15.0
    request_retries: int = 3
    seat_threshold: int = 1
    notification_cooldown_minutes: int = 60
    timezone: str = "America/New_York"
    user_agent: str = "testudo-scraper/0.1.0"

    def build_search_url(self, course_prefix: str) -> str:
        return (
            f"{self.testudo_search_base}?courseId={course_prefix}&sectionId=&termId={self.term_id}"
            f"{_TESTUDO_QUERY_SUFFIX}"
        )

    @classmethod
    def from_env(
        cls,
        *,
        cron_override: Optional[Sequence[str]] = None,
    ) -> "Settings":
        env = os.getenv

        mongodb_uri = env("MONGODB_URI")
        if not mongodb_uri:
            raise RuntimeError("MONGODB_URI environment variable is required")

        smtp_username = env("SMTP_USERNAME")
        smtp_password = env("SMTP_PASSWORD")
        email_sender = env("EMAIL_FROM", smtp_username or "")

        if not smtp_username or not smtp_password:
            raise RuntimeError("SMTP_USERNAME and SMTP_PASSWORD environment variables are required")
        if not email_sender:
            raise RuntimeError("EMAIL_FROM environment variable is required")

        cron_env = env("SCRAPER_CRON")
        cron_values: Optional[Sequence[str]]
        if cron_override:
            cron_values = cron_override
        elif cron_env:
            cron_values = [cron_env]
        else:
            cron_values = None

        settings = cls(
            mongodb_uri=mongodb_uri,
            mongodb_database=env("MONGODB_DATABASE", "testudo-index"),
            watches_collection=env("MONGODB_WATCHES_COLLECTION", "user-watches"),
            smtp_host=env("SMTP_HOST", "smtp.gmail.com"),
            smtp_port=int(env("SMTP_PORT", "465")),
            smtp_username=smtp_username,
            smtp_password=smtp_password,
            email_sender=email_sender,
            smtp_security=env("SMTP_SECURITY", "ssl"),
            term_id=env("SCRAPER_TERM_ID", "202408"),
            cron_expressions=_coerce_cron(cron_values),
            testudo_search_base=env("SCRAPER_SEARCH_BASE", "https://app.testudo.umd.edu/soc/search"),
            registration_url=env(
                "SCRAPER_REGISTRATION_URL", "https://app.testudo.umd.edu/main/dropAdd"
            ),
            request_timeout=float(env("SCRAPER_REQUEST_TIMEOUT", "15")),
            request_retries=int(env("SCRAPER_REQUEST_RETRIES", "3")),
            seat_threshold=int(env("SCRAPER_SEAT_THRESHOLD", "1")),
            notification_cooldown_minutes=int(env("SCRAPER_NOTIFICATION_COOLDOWN_MINUTES", "60")),
            timezone=env("SCRAPER_TIMEZONE", "America/New_York"),
            user_agent=env("SCRAPER_USER_AGENT", "testudo-scraper/0.1.0"),
        )

        return settings

    @property
    def cron(self) -> List[str]:
        return list(self.cron_expressions)

    @property
    def cooldown_seconds(self) -> int:
        return int(self.notification_cooldown_minutes * 60)

    def http_headers(self) -> dict[str, str]:
        return {
            "User-Agent": self.user_agent,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        }


__all__ = ["Settings", "load_environment", "_DEFAULT_CRON_EXPRESSIONS"]
