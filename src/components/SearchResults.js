import { fuzzyCompare } from "@/utils/SearchUtils";
import { useState, useRef } from "react";

export default function SearchResults({ query, sections }) {
  const resultCount = 5;
  const fuzzyCutoff = 4; // assuming levenshtein disance -- CHANGE IF ALGO CHANGES
  if (query == null || query == "") return <b>Type text to view results</b>;

  const idStr = (item) => item.course_name + " " + item.section_number;

  const items = sections
    .sort((a, b) => {
      return fuzzyCompare(query, idStr(a)) > fuzzyCompare(query, idStr(b))
        ? 1
        : -1;
    })
    .slice(0, resultCount)
    .map((item, index) => {
      return (
        <div key={index}>
          <b>{item.course_name}</b> {item.section_number}
        </div>
      );
    });

  return <ul>{items}</ul>;
}
