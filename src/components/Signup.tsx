import AuthBackground from "./AuthBackground/AuthBackground";
import AuthForm from "./AuthForm/AuthForm";
import { AUTH } from "../utils/enums";
import styles from "./Auth.module.scss";

const Signup = () => {
  return (
    <section>
      <div className={styles.background}>
        <div className={styles.container}>
          <AuthBackground text="Sign Up to start" />
          <section className={styles.content}>
            <h2 className={styles.heading}>Sign Up</h2>
            <AuthForm type={AUTH.SIGNUP} />
          </section>
        </div>
      </div>
    </section>
  );
};

export default Signup;
