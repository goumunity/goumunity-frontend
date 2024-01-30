import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ReactModal from "react-modal";
import LandingPage from "./pages/LandingPage.jsx";
import JoinPage from "./pages/JoinPage.jsx";
import LayOut from "./components/common/LayOut.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import "./index.css";
import HomePage from "./pages/HomePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/landing", element: <LandingPage /> },
      { path: "/join", element: <JoinPage /> },
      { path: "/chat", element: <ChatPage /> },
      { path: "/profile", element: <ProfilePage /> },
    ],
  },
]);

ReactModal.setAppElement("#root");

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
