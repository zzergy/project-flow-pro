import { Link, useNavigate } from "react-router-dom";
import { AUTH, ROUTES } from "../../utils/enums";
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
import { messages } from "../../utils/constants";
import styles from "./AuthForm.module.scss";
import CustomButton from "../../shared/Button/Button";

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
        notify.error("Error", messages.passwordsDontMatch);
        return;
      }

      const response = await method(auth, values.email, values.password);

      if (!isLoginPage && response.user) {
        addDoc(database, {
          email: values.email,
          username: values.username,
        });

        notify.success("Success");
        navigate(ROUTES.LOGIN);
      }

      isLoginPage && navigate(ROUTES.INDEX);
    } catch (error: any) {
      notify.error("Error", transformFirebaseErrorMessage(error.message));
    }
  };

  const handleGoogleSignIn = async (event: any) => {
    event.preventDefault();

    try {
      const response = await signInWithPopup(auth, provider);

      response.user && navigate(ROUTES.INDEX);
    } catch (error: any) {
      notify.error("Error", transformFirebaseErrorMessage(error.message));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    errorInfo.errorFields.map((element: any) =>
      notify.error("Error", element.errors)
    );
  };

  return (
    <>
      <Form
        className={styles.form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        name="controlRef"
      >
        <div className={styles.formInputs}>
          {!isLoginPage && (
            <Form.Item
              name="username"
              className={styles.formItem}
              rules={[
                { required: true, message: messages.enterUsername },
                { max: 25, message: messages.max25Characters },
              ]}
            >
              <Input
                name="username"
                placeholder={messages.username}
                className={styles.input}
              />
            </Form.Item>
          )}

          <Form.Item
            name="email"
            className={styles.formItem}
            rules={[{ required: true, message: messages.enterEmail }]}
          >
            <Input
              placeholder={messages.emailAddress}
              className={styles.input}
              name="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            className={styles.formItem}
            rules={[
              { required: true, message: messages.enterPassword },
              {
                pattern: messages.passwordRegex,
                message: messages.strongPassword,
              },
            ]}
          >
            <Input
              placeholder={messages.password}
              className={styles.input}
              name="password"
              type="password"
            />
          </Form.Item>

          {type === AUTH.SIGNUP && (
            <Form.Item
              name="confirmPassword"
              className={styles.formItem}
              rules={[{ required: true, message: messages.confirmPassword }]}
            >
              <Input
                placeholder={messages.confirmPassword}
                className={styles.input}
                name="confirmPassword"
                type="password"
              />
            </Form.Item>
          )}

        </div>

        <CustomButton
          htmlType="submit"
          type="primary"
          label={messages.continue}
          padded
          letterSpacing
          onClick={() => { }}
        />

        {isLoginPage && (
          <div className={styles.login}>
            <p>{messages.orConnectWith}</p>
            <CustomButton
              padded
              letterSpacing
              type="primary"
              ghost
              label={messages.googleAccount}
              onClick={(event) => handleGoogleSignIn(event)}
              className={classnames(styles.button, styles.googleButton)}
            />
          </div>
        )}
      </Form>

      <Link
        to={isLoginPage ? ROUTES.SIGNUP : ROUTES.LOGIN}
        className={styles.link}
      >
        {isLoginPage ? messages.signUpMessage : messages.signInMessage}
      </Link>
    </>
  );
};

export default AuthForm;
