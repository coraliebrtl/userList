import Logo from "../../../public/svg/Logo";
import styles from "./Header.module.scss";

const Header = () => (
  <div className={styles.header}>
    <Logo />
  </div>
);

export default Header;
