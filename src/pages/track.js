import styles from "@/styles/track-page.css";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Track(props) {
  const CMSC131sections = [
    {
      course: "CMSC131",
      section: "0101",
      instructor: "Elias Gonzalez",
    },
    { course: "CMSC131", section: "0102", instructor: "Elias Gonzalez" },
    { course: "CMSC131", section: "0103", instructor: "Elias Gonzalez" },
    { course: "CMSC131", section: "0104", instructor: "Elias Gonzalez" },
    { course: "CMSC131", section: "0105", instructor: "Elias Gonzalez" },
    { course: "CMSC131", section: "0201", instructor: "Pedram Sadeghian" },
    { course: "CMSC131", section: "0202", instructor: "Pedram Sadeghian" },
    { course: "CMSC131", section: "0203", instructor: "Pedram Sadeghian" },
    { course: "CMSC131", section: "0204", instructor: "Pedram Sadeghian" },
    { course: "CMSC131", section: "0205", instructor: "Pedram Sadeghian" },
  ];
  const CMSC132sections = [
    { course: "CMSC132", section: "0101", instructor: "Larry Herman" },
    { course: "CMSC132", section: "0102", instructor: "Larry Herman" },
    { course: "CMSC132", section: "0103", instructor: "Larry Herman" },
    { course: "CMSC132", section: "0104", instructor: "Larry Herman" },
    { course: "CMSC132", section: "0105", instructor: "Larry Herman" },
    { course: "CMSC132", section: "0201", instructor: "Nora Burkhauser" },
    { course: "CMSC132", section: "0202", instructor: "Nora Burkhauser" },
    { course: "CMSC132", section: "0203", instructor: "Nora Burkhauser" },
    { course: "CMSC132", section: "0204", instructor: "Nora Burkhauser" },
    { course: "CMSC132", section: "0205", instructor: "Nora Burkhauser" },
  ];

  const CMSC131section_num = CMSC131sections.map((section) => (
    <Row
      key={section.section}
      sectionNum={section.section}
      instructor={section.instructor}
    ></Row>
  ));

  const CMSC132section_num = CMSC132sections.map((section) => (
    <Row
      key={section.section}
      sectionNum={section.section}
      instructor={section.instructor}
    ></Row>
  ));

  return (
    <main className="main">
      <Navbar />
      <Course course="CMSC131">{CMSC131section_num}</Course>
      <Course course="CMSC132">{CMSC132section_num}</Course>
    </main>
  );
}

function Row({ sectionNum, instructor }) {
  return (
    <div className="row">
      <div>{sectionNum}</div>
      <div>{instructor}</div>
      <Button />
    </div>
  );
}

function Course({ children, course }) {
  return (
    <div className="course">
      <div className="courseName">{course}</div>
      {children}
    </div>
  );
}

function Button() {
  const [status, setStatus] = useState(false);

  return (
    <button onClick={() => setStatus(!status)} className="button">
      {`Tracking: ${status ? "Yes" : "No"}`}
    </button>
  );
}
