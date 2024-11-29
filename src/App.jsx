import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
