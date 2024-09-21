"use client";

import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import "@/styles/register-page.css";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/firebase/config";

export default function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const router = useRouter();

  const register = (e) => {
    e.preventDefault();
    setError("");
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        sendEmailVerification(auth.currentUser).then(() => {
          router.push("/verify");
        });
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
    setEmail("");
    setPassword("");
  };

  return (
    <main className="main">
      <Navbar />
      <div className="register">
        <form onSubmit={register}>
          <h1>Sign Up</h1>
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
            Sign Up
          </button>
          {error && <p className="error">{error}</p>}
          <p>
            Already have an account?{" "}
            <Link
              href="/login"
              style={{ color: "darkblue", textDecoration: "underline" }}
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
