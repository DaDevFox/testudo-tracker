import styles from "@/styles/track-page.css";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import "@/styles/globals.css";

export default function Track(props) {
  const CMSC131sections = [
    {
      course: "CMSC131",
      section: "0101",
      instructor: "Elias Gonzalez",
      seats: 36,
      seatsOpen: 3,
      status: "Open",
    },
    {
      course: "CMSC131",
      section: "0102",
      instructor: "Elias Gonzalez",
      seats: 36,
      seatsOpen: 9,
      status: "Open",
    },
    {
      course: "CMSC131",
      section: "0103",
      instructor: "Elias Gonzalez",
      seats: 36,
      seatsOpen: 0,
      status: "Waitlist Open",
    },
    {
      course: "CMSC131",
      section: "0104",
      instructor: "Elias Gonzalez",
      seats: 36,
      seatsOpen: 12,
      status: "Open",
    },
    {
      course: "CMSC131",
      section: "0105",
      instructor: "Elias Gonzalez",
      seats: 36,
      seatsOpen: 0,
      status: "Waitlist Open",
    },
    {
      course: "CMSC131",
      section: "0201",
      instructor: "Pedram Sadeghian",
      seats: 36,
      seatsOpen: 5,
      status: "Open",
    },
    {
      course: "CMSC131",
      section: "0202",
      instructor: "Pedram Sadeghian",
      seats: 36,
      seatsOpen: 19,
      status: "Open",
    },
    {
      course: "CMSC131",
      section: "0203",
      instructor: "Pedram Sadeghian",
      seats: 36,
      seatsOpen: 0,
      status: "Waitlist Open",
    },
    {
      course: "CMSC131",
      section: "0204",
      instructor: "Pedram Sadeghian",
      seats: 36,
      seatsOpen: 9,
      status: "Open",
    },
    {
      course: "CMSC131",
      section: "0205",
      instructor: "Pedram Sadeghian",
      seats: 36,
      seatsOpen: 3,
      status: "Open",
    },
  ];
  const CMSC132sections = [
    {
      course: "CMSC132",
      section: "0101",
      instructor: "Larry Herman",
      seats: 36,
      seatsOpen: 2,
      status: "Open",
    },
    {
      course: "CMSC132",
      section: "0102",
      instructor: "Larry Herman",
      seats: 36,
      seatsOpen: 1,
      status: "Open",
    },
    {
      course: "CMSC132",
      section: "0103",
      instructor: "Larry Herman",
      seats: 36,
      seatsOpen: 10,
      status: "Open",
    },
    {
      course: "CMSC132",
      section: "0104",
      instructor: "Larry Herman",
      seats: 36,
      seatsOpen: 0,
      status: "Waitlist Open",
    },
    {
      course: "CMSC132",
      section: "0105",
      instructor: "Larry Herman",
      seats: 36,
      seatsOpen: 15,
      status: "Open",
    },
    {
      course: "CMSC132",
      section: "0201",
      instructor: "Nora Burkhauser",
      seats: 36,
      seatsOpen: 7,
      status: "Open",
    },
    {
      course: "CMSC132",
      section: "0202",
      instructor: "Nora Burkhauser",
      seats: 36,
      seatsOpen: 4,
      status: "Open",
    },
    {
      course: "CMSC132",
      section: "0203",
      instructor: "Nora Burkhauser",
      seats: 36,
      seatsOpen: 19,
      status: "Open",
    },
    {
      course: "CMSC132",
      section: "0204",
      instructor: "Nora Burkhauser",
      seats: 36,
      seatsOpen: 8,
      status: "Open",
    },
    {
      course: "CMSC132",
      section: "0205",
      instructor: "Nora Burkhauser",
      seats: 36,
      seatsOpen: 0,
      status: "Waitlist Open",
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
      status={section.status}
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
      status={section.status}
    />
  ));

  return (
    <main className="main">
      <Navbar />
      <Course course="CMSC131">
        <Header />
        {CMSC131section_num}
      </Course>

      <Course course="CMSC132">
        <Header />
        {CMSC132section_num}
      </Course>
    </main>
  );
}

function Row({ sectionNum, instructor, seatsAval, seats, seatsOpen, status }) {
  return (
    <tr className="row">
      <td>{sectionNum}</td>
      <td>
        <progress value={seatsAval} className="progressBar" />
      </td>
      <td>{seatsOpen}</td>
      <td>{seats}</td>
      <td>{instructor}</td>
      <td>{status}</td>
    </tr>
  );
}

function Course({ children, course }) {
  return (
    <div className="course">
      <div className="courseName">{course}</div>
      <table className="table">{children}</table>
    </div>
  );
}

function Header() {
  return (
    <tr className="headerRow">
      <th>Section</th>
      <th>Availability</th>
      <th>Open Seats</th>
      <th>Total Seats</th>
      <th>Instructor</th>
      <th>Status</th>
    </tr>
  );
}

// function Button() {
//   const [tracking, setTracking] = useState(false);

//   return (
//     <button
//       onClick={() => setTracking(!tracking)}
//       className={"button" + (tracking ? "Tracking" : "")}
//     >
//       {tracking ? "Tracking" : "Track"}
//     </button>
//   );
// }
