import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import DefaultLayout from "./layouts/DefaultLayout";
import { protectedLoader } from "./loaders/requiresAuth";

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/",
    element: <DefaultLayout />,
    loader: protectedLoader,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "signIn",
        element: <SignIn />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
