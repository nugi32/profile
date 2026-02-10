// app/components/Footer.jsx
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
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
