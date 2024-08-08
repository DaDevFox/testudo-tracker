import styles from "@/styles/globals.css";
import Navbar from "@/components/Navbar";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function Register(props) {
  return (
    <main className="main">
      <Navbar />
      THIS IS THE REGISTER PAGE
    </main>
  );
}
