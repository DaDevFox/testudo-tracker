"use client";

import styles from "@/styles/track-page.module.css";
import { useEffect, useState } from "react";
import { useUserValue } from "@/utils/UserProvider";
import "@/styles/globals.css";
import axios from "axios";

import TrashBin from "@/components/TrashBin";

let CMSC131sections = [
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
let CMSC132sections = [
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
export default function Track(props) {
  const user = useUserValue();
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchVals = async () => {
      const res = await axios.get(`/api/track?user_email=${user?.email}`);

      console.log(res.data);
      setSections(res.data);
    };

    fetchVals();
  }, []);

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
    <div>
      <Course course="CMSC131">{CMSC131section_num}</Course>

      <Course course="CMSC132">{CMSC132section_num}</Course>
    </div>
  );
}

function Row({ sectionNum, instructor, seatsAval, seats, seatsOpen, status }) {
  const [sections, setSections] = useState(CMSC131sections);
  const removeSection = (index, e) => {
    console.log(sections);
    setSections(
      sections.filter((i) => console.log(i.section) && i.section !== index)
    );
    console.log(sections);
  };
  return (
    <tr className={styles.row}>
      {/* {console.log(CMSC131sections.find((i) => i.section !== "0101"))} */}
      <td>{sectionNum}</td>
      <td>
        <progress value={seatsAval} className={styles.progressBar} />
      </td>
      <td>{seatsOpen}</td>
      <td>{seats}</td>
      <td>{instructor}</td>
      <td>{status}</td>
      <td>
        <button onClick={(e) => removeSection(sectionNum, e)}>
          <TrashBin />
        </button>
      </td>
    </tr>
  );
}

function Course({ children, course }) {
  return (
    <div className={styles.course}>
      <div className={styles.courseName}>{course}</div>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.headerRow}>
            <th>Section</th>
            <th>Availability</th>
            <th>Open Seats</th>
            <th>Total Seats</th>
            <th>Instructor</th>
            <th>Status</th>
            <th></th>
          </tr>
          {children}
        </tbody>
      </table>
    </div>
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
