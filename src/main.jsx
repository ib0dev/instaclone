import "./index.css";
import { RouterProvider } from "react-router";
import routes from "./routes/index";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/authContext";
import ThemeContextProvider from "./context/ThemeContext";
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ThemeContextProvider>
      <RouterProvider router={routes} />
    </ThemeContextProvider>
  </AuthProvider>
);
