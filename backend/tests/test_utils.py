from __future__ import annotations

from datetime import datetime, timezone

from testudo_scraper.utils import normalize_professor, normalize_section_id, parse_int, to_utc


def test_normalize_professor_handles_whitespace():
    assert normalize_professor("  Jane   Doe ") == "jane doe"


def test_normalize_section_id_extracts_digits():
    assert normalize_section_id("Section 101-0101") == "0101"
    assert normalize_section_id("0101") == "0101"


def test_parse_int_defaults_when_missing():
    assert parse_int("--") == 0
    assert parse_int(" 10 seats ") == 10


def test_to_utc_normalizes_naive_datetime():
    naive = datetime(2024, 1, 1, 12, 0, 0)
    converted = to_utc(naive)
    assert converted.tzinfo == timezone.utc
