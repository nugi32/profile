

    // app/components/Footer.jsx
import styles from "./header.module.css";

export default function Header() {
  return (
        <div className={styles.headerInner}>
      <a className={styles.logo} href="#">Hibike!<span> Euphonium</span></a>
      <nav className={styles.nav} id="nav">
        <a href="#episodes">Episodes</a>
        <a href="#characters">Characters</a>
        <a href="#about">About</a>
      </nav>
    </div>
  );
}
