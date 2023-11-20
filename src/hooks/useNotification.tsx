import { notification } from "antd";
import { useEffect } from "react";

type NotificationType = "success" | "info" | "warning" | "error";

interface NotificationOptions {
  message: string;
  description?: string;
}

const useNotification = () => {
  const showNotification = (
    type: NotificationType,
    options: NotificationOptions
  ) => {
    notification[type]({
      ...options,
    });
  };

  useEffect(() => {
    notification.config({
      placement: "bottomLeft",
    });
  }, []);

  return {
    success: (message: string, description?: string) =>
      showNotification("success", { message, description }),
    info: (message: string, description?: string) =>
      showNotification("info", { message, description }),
    warning: (message: string, description?: string) =>
      showNotification("warning", { message, description }),
    error: (message: string, description?: string) =>
      showNotification("error", { message, description }),
  };
};

export default useNotification;
