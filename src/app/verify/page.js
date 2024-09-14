"use client";

import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import "@/styles/verify-page.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function Verify() {
  const [currentUser, setCurrentUser] = useState(null);
  const [time, setTime] = useState(60);
  const [timeActive, setTimeActive] = useState(false);

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setTimeActive(true);
    });
  }, []);

  useEffect(() => {
    let interval = null;
    if (timeActive && time !== 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setTimeActive(false);
      setTime(60);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeActive, time, setTimeActive]);

  useEffect(() => {
    const interval = setInterval(() => {
      currentUser
        ?.reload()
        .then(() => {
          if (currentUser?.emailVerified) {
            clearInterval(interval);
            router.push("/");
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }, 1000);
  }, [router, currentUser]);

  const resendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setTimeActive(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <main className="main">
      <Navbar />
      <div className="verify">
        <div>
          <h2>Verify your email</h2>
          <p>
            <strong>An email has been sent to:</strong>
            <br />
            <span>{currentUser?.email}</span>
          </p>
          <p>
            Follow the instructions in the email and click on the link to verify
            your account.
          </p>
          {timeActive ? (
            <p>
              <strong>Email sent. Try again in {time} seconds.</strong>
            </p>
          ) : (
            <button onClick={resendEmailVerification} className="button">
              Resend Email
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
