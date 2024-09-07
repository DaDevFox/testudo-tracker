// https://nextjs.org/docs/pages/building-your-application/routing/linking-and-navigating
import Link from "next/link";
import styles from "@/styles/components.module.css";

import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function Navbar(props) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);
  // props.user;

  const renderNoLogin = () => {
    return (
      <ul className={styles.navbarContainer}>
        <li className={styles.navbarLiItem}>
          <Link className={styles.navbarItem} href="/">
            Home
          </Link>
        </li>
        <li className={styles.navbarLiItem}>
          <Link className={styles.navbarItem} href="/register">
            Sign Up
          </Link>
        </li>
        <li className={styles.navbarLiItem}>
          <Link className={styles.navbarItem} href="/login">
            Log In
          </Link>
        </li>
      </ul>
    );
  };
  const renderWithLogin = () => {
    return (
      <ul className={styles.navbarContainer}>
        <li className={styles.navbarLiItem}>
          <Link className={styles.navbarItem} href="/">
            Home
          </Link>
        </li>
        <li className={styles.navbarLiItem}>
          <Link className={styles.navbarItem} href="/">
            {currentUser?.email.split("@")[0]}
          </Link>
        </li>
      </ul>
    );
  };

  return (
    <div className={styles.navbar}>
      <ul className={styles.navbarContainer}>
        <li className={styles.navbarLiItem}>
          <Link className={styles.navbarItem} href="/">
            Home
          </Link>
        </li>
        {currentUser == null ? (
          <ul className={styles.navbarContainer}>
            <li className={styles.navbarLiItem}>
              <Link className={styles.navbarItem} href="/register">
                Sign Up
              </Link>
            </li>
            <li className={styles.navbarLiItem}>
              <Link className={styles.navbarItem} href="/login">
                Log In
              </Link>
            </li>
          </ul>
        ) : (
          <ul className={styles.navbarContainer}>
            <li className={styles.navbarLiItem}>
              <Link className={styles.navbarItem} href="/track">
                Track
              </Link>
            </li>
            <li className={styles.navbarLiItem}>
              <Link className={styles.navbarItem} href="/">
                {currentUser?.email.split("@")[0]}
              </Link>
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
}
