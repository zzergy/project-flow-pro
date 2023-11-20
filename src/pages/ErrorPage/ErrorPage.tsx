import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./ErrorPage.module.scss";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            onClick={handleNavigate}
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
