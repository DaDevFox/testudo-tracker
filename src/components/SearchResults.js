import { fuzzyCompare } from "@/utils/SearchUtils";
import { useState, useRef } from "react";
import styles from "@/styles/components.module.css";

import Modal from "@/components/Modal";

export default function SearchResults({ query, sections }) {
  
  
  if (query == null || query == "")
    return (
      <div className={styles.searchResultDummy}>Type text to view results</div>
    );

  const items = queryItems(query, sections);

    return (
      
      <div className={styles.searchResults}>
        {items}
      </div>
    );
}

function queryItems(query, sections) {
  const idStr = (item) => item.course_name.toLowerCase() + " " + item.section_number;

  const resultCount = 5;
  const fuzzyCutoff = 5; // assuming levenshtein disance -- CHANGE IF ALGO CHANGES

  query = query.toLowerCase();

  return sections
    .sort((a, b) => {
      return fuzzyCompare(query, idStr(a)) > fuzzyCompare(query, idStr(b))
        ? 1
        : -1;
    })
    .slice(0, resultCount)
    .map((item) => {
      var close = fuzzyCompare(query, idStr(item)) <= fuzzyCutoff;


      return (
        
          <div key={idStr(item)}
          // I would like to change the font of the search results...but idk to what...
            className={`${close ? styles.searchResult_close : styles.searchResult_normal}`}
          >
            {/* We can add more props to the Modal depending on what info we want to use */}
            <Modal buttonName={item.course_name + " " + item.section_number} />
          </div>
      );
    }); 
}
