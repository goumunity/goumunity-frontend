
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import LandingPage from './pages/LandingPage.jsx';
import LayOut from './components/common/LayOut.jsx';
import ChatPage from './pages/ChatPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import './index.css';
import HomePage from './pages/HomePage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
// import { loader as postLoader } from './components/homePage/detailModal/DetailModal';


const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <LayOut />,
    children: [
      // index: true -> 부모 라우트가 활성일 경우 기본 라우트
      { index: true, element: <HomePage /> },
      // { path: '/:postId', element: <HomePage />, loader: postLoader },
      { path: '/:postId', element: <HomePage /> },
      { path: '/landing', element: <LandingPage /> },
      { path: '/landing/join/:joinId', element: <LandingPage /> },
      { path: '/:login', element: <LandingPage /> },
      { path: '/chat', element: <ChatPage /> },
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
