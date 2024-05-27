import { Link } from "react-router-dom";
import styles from "./logo.module.css";
const Logo = () => {
  return (
    <figure className={styles.nav_logo}>
      <Link to="/">
        <img className={styles.logo_img} src="imgs/logo.svg" alt=".." />
        <span className={styles.logo_na}>TechnoMatic</span>
      </Link>
    </figure>
  );
};
export default Logo;
