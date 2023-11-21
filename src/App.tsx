import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Error from "./shared/Error/Error";
import { ROUTES } from "./utils/enums";
import Homepage from "./components/Homepage/Homepage";
import { ConfigProvider } from "antd";
import { customTheme } from "./customTheme";

const App = () => {
  const router = createBrowserRouter([
    {
      path: ROUTES.INDEX,
      element: <Homepage />,
      errorElement: <Error />,
    },
    {
      path: ROUTES.SIGNUP,
      element: <Signup />,
    },
    {
      path: ROUTES.LOGIN,
      element: <Login />,
    }
  ]);

  return (
    <ConfigProvider theme={customTheme}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </ConfigProvider>
  );
};

export default App;
