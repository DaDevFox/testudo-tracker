// https://nextjs.org/docs/pages/building-your-application/routing/linking-and-navigating
"use client";
import Link from "next/link";
import styles from "@/styles/components.module.css";
import { useUserValue } from "@/utils/UserProvider";

import { useEffect, useState } from "react";

import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function Navbar(props) {
  const currentUser = useUserValue();

  const logout = () => {
    signOut(auth);
  };

  return (
    <header className={styles.navbar}>
      <ul className={styles.navbarContainer}>
        <li
          className={styles.navbarLiItem}
          style={{ position: "absolute", left: "0.625rem" }}
        >
          {currentUser?.email.split("@")[0]}
        </li>
        <li className={styles.navbarLiItem}>
          <Link className={styles.navbarItem} href="/">
            Home
          </Link>
        </li>
        <li className={styles.navbarLiItem}>
          {currentUser == null ? (
            <div></div>
          ) : (
            <Link className={styles.navbarItem} href="search-page">
              Search
            </Link>
          )}
        </li>
        <li className={styles.navbarLiItem}>
          {currentUser == null ? (
            <Link className={styles.navbarItem} href="/register">
              Sign Up
            </Link>
          ) : (
            <Link className={styles.navbarItem} href="/track">
              Track
            </Link>
          )}
        </li>
        <li className={styles.navbarLiItem}>
          {currentUser == null ? (
            <Link className={styles.navbarItem} href="/login">
              Log In
            </Link>
          ) : (
            <Link className={styles.navbarItem} href="/" onClick={logout}>
              Logout
            </Link>
          )}
        </li>
      </ul>
    </header>
  );
}
