"use client";
import Image from "next/image";
import styles from "@/styles/page.module.css";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import Navbar from "@/components/Navbar";
import { useState, useEffect, useRef } from "react";

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

  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.searchContainer}>
        <SearchBar onChange={(e) => setQuery(e.target.value)} />
        <SearchResults query={query} sections={sections} />
      </div>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
