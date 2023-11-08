import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import { AUTH } from "../../utils/enums";
import { auth, db, provider } from "../../firebase.config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Button } from "antd";
import useNotification from "../../hooks/useNotification";
import { transformFirebaseErrorMessage } from "../../utils/functions";
import bcrypt from "bcryptjs";
import styles from "./AuthForm.module.scss";

type Props = {
  type: AUTH;
};

const AuthForm = ({ type }: Props) => {
  const navigate = useNavigate();
  const notify = useNotification();
  const database = collection(db, "users");

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const isLoginPage = type === AUTH.LOGIN;

  const linkText = isLoginPage
    ? "Don’t have an account ? Sign Up here"
    : "Already have an account ? Sign In here";

  const handleChange = (
    // event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    event: any
  ) => {
    const { name, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const method = isLoginPage
      ? signInWithEmailAndPassword
      : createUserWithEmailAndPassword;

    try {
      const hashedPassword = bcrypt.hashSync(data.password, 10);

      // if (isLoginPage) {
      //   const currUser = await getDocs(database);
      //   console.log(currUser.metadata.map(el => console.log(el)));
      // }

      const response = await method(auth, data.email, data.password);
      // TODO 1. Compare passwords, 2. Compare confirm passwords
      // bcrypt.compare(data.password, response.user)

      const token = await response.user.getIdToken();
      localStorage.setItem("token", token);
      console.log(response);

      if (!isLoginPage && response.user) {
        addDoc(database, {
          email: data.email,
          username: data.username,
          password: hashedPassword,
        });

        notify.success("Success");
        navigate("/login");
      }

      isLoginPage && navigate("/");
    } catch (error: any) {
      notify.error("Error", transformFirebaseErrorMessage(error.message));
    }
  };

  const handleGoogleSignIn = async (event: any) => {
    event.preventDefault();

    try {
      const response = await signInWithPopup(auth, provider);

      response.user && navigate("/");
    } catch (error: any) {
      notify.error("Error", transformFirebaseErrorMessage(error.message));
    }
  };

  const loginContent = (
    <div className={styles.login}>
      <p>or Connect with</p>
      <Button
        onClick={(event) => handleGoogleSignIn(event)}
        className={`${styles.btn} ${styles.google__btn}`}
      >
        Google Account
      </Button>
    </div>
  );

  return (
    <>
      <form className={styles.form}>
        {!isLoginPage && (
          <InputField
            type="text"
            name="username"
            placeholder="Username"
            className={styles.input}
            onChange={(event) => handleChange(event)}
          />
        )}
        <InputField
          type="email"
          name="email"
          placeholder="Email Address"
          className={styles.input}
          onChange={(event) => handleChange(event)}
        />
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          className={styles.input}
          onChange={(event) => handleChange(event)}
        />
        {type === AUTH.SIGNUP && (
          <InputField
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={styles.input}
            onChange={(event) => handleChange(event)}
          />
        )}
        <Button
          onClick={handleSubmit}
          type="primary"
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
