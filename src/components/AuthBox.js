import Link from "next/link";
import styles from "@/styles/AuthBox.module.css";

import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function AuthBox({
  allowUsername,
  title,
  submitText,
  onSubmit,
  children,
}) {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitClicked = (e) => {
    e.preventDefault();

    onSubmit(auth, emailOrUsername, password);

    setEmailOrUsername("");
    setPassword("");
  };

  return (
    <div className={styles.authBox}>
      <form onSubmit={submitClicked}>
        <h1>{title}</h1>
        {allowUsername ? (
          <input
            type="text"
            placeholder="Enter Email or Username"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
          />
        ) : (
          <input
            type="email"
            placeholder="Enter Email"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
          />
        )}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          {submitText}
        </button>
        {children}
      </form>
    </div>
  );
}
