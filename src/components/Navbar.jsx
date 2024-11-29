import React, { useState, useEffect } from "react";
import "../components/dashboard.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../redux/adminSlice";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-color-admin d-flex py-2 position-navbar">
      <div className="col d-flex justify-content-end me-3">
        <div className="position-relative dropdown-container">
          <div
            className="rounded-circle overflow-hidden nav-cursor"
            onClick={toggleDropdown}
          >
            <img
              src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1694269159~exp=1694269759~hmac=c8c65095b670091331a550b674305943e6a42c710a45b7356ecfe851d77b916b"
              alt="Profile"
              className="img-fluid profile"
            />
          </div>
          {showDropdown && (
            <div className="dropdown-menu position-absolute end-0 mt-2 p-2 shadow bg-light dropdown-min-width">
              <button
                className="dropdown-item btn btn-light text-start"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <div className="ml-2 bell-icon"></div>
      </div>
    </div>
  );
}

export default Navbar;