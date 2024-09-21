"use client";

import "@/styles/globals.css";
import styles from "@/styles/AuthBox.module.css";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import { addUser } from "@/app/createUser";

import AuthBox from "@/components/AuthBox";

import { addUser } from "@/app/createUser";

import AuthBox from "@/components/AuthBox";

import { addUser } from "@/app/createUser";

import AuthBox from "@/components/AuthBox";
import { auth } from "@/firebase/config";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState("");

  const register = (auth, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        sendEmailVerification(auth.currentUser).then(() => {
          router.push("/verify");
        });
        addUser(email);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            setError("Email already in use.");
            break;
          case "auth/invalid-credential":
            setError("Incorrect email or password.");
            break;
          case "auth/invalid-email":
            setError("Invalid email.");
            break;
          case "auth/missing-email":
            setError("Enter an email to register.");
            break;
          case "auth/missing-password":
            setError("Enter a password to register.");
            break;
          default:
            setError(error.message);
        }
      });
  };

  return (
    <AuthBox
      title="Sign Up"
      submitText="Sign Up"
      allowUsername={false}
      onSubmit={register}
    >
      {error && <p className={styles.error}>{error}</p>}
      <p>
        Already have an account?{" "}
        <Link
          href="/login"
          style={{ color: "darkblue", textDecoration: "underline" }}
        >
          Log in
        </Link>
      </p>
    </AuthBox>
  );
}
