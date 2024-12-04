import React, { useState, useEffect } from "react";
import "../components/dashboard.css";

function Navbar() {


  return (
    <div className="bg-color-admin d-flex py-2 position-navbar">
      <div className="col d-flex justify-content-end me-3">
        <div className="position-relative">
          <div
            className="rounded-circle overflow-hidden"
          >
            <img
              src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1694269159~exp=1694269759~hmac=c8c65095b670091331a550b674305943e6a42c710a45b7356ecfe851d77b916b"
              alt="Profile"
              className="img-fluid profile"
            />
          </div>
        </div>
        <div className="ml-2 bell-icon"></div>
      </div>
    </div>
  );
}

export default Navbar;
