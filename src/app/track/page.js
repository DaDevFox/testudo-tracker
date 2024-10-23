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

  // Gets all the sections that a user tracks
  useEffect(() => {
    const fetchVals = async () => {
      if (!user) return;
      const res = await axios.get(`/api/track?user_email=${user?.email}`);

      console.log(res.data);
      setSections(res.data);
    };
    fetchVals();
  }, [user]);

  // Populates track page with the data for the courses user is tracking
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

  const removeSection = async (course, sectionNum, e) => {
    const res = await axios.delete(
      `/api/track?user_email=${user?.email}&course_id=${course}-${sectionNum}`
    );
    setSectionsData([]);
    setSections(res.data);
  };

  const courses = Object.keys(sectionsData).map((course) => {
    const rows = sectionsData[course].map((section) => {
      return (
        <Row
          key={section.course_id}
          course={course}
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

  function Row({ course, sectionNum, instructor, seats, seatsOpen, status }) {
    return (
      <tr className={styles.row}>
        <td className={styles.rowData}>{sectionNum}</td>
        <td className={styles.rowData}>
          <progress
            value={(seats - seatsOpen) / seats}
            className={styles.progressBar}
          />
        </td>
        <td className={styles.rowData}>{seatsOpen}</td>
        <td className={styles.rowData}>{seats}</td>
        <td className={styles.rowData}>{instructor}</td>
        <td className={styles.rowData}>{status}</td>
        <td>
          <TrashBin
            onDelete={() => removeSection(course, sectionNum)} // delayed by 1s for pretty visual effects
            course={course}
            sectionNum={sectionNum}
          />
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
              <th className={styles.headerRowHeader}>Section</th>
              <th className={styles.headerRowHeader}>Availability</th>
              <th className={styles.headerRowHeader}>Open Seats</th>
              <th className={styles.headerRowHeader}>Total Seats</th>
              <th className={styles.headerRowHeader}>Instructor</th>
              <th className={styles.headerRowHeader}>Status</th>
              <th className={styles.headerRowHeader}></th>
            </tr>
            {children}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className={styles.trackPage}>
      {sections.length == 0 ? (
        <p className={styles.noCourses}>
          Go to the search page in order to start tracking courses.
        </p>
      ) : (
        courses
      )}{" "}
    </div>
  );
}
