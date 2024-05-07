import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Screen } from "./type";

export const router = createBrowserRouter([
  {
    path: Screen.past,
    element: <Layout />,
  },
  {
    path: Screen.present,
    element: <Layout />,
  },
  {
    path: Screen.future,
    element: <Layout />,
  },
  {
    path: "*",
    element: <Navigate replace to={Screen.past} />,
  },
]);
