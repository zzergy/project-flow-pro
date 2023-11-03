import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import InputField from "../shared/InputField";
import { AUTH } from "../../utils/enums";
import styles from "./AuthForm.module.scss";

type Props = {
  type: AUTH;
};

const AuthForm = ({ type }: Props) => {
  const isLoginPage = type === AUTH.LOGIN;

  const loginContent = (
    <div className={styles.login}>
      <p>or Connect with</p>
      <Button className={`${styles.btn} ${styles.google__btn}`}>
        Google Account
      </Button>
    </div>
  );

  const linkText = isLoginPage
    ? "Don’t have an account ? Sign Up here"
    : "Already have an account? Sign In here";

  return (
    <>
      <form className={styles.form}>
        <InputField
          type="email"
          placeholder="Email Address"
          className={styles.input}
        />
        <InputField
          type="password"
          placeholder="Password"
          className={styles.input}
        />
        {type === AUTH.SIGNUP && (
          <InputField
            type="password"
            placeholder="Confirm Password"
            className={styles.input}
          />
        )}

        <Button className={`${styles.btn} ${styles.submit__btn}`}>
          Continue
        </Button>
        {isLoginPage && loginContent}
      </form>
      <Link
        to={isLoginPage ? `/${AUTH.SIGNUP}` : `/${AUTH.LOGIN}`}
        className={styles.link}
      >
        <span>{linkText}</span>
      </Link>
    </>
  );
};

export default AuthForm;
