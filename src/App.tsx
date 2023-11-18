import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
import Signup from "./pages/AuthPage/Signup";
import Login from "./pages/AuthPage/Login";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { ROUTES } from "./utils/enums";

const App = () => {
  const router = createBrowserRouter([
    {
      path: ROUTES.NOT_FOUND,
      element: <ErrorPage />,
    },
    {
      path: ROUTES.SIGNUP,
      element: <Signup />,
    },
    {
      path: ROUTES.LOGIN,
      element: <Login />,
    },
  ]);

  return (
    <PersistGate persistor={persistor}>
      <RouterProvider router={router} />;
    </PersistGate>
  );
};

export default App;
