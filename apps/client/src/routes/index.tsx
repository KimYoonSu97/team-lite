import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import DefaultLayout from "./layouts/DefaultLayout";
import { protectedLoader } from "./loaders/requiresAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Teams from "./pages/Teams";
import Projects from "./pages/Projects";
import MyProjects from "./pages/MyProjects";

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signIn",
    element: <SignIn />,
  },
  {
    path: "/",
    element: <DefaultLayout />,
    loader: protectedLoader,
    children: [
      { path: "/", element: <Home /> },
      { path: "/teams/:teamId", element: <Teams /> },
      { path: "/projects/:teamId/:projectId", element: <Projects /> },
      { path: "/projects", element: <MyProjects /> },
    ],
  },
]);

export default function Router() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
