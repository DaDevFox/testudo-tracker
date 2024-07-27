// https://nextjs.org/docs/pages/building-your-application/routing/linking-and-navigating
import Link from "next/link";
import styles from "@/styles/components.module.css";

export default function Navbar(props) {
  const user = { loggedIn: false };
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
  const renderWithLogin = () => {};

  return (
    <div className={styles.navbar}>
      {user.loggedIn ? renderWithLogin() : renderNoLogin()}
    </div>
  );
}
