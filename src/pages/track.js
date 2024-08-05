import styles from "@/styles/track-page.css";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Track(props) {
  const CMSC131sections = [
    {
      course: "CMSC131",
      section: "0101",
      instructor: "Elias Gonzalez",
      seats: 36,
      seatsOpen: 3,
    },
    {
      course: "CMSC131",
      section: "0102",
      instructor: "Elias Gonzalez",
      seats: 36,
      seatsOpen: 9,
    },
    {
      course: "CMSC131",
      section: "0103",
      instructor: "Elias Gonzalez",
      seats: 36,
      seatsOpen: 0,
    },
    {
      course: "CMSC131",
      section: "0104",
      instructor: "Elias Gonzalez",
      seats: 36,
      seatsOpen: 12,
    },
    {
      course: "CMSC131",
      section: "0105",
      instructor: "Elias Gonzalez",
      seats: 36,
      seatsOpen: 0,
    },
    {
      course: "CMSC131",
      section: "0201",
      instructor: "Pedram Sadeghian",
      seats: 36,
      seatsOpen: 5,
    },
    {
      course: "CMSC131",
      section: "0202",
      instructor: "Pedram Sadeghian",
      seats: 36,
      seatsOpen: 19,
    },
    {
      course: "CMSC131",
      section: "0203",
      instructor: "Pedram Sadeghian",
      seats: 36,
      seatsOpen: 0,
    },
    {
      course: "CMSC131",
      section: "0204",
      instructor: "Pedram Sadeghian",
      seats: 36,
      seatsOpen: 9,
    },
    {
      course: "CMSC131",
      section: "0205",
      instructor: "Pedram Sadeghian",
      seats: 36,
      seatsOpen: 3,
    },
  ];
  const CMSC132sections = [
    {
      course: "CMSC132",
      section: "0101",
      instructor: "Larry Herman",
      seats: 36,
      seatsOpen: 2,
    },
    {
      course: "CMSC132",
      section: "0102",
      instructor: "Larry Herman",
      seats: 36,
      seatsOpen: 1,
    },
    {
      course: "CMSC132",
      section: "0103",
      instructor: "Larry Herman",
      seats: 36,
      seatsOpen: 10,
    },
    {
      course: "CMSC132",
      section: "0104",
      instructor: "Larry Herman",
      seats: 36,
      seatsOpen: 0,
    },
    {
      course: "CMSC132",
      section: "0105",
      instructor: "Larry Herman",
      seats: 36,
      seatsOpen: 15,
    },
    {
      course: "CMSC132",
      section: "0201",
      instructor: "Nora Burkhauser",
      seats: 36,
      seatsOpen: 7,
    },
    {
      course: "CMSC132",
      section: "0202",
      instructor: "Nora Burkhauser",
      seats: 36,
      seatsOpen: 4,
    },
    {
      course: "CMSC132",
      section: "0203",
      instructor: "Nora Burkhauser",
      seats: 36,
      seatsOpen: 19,
    },
    {
      course: "CMSC132",
      section: "0204",
      instructor: "Nora Burkhauser",
      seats: 36,
      seatsOpen: 8,
    },
    {
      course: "CMSC132",
      section: "0205",
      instructor: "Nora Burkhauser",
      seats: 36,
      seatsOpen: 0,
    },
  ];

  const CMSC131section_num = CMSC131sections.map((section) => (
    <Row
      key={section.section}
      sectionNum={section.section}
      instructor={section.instructor}
      seatsAval={(section.seats - section.seatsOpen) / section.seats}
      seats={section.seats}
      seatsOpen={section.seatsOpen}
    />
  ));

  const CMSC132section_num = CMSC132sections.map((section) => (
    <Row
      key={section.section}
      sectionNum={section.section}
      instructor={section.instructor}
      seatsAval={(section.seats - section.seatsOpen) / section.seats}
      seats={section.seats}
      seatsOpen={section.seatsOpen}
    />
  ));

  return (
    <main className="main">
      <Navbar />
      <Course course="CMSC131">{CMSC131section_num}</Course>
      <Course course="CMSC132">{CMSC132section_num}</Course>
    </main>
  );
}

function Row({ sectionNum, instructor, seatsAval, seats, seatsOpen }) {
  return (
    <div className="row">
      <div>{sectionNum}</div>
      <progress value={seatsAval} className="progressBar" />
      <div>{seatsOpen}</div>
      <div>{seats}</div>
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
  const [tracking, setTracking] = useState(false);

  return (
    <button
      onClick={() => setTracking(!tracking)}
      className={"button" + (tracking ? "Tracking" : "")}
    >
      {tracking ? "Tracking" : "Track"}
    </button>
  );
}

function Header() {
  return (
    <div>
      <div>Section</div>
      <div>Instructor</div>
    </div>
  );
}
