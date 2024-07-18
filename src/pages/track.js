import styles from "@/styles/page.module.css";
import { useState } from "react";

export default function Track(props) {
  return (
    <div>
      <Row></Row>
      <Row></Row>
    </div>
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
