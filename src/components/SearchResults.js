import { fuzzyCompare } from "@/utils/SearchUtils";
import { useState, useRef } from "react";
import styles from "@/styles/components.module.css";

export default function SearchResults({ query, sections }) {
  if (query == null || query == "")
    return (
      <div className={styles.searchResultDummy}>Type text to view results</div>
    );

  const items = queryItems(query, sections);
  return (
    <div className={styles.searchResults}>
      <ul>{items}</ul>
    </div>
  );
}

function queryItems(query, sections) {
  const idStr = (item) => item.course_name + " " + item.section_number;

  const resultCount = 5;
  const fuzzyCutoff = 5; // assuming levenshtein disance -- CHANGE IF ALGO CHANGES

  return sections
    .sort((a, b) => {
      return fuzzyCompare(query, idStr(a)) > fuzzyCompare(query, idStr(b))
        ? 1
        : -1;
    })
    .slice(0, resultCount)
    .map((item) => {
      var close = fuzzyCompare(query, idStr(item)) <= fuzzyCutoff;
      // if (!close) return null;

      return (
        <a key={idStr(item)} href={item.link}>
          <div
            className={`${close ? styles.searchResult_close : styles.searchResult_normal}`}
          >
            {item.course_name} {item.section_number}
          </div>
        </a>
      );
    });
}
