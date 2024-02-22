// MasterLayout.jsx

import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getUserProfile } from "../store/authStore"; // Import the getUserProfile function

const MasterLayout = (props) => {
  const [userData, setUserData] = useState(null);
  const isLoggedIn = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getUserProfile();
        console.log('User Profile Data:', profileData); // Log the profileData
        setUserData(profileData.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
  
    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn]);
  

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Your Brand
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="container-fluid d-flex justify-content-end">
              <ul className="navbar-nav">
                {isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      {userData && (
                        <Link className="nav-link" to="/profile">
                          <img
                            src={
                              userData.image
                                ? userData["data"]["image"]
                                : "user-avatar.png"
                            }
                            alt="User Avatar"
                            className="img-fluid"
                          />
                        </Link>
                      )}
                    </li>
                    <li className="nav-item">
                      <button
                        className="btn btn-link nav-link"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {props.children}
    </Fragment>
  );
};

export default MasterLayout;
