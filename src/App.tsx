import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Error from "./shared/Error/Error";
import { ROUTES } from "./utils/enums";

const App = () => {
  const router = createBrowserRouter([
    {
      path: ROUTES.INDEX,
      errorElement: <Error />,
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
