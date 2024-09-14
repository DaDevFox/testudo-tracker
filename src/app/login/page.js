"use client";

import "@/styles/globals.css";

import Navbar from "@/components/Navbar";
import styles from "@/styles/AuthBox.module.css";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthBox from "@/components/AuthBox";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function Login(props) {
  const [error, setError] = useState("");

  const router = useRouter();

  const login = (auth, email, password) => {
    setError("");
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setError("Invalid email.");
            break;
          case "auth/email-already-in-use":
            setError("Email already in use.");
            break;
          case "auth/invalid-credential":
            setError("Incorrect email or password");
            break;
          case "auth/missing-email":
            setError("Enter an email");
            break;
          case "auth/missing-password":
            setError("Enter a password");
            break;
          default:
            setError(error.message);
        }
      });
  };
  return (
    <main className="main">
      <Navbar />
      <AuthBox
        title="Log In"
        submitText="Log In"
        allowUsername={false}
        onSubmit={login}
      >
        {error && <p className={styles.error}>{error}</p>}
        <p>
          Don&rsquo;t have an account?{" "}
          <Link
            href="/register"
            style={{ color: "darkblue", textDecoration: "underline" }}
          >
            Register
          </Link>
        </p>
      </AuthBox>
    </main>
  );
}
