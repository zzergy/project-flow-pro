import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import InputField from "../shared/InputField";
import { AUTH } from "../../utils/enums";
import { db } from "../../firebase.config";
import { collection, addDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import styles from "./AuthForm.module.scss";

type Props = {
  type: AUTH;
};

const AuthForm = ({ type }: Props) => {
  const database = collection(db, "users");

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
    : "Already have an account ? Sign In here";

  const handleOnChange = (
    // event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    event: any
  ) => {
    const { name, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (event: any) => {
    event.preventDefault();

    const method = isLoginPage
      ? signInWithEmailAndPassword
      : createUserWithEmailAndPassword;

    // try {
    //   const res = await method(auth, data.email, data.password);
    //   console.log(res.user);
    //   // console.log(res.user.getIdToken());
    // } catch (error: any) {
    //   console.log(error.message);
    // }

    addDoc(database, data)
      .then(() => alert("Data sent"))
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <form className={styles.form}>
        <InputField
          type="text"
          name="username"
          placeholder="Name"
          className={styles.input}
          onChange={(event) => handleOnChange(event)}
        />
        <InputField
          type="email"
          name="email"
          placeholder="Email Address"
          className={styles.input}
          onChange={(event) => handleOnChange(event)}
        />
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          className={styles.input}
          onChange={(event) => handleOnChange(event)}
        />
        {type === AUTH.SIGNUP && (
          <InputField
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={styles.input}
            onChange={(event) => handleOnChange(event)}
          />
        )}

        <Button
          onClick={handleOnSubmit}
          className={`${styles.btn} ${styles.submit__btn}`}
        >
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
