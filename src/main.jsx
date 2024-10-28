import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "./index.css";
// import Homepage from './components/Homepage.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import MainLayout from './Layouts/MainLayout.jsx';
// import Cart from './components/Cart.jsx';

const router = createBrowserRouter([{ path: "/", element: <App /> }]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>
);
