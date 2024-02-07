import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import LandingPage from './pages/LandingPage';
import LayOut from './components/common/LayOut';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import './index.css';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import ChatTalkSection from './components/chatPage/chatTalkSection/ChatTalkSection';

import Main from './pages/Main';

import ProtectedRoutes from './components/common/ProtectedRoutes';

import ProfilePageDetail from './components/ProfilePage/ProfilePageDetail';
import TestPage from './pages/TestPage';

const router = createBrowserRouter([
  
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <LayOut />,
    children: [
      {
        index: '',
        element: <ProtectedRoutes />,
        children: [
          { index: true, element: <HomePage /> },
          { path: '/:feedId', element: <HomePage /> },
          { path: '/create/:id', element: <HomePage /> },
          { path: '/patch/:patchId', element: <HomePage /> },
          {
            path: '/chat',
            element: <ChatPage />,
            children: [{ path: 'talk/:talkId', element: <ChatTalkSection /> }],
          },
          { path: '/profile', element: <ProfilePage /> },
        ],
      },
      { path: '/landing', element: <LandingPage /> },
      { path: '/landing/join/:joinId', element: <LandingPage /> },
      { path: '/:login', element: <LandingPage /> },

      {
        path: '/chat',
        element: <ChatPage />,
        children: [{ path: 'talk/:talkId', element: <ChatTalkSection /> }],
      },
      { path: '/main', element: <Main /> },
      { path: '/profile/:detail?', element: <ProfilePage /> },
      { path: '/test', element: <TestPage /> },
    ],
  },
]);

ReactModal.setAppElement('#root');

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
