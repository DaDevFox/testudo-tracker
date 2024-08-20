import styles from "@/styles/globals.css";
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
