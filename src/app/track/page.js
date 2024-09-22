"use client";

import styles from "@/styles/track-page.module.css";
import { useEffect, useState } from "react";
import { useUserValue } from "@/utils/UserProvider";
import "@/styles/globals.css";
import axios from "axios";

export default function Track(props) {
  const user = useUserValue();
  const [sections, setSections] = useState([]);
  const [sectionsPopulated, setSectionsPopulated] = useState(undefined);

  var sectionsAggregated = () => {
    var map = {};

    for (var section in sections) {
      if (!section || typeof section != {}) continue;
      console.log(section);
      var course = section.course_id.split("-")[0];

      if (!course in map) map[course] = [];
      map[course].push(section);
    }

    return map;
  };

  useEffect(() => {
    const fetchVals = async () => {
      if (!user) return;
      const res = await axios.get(`/api/track?user_email=${user?.email}`);

      setSections(res.data);
      setSectionsPopulated(false);
    };

    fetchVals();
  }, [user]);

  useEffect(() => {
    const populateData = async (course, map) => {
      const res = await axios.get(`/api/section?course_id=${course}`);

      var section = null;
      console.log(course);
      for (var i in sections) {
        if (sections[i].course_id == course) {
          map[course] = res.data;
          console.log(map);
          break;
        }
      }
    };

    var map = {};

    for (var i in sections) {
      populateData(sections[i], map);
    }
  }, [sectionsPopulated]);

  const aggregated = sectionsAggregated();
  const courses = Object.keys(aggregated).map((course) => {
    const rows = aggregated[course].map((section) => {
      <Row
        key={section.section}
        sectionNum={section.section}
        instructor={section.instructor}
        seatsAval={(section.seats - section.seatsOpen) / section.seats}
        seats={section.seats}
        seatsOpen={section.seatsOpen}
        status={section.status}
      />;
    });

    return <Course course={course}>{rows}</Course>;
  });

  return <div>{courses}</div>;
}

function Row({ sectionNum, instructor, seatsAval, seats, seatsOpen, status }) {
  return (
    <tr className={styles.row}>
      <td>{sectionNum}</td>
      <td>
        <progress value={seatsAval} className={styles.progressBar} />
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
