import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import LandingPage from './pages/LandingPage.jsx';
import LayOut from './components/common/LayOut.jsx';
import ChatPage from './pages/ChatPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import './index.css';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
// import { loader as feedLoader } from './components/homePage/detailModal/DetailModal';

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
