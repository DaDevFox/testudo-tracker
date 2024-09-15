import { fuzzyCompare } from "@/utils/SearchUtils";
import { useState, useRef } from "react";
import styles from "@/styles/components.module.css";

import Modal from "@/components/Modal";

export default function SearchResults({ query, sections, runInternalSearch }) {
  if (query == null || query == "")
    return (
      <div className={styles.searchResultDummy}>Type text to view results</div>
    );

  const sectionShortlist = runInternalSearch
    ? queryItems(query, sections)
    : sections;

  return (
    <div className={styles.searchResults}>
      {sections &&
        sections.length > 0 &&
        generateItems(query, sectionShortlist)}
    </div>
  );
}

const idStr = (item) => item.course_id;
const fuzzyCutoff = 5; // assuming levenshtein disance -- CHANGE IF ALGO CHANGES

function queryItems(query, sections) {
  const resultCount = 5;

  query = query.toLowerCase();

  return sections
    .sort((a, b) => {
      return fuzzyCompare(query, idStr(a)) > fuzzyCompare(query, idStr(b))
        ? 1
        : -1;
    })
    .slice(0, resultCount);
}

function generateItems(query, sections) {
  return sections.map((item) => {
    var close = fuzzyCompare(query, idStr(item)) <= fuzzyCutoff;
    // if (!close) return null;

    return (
      <div
        key={idStr(item)}
        // I would like to change the font of the search results...but idk to what...
        className={`${
          close ? styles.searchResult_close : styles.searchResult_normal
        }`}
      >
        {/* We can add more props to the Modal depending on what info we want to use */}
        <Modal
          buttonName={
            item.course_id.split("-")[0] + " " + item.course_id.split("-")[1]
          }
        />
      </div>
    );
  });
}
