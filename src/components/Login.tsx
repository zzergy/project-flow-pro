import AuthBackground from "./AuthBackground/AuthBackground";
import AuthForm from "./AuthForm/AuthForm";
import { AUTH } from "../utils/enums";
import styles from "./Auth.module.scss";

const Login = () => {
  return (
    <section>
      <div className={styles.background}>
        <div className={styles.container}>
          <AuthBackground text="Sign In to continue" />
          <section className={styles.content}>
            <h2 className={styles.heading}>Sign In</h2>
            <AuthForm type={AUTH.LOGIN} />
          </section>
        </div>
      </div>
    </section>
  );
};

export default Login;
