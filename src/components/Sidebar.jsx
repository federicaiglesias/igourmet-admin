import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../redux/adminSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar-light bg-color-admin sidebar-height d-flex flex-column">
        <div className="d-flex mb-3">
          <Link
            target="_blank"
            to="http://localhost:5174"
            title="Ir a Igourmet"
          >
            <img
              src="logo-igourmet.jpg"
              alt="Logo Igourmet"
              className="w-100 sidebar-logo pt-4"
            />
          </Link>
        </div>

        <ul className="navbar-nav d-flex flex-column sidebar-nav mt-3">
          <li className="nav-item">
            <Link to="/" className="nav-link fs-5">
              <i className="bi bi-bar-chart-line me-2"></i>Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/productos" className="nav-link fs-5">
              <i className="bi bi-basket me-2"></i>Productos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/categorias" className="nav-link fs-5">
              <i className="bi bi-tags me-2"></i>Categorías
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/administradores" className="nav-link d-flex fs-5">
              <i className="bi bi-person-gear me-2"></i>Administradores
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/ordenes" className="nav-link fs-5">
              <i className="bi bi-list-check me-2"></i>Órdenes
            </Link>
          </li>
        </ul>

        <div className="mt-auto d-flex justify-content-center mb-3 ms-2">
          <button
            className="py-1 px-3 rounded btn w-100 btn-style d-flex align-items-center fs-5 "
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-left fs-5 me-2"></i> Logout
          </button>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
