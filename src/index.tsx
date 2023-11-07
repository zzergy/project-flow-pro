import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ConfigProvider } from "antd";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1356d0",
            colorInfo: "#1356d0",
            colorSuccess: "#00c9b7",
            colorWarning: "#ffc058",
            colorError: "#ff4f64",
            colorTextBase: "#292929",
            borderRadius: 4,
          },
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
