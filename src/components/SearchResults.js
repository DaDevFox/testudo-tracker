import { fuzzyCompare } from "@/utils/SearchUtils";
import { useState, useRef } from "react";
import styles from "@/styles/page.module.css";

export default function SearchResults({ query, sections }) {
  const resultCount = 5;
  const fuzzyCutoff = 5; // assuming levenshtein disance -- CHANGE IF ALGO CHANGES
  if (query == null || query == "")
    return (
      <div className={styles.searchResultDummy}>Type text to view results</div>
    );

  const idStr = (item) => item.course_name + " " + item.section_number;

  const items = sections
    .sort((a, b) => {
      return fuzzyCompare(query, idStr(a)) > fuzzyCompare(query, idStr(b))
        ? 1
        : -1;
    })
    .slice(0, resultCount)
    .map((item, index) => {
      var close = fuzzyCompare(query, idStr(item)) <= fuzzyCutoff;

      return (
        <a href={item.link}>
          <div
            className={`${close ? styles.searchResult_close : styles.searchResult_normal}`}
            key={index}
          >
            {item.course_name} {item.section_number}
          </div>
        </a>
      );
    });

  return (
    <div className={styles.searchResults}>
      <ul>{items}</ul>
    </div>
  );
}
