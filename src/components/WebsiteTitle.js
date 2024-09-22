import styles from "@/styles/home-page.module.css";

export default function WebsiteTitle(props) {
  return (
    <div className={styles.websiteTitleContainer}>
      <span className={styles.websiteTitle}>
        <h1>Testudo Tracker</h1>
      </span>
    </div>
  );
}
