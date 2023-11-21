import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/enums";
import styles from "./Error.module.scss";
import CustomButton from "../Button/Button";
import { messages } from "../../utils/constants";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Result
        status="404"
        title="404"
        subTitle={messages.pageDoesNotExist}
        className={styles.error}
        extra={
          <CustomButton
            type="primary"
            label={messages.backHome}
            onClick={() => navigate(ROUTES.INDEX)}
            className={styles.button}
            padded
            letterSpacing
          />
        }
      />
    </div>
  );
};

export default Error;
