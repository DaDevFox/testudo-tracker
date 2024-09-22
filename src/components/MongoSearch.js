"use client";

import styles from "@/styles/components.module.css";

import { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

import { searchSections } from "@/app/searchSections";

export default function MongoSearch({ searchBarStyle, searchResultsStyle }) {
  const [query, setQuery] = useState("");
  const [sections, setSections] = useState([]);

  useEffect(() => {
    // execute search on state update (and cancel previous?)
    const search = async () => {
      const fetched = await searchSections(query);
      if (typeof fetched != "string") setSections(fetched);
    };

    search();
  }, [query]);

  const onSearchQueryChange = (e) => {
    // update immediate state
    setQuery(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <SearchBar
        style={searchBarStyle}
        onChange={onSearchQueryChange}
      ></SearchBar>
      <SearchResults
        style={searchResultsStyle}
        query={query}
        sections={sections}
        runInternalSearch={false}
      />
    </div>
  );
}
