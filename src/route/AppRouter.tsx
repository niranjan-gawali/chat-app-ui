import { createBrowserRouter } from 'react-router';
import { Chat, Home, Login, MainLayout, Signup } from '../pages';

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [
          {
            path: '/chat/:_id',
            element: <Chat />,
          },
        ],
      },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
    ],
  },
]);

export default AppRouter;
