import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/main";
import Home from '../pages/home'
import Search from '../pages/search'
import Explore from '../pages/explore'
import Reels from '../pages/reels'
import Messages from '../pages/messages'
import Notifications from '../pages/notifications'
import Create from '../pages/create'
import Profile from '../pages/profile'
import More from '../pages/more'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'explore',
        element: <Explore />,
      },
      {
        path: 'reels',
        element: <Reels />,
      },
      {
        path: 'messages',
        element: <Messages />,
      },
      {
        path: 'notifications',
        element: <Notifications />,
      },
      {
        path: 'create',
        element: <Create />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'more',
        element: <More />,
      },
      
      
    ],
  },
]);

export default routes;