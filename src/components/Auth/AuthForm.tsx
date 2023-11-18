import { Link, useNavigate } from "react-router-dom";
import { AUTH } from "../../utils/enums";
import { auth, db, provider } from "../../firebase.config";
import { collection, addDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Button, Form, Input } from "antd";
import useNotification from "../../hooks/useNotification";
import { transformFirebaseErrorMessage } from "../../utils/functions";
import { errorMessages, formMessages } from "../../utils/constants";
import styles from "./AuthForm.module.scss";

interface Props {
  type: AUTH;
}

interface FieldType {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const AuthForm = ({ type }: Props) => {
  const navigate = useNavigate();
  const notify = useNotification();
  const database = collection(db, "users");
  const classnames = require("classnames");

  const isLoginPage = type === AUTH.LOGIN;

  const onFinish = async (values: FieldType) => {
    const method = isLoginPage
      ? signInWithEmailAndPassword
      : createUserWithEmailAndPassword;

    try {
      if (values.password !== values.confirmPassword && !isLoginPage) {
        notify.error("Error", errorMessages.passwordsDontMatch);
        return;
      }

      const response = await method(auth, values.email, values.password);

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

  return (
    <>
      <Form
        className={styles.form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        name="controlRef"
      >
        {!isLoginPage && (
          <Form.Item
            name="username"
            rules={[{ required: true, message: formMessages.enterUsername }]}
          >
            <Input
              name="username"
              placeholder="Username"
              className={styles.input}
            />
          </Form.Item>
        )}

        <Form.Item
          name="email"
          rules={[{ required: true, message: formMessages.enterEmail }]}
        >
          <Input
            placeholder="Email Address"
            className={styles.input}
            name="email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: formMessages.enterPassword },
            {
              pattern: formMessages.passwordRegex,
              message: formMessages.strongPassword,
            },
          ]}
        >
          <Input
            placeholder="Password"
            className={styles.input}
            name="password"
            type="password"
          />
        </Form.Item>

        {type === AUTH.SIGNUP && (
          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: formMessages.confirmPassword }]}
          >
            <Input
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
          className={classnames(styles.button, styles.submitButton)}
        >
          Continue
        </Button>

        {isLoginPage && (
          <div className={styles.login}>
            <p>or Connect with</p>
            <Button
              onClick={(event) => handleGoogleSignIn(event)}
              className={classnames(styles.button, styles.googleButton)}
            >
              Google Account
            </Button>
          </div>
        )}
      </Form>
      <Link
        to={isLoginPage ? `/${AUTH.SIGNUP}` : `/${AUTH.LOGIN}`}
        className={styles.link}
      >
        <span>
          {isLoginPage
            ? "Don’t have an account ? Sign Up here"
            : "Already have an account ? Sign In here"}
        </span>
      </Link>
    </>
  );
};

export default AuthForm;
