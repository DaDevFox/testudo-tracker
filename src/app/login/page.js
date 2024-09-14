"use client";

import "@/styles/globals.css";
import styles from "@/styles/page.module.css";

import Navbar from "@/components/Navbar";
import "@/styles/login-page.css";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const login = (e) => {
    e.preventDefault();
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
    setEmail("");
    setPassword("");
  };
  return (
    <main className="main">
      <Navbar />
      <div className="login">
        <form onSubmit={login}>
          <h1>Log In</h1>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="button">
            Log In
          </button>
          {error && <p className="error">{error}</p>}
          <p>
            Don&rsquo;t have an account?{" "}
            <Link
              href="/register"
              style={{ color: "darkblue", textDecoration: "underline" }}
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
