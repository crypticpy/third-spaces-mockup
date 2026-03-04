import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <img
          src={`${import.meta.env.BASE_URL}logos/COA-Logo-Horizontal-Official-RGB.png`}
          alt="City of Austin"
          className={styles.logo}
        />
        <span className={styles.title}>Third Spaces</span>
      </div>
    </header>
  );
}
