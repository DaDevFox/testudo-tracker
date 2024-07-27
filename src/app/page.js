"use client";
import Image from "next/image";
import "@/styles/globals.css";
import styles from "@/styles/page.module.css";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import Navbar from "@/components/Navbar";
import { useState, useEffect, useRef } from "react";
import WebsiteTitle from "@/components/WebsiteTitle";
// import { useApp } from "@/components/useApp";

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

export default function Home() {
  const [query, setQuery] = useState("");
  // const app = useApp();
  //
  // // authenticate DB access user
  // useEffect(() => {
  //   // If no logged in user, log in
  //   if (app && !app.currentUser) {
  //     const anonymousUser = Realm.Credentials.anonymous();
  //     app.logIn(anonymousUser);
  //   }
  // }, [app, app?.currentUser]);

  return (
    <main className="main">
      <Navbar />
      <WebsiteTitle />
      <div className={styles.searchContainer}>
        <SearchBar onChange={(e) => setQuery(e.target.value)} />
        <SearchResults query={query} sections={sections} />
      </div>
    </main>
  );
}
