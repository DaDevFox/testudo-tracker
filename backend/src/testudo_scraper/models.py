from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from typing import Any, Iterable, List, Optional, Sequence

from .utils import normalize_professor, normalize_section_id, normalize_whitespace, to_utc


@dataclass(slots=True)
class WatchRecord:
    course_id: str
    professor: Optional[str]
    emails: List[str]
    document_id: Any = None
    last_notified_at: Optional[datetime] = None

    @classmethod
    def from_document(cls, document: dict[str, Any]) -> "WatchRecord":
        raw_last_notified = document.get("last_notified_at")
        parsed_last_notified: Optional[datetime]
        if isinstance(raw_last_notified, datetime):
            parsed_last_notified = to_utc(raw_last_notified)
        elif isinstance(raw_last_notified, str):
            try:
                parsed_last_notified = datetime.fromisoformat(raw_last_notified)
            except ValueError:
                parsed_last_notified = None
        else:
            parsed_last_notified = None

        emails = [email.strip() for email in document.get("emails", []) if email]

        return cls(
            course_id=str(document.get("course_id")),
            professor=document.get("professor"),
            emails=emails,
            document_id=document.get("_id"),
            last_notified_at=parsed_last_notified,
        )

    @property
    def normalized_professor(self) -> Optional[str]:
        return normalize_professor(self.professor)

    @property
    def course_prefix(self) -> str:
        divider = self.course_id.split("-", 1)
        return divider[0]

    @property
    def section_id(self) -> str:
        divider = self.course_id.split("-", 1)
        if len(divider) == 1:
            return normalize_section_id(divider[0])
        return normalize_section_id(divider[1])

    def has_recipients(self) -> bool:
        return bool(self.emails)


@dataclass(slots=True)
class SectionAvailability:
    section_id: str
    professor: str
    open_seats: int

    @property
    def normalized_professor(self) -> Optional[str]:
        return normalize_professor(self.professor)


@dataclass(slots=True)
class Notification:
    watch: WatchRecord
    match: SectionAvailability

    def recipients(self) -> Sequence[str]:
        return tuple(self.watch.emails)

    @property
    def subject(self) -> str:
        seats = self.match.open_seats
        seat_label = "seat" if seats == 1 else "seats"
        return f"{seats} open {seat_label} in {self.watch.course_id}"

    def body(self, *, registration_url: str) -> str:
        instructor = self.match.professor or "the listed instructor"
        return (
            f"Good news! {self.watch.course_id} has {self.match.open_seats} open "
            f"seat(s) with {instructor}.\n\n"
            f"You can register or adjust your schedule at: {registration_url}\n"
        )


__all__ = [
    "Notification",
    "SectionAvailability",
    "WatchRecord",
]
