"use client";

import { useState } from "react";

import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import Navbar from "@/components/Navbar";

import component_styles from "@/styles/components.module.css";
import "@/styles/globals.css";
import styles from "@/styles/search-page.module.css";
import MongoSearch from "@/components/MongoSearch";

const Search = () => {
  // Temp data
  const sections = [
    {
      link: "https://google.com",
      course_name: "CMSC132",
      section_number: "0101",
      times: "MWF 0800-0930",
    },
    {
      link: "https://google.com",
      course_name: "CMSC330",
      section_number: "0102",
      times: "MWF 0800-0930",
    },
    {
      link: "https://google.com",
      course_name: "CMSC351",
      section_number: "0103",
      times: "MWF 0800-0930",
    },
    {
      link: "https://google.com",
      course_name: "CMSC250",
      section_number: "0104",
      times: "MWF 0800-0930",
    },
    {
      link: "https://google.com",
      course_name: "CMSC131",
      section_number: "0104",
      times: "MWF 0800-0930",
    },
    {
      link: "https://google.com",
      course_name: "CMSC216",
      section_number: "0101",
      times: "MWF 0800-0930",
    },
    {
      link: "https://google.com",
      course_name: "MATH240",
      section_number: "0101",
      times: "MWF 0800-0930",
    },
    {
      link: "https://google.com",
      course_name: "SOCY200",
      section_number: "0101",
      times: "MWF 0800-0930",
    },
    {
      link: "https://google.com",
      course_name: "ENGL101",
      section_number: "0101",
      times: "MWF 0800-0930",
    },
    {
      link: "https://google.com",
      course_name: "STAT400",
      section_number: "0101",
      times: "MWF 0800-0930",
    },
    {
      link: "https://google.com",
      course_name: "ENES210",
      section_number: "0101",
      times: "MWF 0800-0930",
    },
    {
      link: "https://google.com",
      course_name: "BMGT201",
      section_number: "0101",
      times: "MWF 0800-0930",
    },
    {
      link: "https://google.com",
      course_name: "BSCI170",
      section_number: "0101",
      times: "MWF 0800-0930",
    },
  ];

  return (
    <main className="main">
      <div className={styles.title_container}>
        <span className={styles.title_span}>
          <h1>Search for a Class</h1>
        </span>
        <h3 className={styles.sem}>This Semester: Fall 2024</h3>
      </div>

      <div className={styles.search_div}>
        {/* Optional Implementation: Make the Search Results dissapear when the user clicks outside of the search bar or results */}
        <MongoSearch
          searchBarStyle={{ borderRadius: "0rem", width: "100%" }}
          searchResultsStyle={{
            marginTop: "0rem",
            width: "100%",
            borderRadius: "0rem",
            transition: "none",
          }}
        />
      </div>
    </main>
  );
};
export default Search;
