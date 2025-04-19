import "./index.css";
import { RouterProvider } from "react-router";
import routes from "./routes/index";
import { createRoot } from 'react-dom/client';
import { AuthProvider } from "./context/authContext";
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={routes} />
  </AuthProvider>
);
