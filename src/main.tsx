import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Main_Layout from "./Layout/Main_Layout";
import Hero from "./Components/Hero";
import Home from "./Components/Home";

// Define the router with your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main_Layout />,
    children: [
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);

// Get the root element and ensure it's not null
const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found!");
}
