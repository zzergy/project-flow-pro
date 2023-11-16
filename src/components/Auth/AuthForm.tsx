import { Link, useNavigate } from "react-router-dom";
import { AUTH } from "../../utils/enums";
import { auth, db, provider } from "../../firebase.config";
import { collection, addDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Button, Form } from "antd";
import useNotification from "../../hooks/useNotification";
import { transformFirebaseErrorMessage } from "../../utils/functions";
import styles from "./AuthForm.module.scss";
import InputField from "../shared/InputField";

type Props = {
  type: AUTH;
};

type FieldType = {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

const AuthForm = ({ type }: Props) => {
  const navigate = useNavigate();
  const notify = useNotification();
  const database = collection(db, "users");

  const isLoginPage = type === AUTH.LOGIN;

  const linkText = isLoginPage
    ? "Don’t have an account ? Sign Up here"
    : "Already have an account ? Sign In here";

  const onFinish = async (values: FieldType) => {
    const method = isLoginPage
      ? signInWithEmailAndPassword
      : createUserWithEmailAndPassword;

    try {
      if (values.password !== values.confirmPassword && !isLoginPage) {
        notify.error("Error", "Passwords don't match");
        return;
      }

      const response = await method(auth, values.email, values.password);

      const token = await response.user.getIdToken();
      localStorage.setItem("token", token);

      if (!isLoginPage && response.user) {
        addDoc(database, {
          email: values.email,
          username: values.username,
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

  const onFinishFailed = (errorInfo: any) => {
    notify.error("Error", errorInfo);
  };

  const loginContent = (
    <div className={styles.login}>
      <p>or Connect with</p>
      <Button
        onClick={(event) => handleGoogleSignIn(event)}
        className={`${styles.btn} ${styles.googleBtn}`}
      >
        Google Account
      </Button>
    </div>
  );

  return (
    <>
      <Form
        className={styles.form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        name="control-ref"
      >
        {!isLoginPage && (
          <Form.Item<FieldType>
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <InputField
              name="username"
              placeholder="Username"
              className={styles.input}
            />
          </Form.Item>
        )}

        <Form.Item<FieldType>
          name="email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <InputField
            placeholder="Email Address"
            className={styles.input}
            name="email"
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[
            { required: true, message: "Please enter your password!" },
            {
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message:
                "Password must be at least 8 characters and contain at least one letter and one number.",
            },
          ]}
        >
          <InputField
            placeholder="Password"
            className={styles.input}
            name="password"
            type="password"
          />
        </Form.Item>

        {type === AUTH.SIGNUP && (
          <Form.Item<FieldType>
            name="confirmPassword"
            rules={[{ required: true, message: "Confirm password!" }]}
          >
            <InputField
              placeholder="Confirm password"
              className={styles.input}
              name="confirmPassword"
              type="password"
            />
          </Form.Item>
        )}
        <Button
          htmlType="submit"
          type="primary"
          className={`${styles.btn} ${styles.submitBtn}`}
        >
          Continue
        </Button>

        {isLoginPage && loginContent}
      </Form>
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
