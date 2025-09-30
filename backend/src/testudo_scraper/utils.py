from __future__ import annotations

import datetime as _dt
import logging
import re
from typing import Optional

_SECTION_RE = re.compile(r"(\d{3,4})")
_logger = logging.getLogger(__name__)


def normalize_whitespace(value: str) -> str:
    return " ".join(value.split())


def normalize_professor(value: Optional[str]) -> Optional[str]:
    if value is None:
        return None
    return normalize_whitespace(value).lower()


def normalize_section_id(raw: str) -> str:
    match = _SECTION_RE.search(raw)
    if not match:
        digits = "".join(ch for ch in raw if ch.isdigit())
        if digits:
            return digits.zfill(4)
        return raw.strip()
    section = match.group(1)
    return section.zfill(4)


def parse_int(raw: str, *, default: int = 0) -> int:
    digits = "".join(ch for ch in raw if ch.isdigit())
    if not digits:
        return default
    try:
        return int(digits)
    except ValueError:
        _logger.debug("Unable to parse integer from %s", raw)
        return default


def to_utc(dt: Optional[_dt.datetime]) -> Optional[_dt.datetime]:
    if dt is None:
        return None
    if dt.tzinfo is None:
        return dt.replace(tzinfo=_dt.timezone.utc)
    return dt.astimezone(_dt.timezone.utc)


def utcnow() -> _dt.datetime:
    return _dt.datetime.now(tz=_dt.timezone.utc)


__all__ = [
    "normalize_professor",
    "normalize_section_id",
    "normalize_whitespace",
    "parse_int",
    "to_utc",
    "utcnow",
]
