import styles from "@/styles/page.module.css";

export default function Register(props) {
  return <div>
    <form>
      <div>Account Name<input type="text" placeholder=""></input></div>
      <div>Account Password<input type="text" placeholder=""></input></div>
      <div>Comfirm Password<input type="text" placeholder=""></input></div>
      <div><input type="submit"></input></div>
    </form>

    </div>;
}
