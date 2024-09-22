"use client";
import React, { useState } from "react";

import styles from "@/styles/components.module.css";
import "@/styles/globals.css";
import "@/styles/search-page.module.css";
import TrackButton from "./TrackButton";

import { useUserValue } from "@/utils/UserProvider";
import { trackCourse } from "@/app/actions";

export default function Modal({
  buttonName: course_id,
  professor,
  times,
  waitlist_entries,
  open_seats,
}) {
  const user = useUserValue();

  const trackCourse = async (course_id, email) => {
    const res = await fetch(
      `/api/track?course_id=${course_id}&user_email=${email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res);
    if (!res.ok) {
      throw new Error("Failed to track course");
    }
  };

  // The modal starts off as hidden
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      <div className={styles.btnDiv} onClick={toggleModal}>
        {course_id}
      </div>

      {modal && (
        <div className={styles.modal}>
          <div className={styles.overlay} onClick={toggleModal}></div>

          <div className={styles.modalContent}>
            <div className={styles.modalCloseDiv} onClick={toggleModal}>
              <span>Close</span>
              <div className={styles.modalCloseBar}></div>
            </div>

            {/* Eventually, we should add a pop up when the class is successfully tracked */}
            <TrackButton
              onClick={() =>
                trackCourse(course_id.replace(" ", "-"), user.email)
              }
              classTrackName={course_id}
            />

            <h2 className={styles.modalTtile}>Track this Class?</h2>
            <p className={styles.modalInfo}>{course_id}</p>
            <p className={styles.modalInfo}>Professor: {professor}</p>
            <p className={styles.modalInfo}>Timings: MWF 2:30-3:15 PM</p>
            <p className={styles.modalInfo}>
              Open Seats: {open_seats}, Waitlist: {waitlist_entries}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
