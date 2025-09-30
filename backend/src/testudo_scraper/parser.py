from __future__ import annotations

import logging
from typing import Iterable, List

from bs4 import BeautifulSoup

from .models import SectionAvailability
from .utils import normalize_section_id, normalize_whitespace, parse_int

_logger = logging.getLogger(__name__)


class SectionParser:
    """Extracts section availability information from Testudo HTML."""

    def parse(self, html: str) -> List[SectionAvailability]:
        soup = BeautifulSoup(html, "html.parser")
        containers = soup.select("div.section-info-container")
        results: List[SectionAvailability] = []

        for container in containers:
            instructor_el = container.select_one("span.section-instructor")
            section_id_el = container.select_one("span.section-id")
            open_seats_el = container.select_one("span.open-seats-count")

            if not (instructor_el and section_id_el and open_seats_el):
                continue

            section_raw = normalize_section_id(section_id_el.get_text())
            professor = normalize_whitespace(instructor_el.get_text())
            open_seats = parse_int(open_seats_el.get_text(), default=0)

            results.append(
                SectionAvailability(
                    section_id=section_raw,
                    professor=professor,
                    open_seats=open_seats,
                )
            )

        _logger.debug("Parsed %d sections from response", len(results))
        return results


def parse_sections(html: str) -> List[SectionAvailability]:
    return SectionParser().parse(html)


__all__ = ["SectionParser", "parse_sections"]
