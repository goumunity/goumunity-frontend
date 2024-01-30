import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";

function LayOut() {
  
  return (
    <div className="flex bg-bg bg-opacity-10">
      <NavBar />
      <Outlet  />
    </div>
  );
}

export default LayOut;
