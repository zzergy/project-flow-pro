import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import ErrorPage from "./pages/Error/Error";
import { ROUTES } from "./utils/enums";

const App = () => {
  const router = createBrowserRouter([
    {
      path: ROUTES.NOT_FOUND,
      // element: <Root />,
      element: <ErrorPage />,
      // errorElement: <ErrorPage />,
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
      <RouterProvider router={router} />
    </PersistGate>
  );
};

export default App;
