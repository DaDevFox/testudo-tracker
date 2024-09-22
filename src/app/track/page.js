"use client";

import styles from "@/styles/track-page.module.css";
import TrashBin from "@/components/TrashBin";
import { useEffect, useState } from "react";
import { useUserValue } from "@/utils/UserProvider";
import "@/styles/globals.css";
import axios from "axios";

export default function Track(props) {
  const user = useUserValue();
  const [sections, setSections] = useState([]);
  const [sectionsData, setSectionsData] = useState({});

  useEffect(() => {
    const fetchVals = async () => {
      if (!user) return;
      const res = await axios.get(`/api/track?user_email=${user?.email}`);

      setSections(res.data);
    };

    fetchVals();
  }, [user]);

  useEffect(() => {
    const populateData = async () => {
      let map = { ...sectionsData };
      for (const course_id of sections) {
        const res = await axios.get(`/api/section?course_id=${course_id}`);

        var course_name = course_id.split("-")[0];

        if (!map[course_name]) map[course_name] = [];
        map[course_name].push(res.data);
      }
      setSectionsData(map);
    };

    populateData();
  }, [sections]);

  const courses = Object.keys(sectionsData).map((course) => {
    const rows = sectionsData[course].map((section) => {
      return (
        <Row
          key={section.course_id}
          sectionNum={section.course_id.split("-")[1]}
          instructor={section.professor}
          seats={section.total_seats ?? 30}
          seatsOpen={section.open_seats ?? 0}
          status={section.status ?? "CLOSED"}
        />
      );
    });

    return (
      <Course key={course} course={course}>
        {rows}
      </Course>
    );
  });

  return <div className={styles.trackPage}>{courses}</div>;
}

function Row({ sectionNum, instructor, seats, seatsOpen, status }) {
  return (
    <tr className={styles.row}>
      <td>{sectionNum}</td>
      <td>
        <progress
          value={(seats - seatsOpen) / seats}
          className={styles.progressBar}
        />
      </td>
      <td>{seatsOpen}</td>
      <td>{seats}</td>
      <td>{instructor}</td>
      <td>{status}</td>
      <td>
        <button
          className={styles.button}
          // onClick={(e) => removeSection(sectionNum, e)}
        >
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
