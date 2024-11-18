import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./routes/HomePage";
import ErrorPage from "./routes/ErrorPage";
import { Provider } from "react-redux";
import { store } from "./store";
import LoginPage from "./routes/LoginPage";
import ProtectedRoutes from "./routes/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/public",
    element: <div>Public Page</div>,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/protected",
        element: <div>Protected Page</div>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
