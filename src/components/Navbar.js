// https://nextjs.org/docs/pages/building-your-application/routing/linking-and-navigating
import Link from "next/link";
import "@/styles/globals.css";

export default function Navbar(props) {
  const user = { loggedIn: false };
  // props.user;

  const renderNoLogin = () => {
    return (
      <ul className="navbarContainer">
        <li className="navbarLiItem">
          <Link className="navbarItem" href="/">
            Home
          </Link>
        </li>
        <li className="navbarLiItem">
          <Link className="navbarItem" href="/register">
            Sign Up
          </Link>
        </li>
        <li className="navbarLiItem">
          <Link className="navbarItem" href="/login">
            Log In
          </Link>
        </li>
      </ul>
    );
  };
  const renderWithLogin = () => {};

  return (
    <div className="navbar">
      {user.loggedIn ? renderWithLogin() : renderNoLogin()}
    </div>
  );
}
