import "@/styles/globals.css";
import styles from "@/styles/page.module.css";
import Navbar from "@/components/Navbar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function Login(props) {
  signInWithEmailAndPassword(auth, email, password)
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
      THIS IS THE LOGIN PAGE
    </main>
  );
}
