import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "../layouts/main";
import Home from "../pages/home";
import Search from "../pages/search";
import Explore from "../pages/explore";
import Reels from "../pages/reels";
import Messages from "../pages/messages";
import Notifications from "../pages/notifications";
import Profile from "../pages/profile";
import More from "../pages/more";
import InstagramLogin from "../pages/log-in";
import { useAuth } from "../context/authContext";
import SignUp from "@/pages/sign-up";
import ProtectedWrapper from "../components/ProtectedWrapper";

// A component to handle root redirect logic
const RootRedirect = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div
      className="h-svh flex justify-center items-center"
    >Loading...</div>;
  }

  return <Navigate to={currentUser ? "/" : "/login"} replace />;
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  {
    path: "/",
    element: (
      <ProtectedWrapper>
        <MainLayout />
      </ProtectedWrapper>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "explore",
        element: <Explore />,
      },
      {
        path: "reels",
        element: <Reels />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "more",
        element: <More />,
      },
    ],
  },
  {
    path: "/login",
    element: <InstagramLogin />,
  },
  {
    path: "/sign-up", // Add the signup route as a public route
    element: <SignUp />,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default routes;