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


const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <LayOut />,
    children: [
      // index: true -> 부모 라우트가 활성일 경우 기본 라우트
      { index: true, element: <HomePage /> },
      // { path: '/:feedId', element: <HomePage />, loader: () => feedLoader(feedId) },
      { path: '/:feedId', element: <HomePage /> },
      { path: '/create/:id', element: <HomePage /> },
      { path: '/landing', element: <LandingPage /> },
      { path: '/landing/join/:joinId', element: <LandingPage /> },
      { path: '/:login', element: <LandingPage /> },
      {
        path: '/chat',
        element: <ChatPage />,
        children: [{ path: 'talk/:talkId', element: <ChatTalkSection /> }],
      },
      { path: '/profile', element: <ProfilePage /> },
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
