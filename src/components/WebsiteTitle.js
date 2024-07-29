import styles from "@/styles/components.module.css";

export default function WebsiteTitle(props) {
  return (
    <div className={styles.websiteTitleContainer}>
      <span className={styles.websiteTitle}>
        <h1>Testudo Tracker</h1>
      </span>
    </div>
  );
}
