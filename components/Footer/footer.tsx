// app/components/Footer.jsx
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.waves}>
        <div className={`${styles.wave} ${styles.wave1}`} />
        <div className={`${styles.wave} ${styles.wave2}`} />
        <div className={`${styles.wave} ${styles.wave3}`} />
        <div className={`${styles.wave} ${styles.wave4}`} />
      </div>

      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <a className={styles.menuLink} href="#">Home</a>
        </li>
        <li className={styles.menuItem}>
          <a className={styles.menuLink} href="#">About Us</a>
        </li>
        <li className={styles.menuItem}>
          <a className={styles.menuLink} href="#">Contact Us</a>
        </li>
      </ul>
    </footer>
  );
}
