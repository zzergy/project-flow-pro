import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import InputField from "../shared/InputField";
import { AUTH } from "../../utils/enums";
import { auth, db, provider } from "../../firebase.config";
import { collection, addDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
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
      const res = await method(auth, data.email, data.password);
      console.log(res.user);
    } catch (error: any) {
      console.log(error.message);
    }

    // addDoc(database, data)
    //   .then(() => alert("Data sent"))
    //   .catch((err) => alert(err.message));
  };

  const handleGoogleSignIn = (event: any) => {
    event.preventDefault();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("SUCCESS");
      })
      .catch((error) => {
        alert(error.message);
      });
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
        <InputField
          type="text"
          name="username"
          placeholder="Name"
          className={styles.input}
          onChange={(event) => handleChange(event)}
        />
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
          className={`${styles.btn} ${styles.submit__btn}`}
        >
          Continue
        </Button>
        <Button onClick={handleLogout}>Logout</Button>
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
