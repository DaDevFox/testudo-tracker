import styles from "@/styles/page.module.css";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Track(props) {
  return (
    <main className={styles.main}>
      <Navbar />
      <Row></Row>
      <Row></Row>
    </main>
  );
}

function Row(props) {
  return (
    <div>
      <p>{props.classname}CMSC132</p>
      <div>{props.sectionnum}0101</div>
      <Button />
    </div>
  );
}

function Button() {
  const [status, setStatus] = useState(false);

  return (
    <button onClick={() => setStatus(!status)}>
      {`Tracking: ${status ? "No" : "Yes"}`}
    </button>
  );
}
