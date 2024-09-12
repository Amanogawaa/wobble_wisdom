import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Advice from "./components/Advice.jsx";
import Favorite from "./components/Favorite.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Advice />,
  },
  {
    path: "favorites",
    element: <Favorite />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
