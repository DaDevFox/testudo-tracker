import styles from "@/styles/globals.css";
import Navbar from "@/components/Navbar";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function Register(props) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  return (
    <main className="main">
      <Navbar />
      THIS IS THE REGISTER PAGE
    </main>
  );
}
