from __future__ import annotations

from textwrap import dedent

from testudo_scraper.parser import parse_sections


def test_parse_sections_extracts_open_seats_and_instructor():
    html = dedent(
        """
        <div class="section-info-container">
            <span class="section-id"> 0101 </span>
            <span class="section-instructor">Jane Doe</span>
            <span class="open-seats-count">5</span>
        </div>
        <div class="section-info-container">
            <span class="section-id">0201</span>
            <span class="section-instructor">John Smith</span>
            <span class="open-seats-count">0</span>
        </div>
        """
    )

    sections = parse_sections(html)

    assert len(sections) == 2
    assert sections[0].section_id == "0101"
    assert sections[0].professor == "Jane Doe"
    assert sections[0].open_seats == 5
    assert sections[1].open_seats == 0
