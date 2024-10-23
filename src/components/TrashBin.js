import { IoMdTrash } from "react-icons/io";

import { useState } from "react";
import styles from "@/styles/components.module.css";

export default function TrashBin({ onDelete }) {
  const [pressed, setPressed] = useState(false);
  const [status, setStatus] = useState("");

  return (
    <button
      className={styles.button}
      onClick={() => {
        setPressed(true);
        onDelete();
      }}
    >
      <IoMdTrash
        style={{ color: pressed ? "black" : "red" }}
        className={styles.image}
      />
    </button>
  );
}
