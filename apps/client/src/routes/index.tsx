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
import Auth from "./pages/Auth";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";

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
    path: "/auth/callback",
    element: <Auth />,
  },
  {
    path: "/",
    element: <DefaultLayout />,
    loader: protectedLoader,
    children: [
      { path: "/", element: <Home /> },
      { path: "/team/:teamId", element: <Teams /> },
      { path: "/team/:teamId/project/:projectId", element: <Projects /> },
      { path: "/team/:teamId/add-project", element: <AddProject /> },
      {
        path: "/team/:teamId/edit-project/:projectId",
        element: <EditProject />,
      },

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
