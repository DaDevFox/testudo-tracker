import styles from "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import "@/styles/register-page.css";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const register = (e) => {
    e.preventDefault();
    setError("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((error) => setError(error.message));
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
