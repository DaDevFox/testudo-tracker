import React, { useState } from "react";

import styles from "@/styles/components.module.css";
import "@/styles/globals.css";
import "@/styles/search-page.module.css";

const Modal = ({ buttonName, professor, times, open_seats, waitlist }) => {
  // The modal starts off as hidden
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      <div className={styles.btnDiv} onClick={toggleModal}>
        {buttonName}
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
            <button className={styles.modalTrackDiv}>
              Track
              <div className={styles.modalTrackBar}></div>
            </button>

            <h2 className={styles.modalTtile}>Track this Class?</h2>
            <p className={styles.modalInfo}>{buttonName}</p>
            <p className={styles.modalInfo}>Proffessor: {professor}</p>
            <p className={styles.modalInfo}>Timings: MWF 2:30-3:15 PM</p>
            <p className={styles.modalInfo}>Open Seats: 0, Waitlist: 0</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
