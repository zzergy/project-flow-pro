import logo from "../../images/logo.svg";
import styles from "./AuthBackground.module.scss";

interface Props {
  text: string;
}

const AuthBackground = ({ text }: Props) => {
  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <header className={styles.header}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <h2 className={styles.heading}>ProjectFlow Pro</h2>
        </header>

        <div className={styles.text}>
          <h3 className={styles.heading}>For Developers by Developers</h3>
          <p className={styles.subheading}>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthBackground;
