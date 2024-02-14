import React from "react";
import { NavLink } from "react-router-dom";

const AppNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#">
          Logo
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="container">
            <ul className="navbar-nav d-lfex justify-content-end">
              <li className="nav-item nav-link">
                <NavLink
                  to={"/form"}
                  className={({ isActive }) =>
                    isActive ? "active-item" : "inactive"
                  }
                >
                  Registration
                </NavLink>
              </li>
              <li className="nav-item nav-link">
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive ? "active-item" : "inactive"
                  }
                >
                  List
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
