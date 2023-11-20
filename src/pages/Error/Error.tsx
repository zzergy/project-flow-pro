import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/enums";
import styles from "./Error.module.scss";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            onClick={() => navigate(ROUTES.INDEX)}
            className={styles.button}
          >
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default ErrorPage;
