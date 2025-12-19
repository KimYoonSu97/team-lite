import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signIn",
    element: <SignIn />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
