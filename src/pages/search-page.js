import { useState } from "react";

import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import Navbar from "@/components/Navbar";

import "@/styles/page.module.css";
import component_styles from "@/styles/components.module.css";
import "@/styles/globals.css";
import styles from "@/styles/search-page.module.css";

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

  // State for the search term in the search bar
  const [query, setQuery] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <main className="main">
      <Navbar />

      <div className={styles.title_container}>
        <span className={styles.title_span}>
          <h1>Search for a Class</h1>
        </span>
        <div className={styles.title_block}></div> {/*the red rectangle*/}
        <h3 className={styles.next_sem}>Upcoming Semester: Fall 2024</h3>
        <div className={styles.subtitle_block}></div> {/*the yellow rectangle*/}
      </div>

      <div className={styles.search_div}>
        <div className={component_styles.searchContainer}>
          {/* Optional Implementation: Make the Search Results dissapear when the user clicks outside of the search bar or results */}
          <SearchBar onChange={(e) => setQuery(e.target.value)} />
          <SearchResults query={query} sections={sections} />
        </div>
      </div>
    </main>
  );
};
export default Search;