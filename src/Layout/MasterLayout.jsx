import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ProfileDropDown from "./ProfileDropDown";

const MasterLayout = (props) => {
  const [userData, setUserData] = useState(null);
  const isLoggedIn = Cookies.get("token");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "http://localhost:8000/api/v1/profile",
          config
        );
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Your Brand
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleSidebar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {isLoggedIn ? (
                <>
                  <li className="nav-item dropdown">
                    {userData && (
                      <Link className="dropdown-item" to="/profile">
                        <ProfileDropDown />
                      </Link>
                    )}
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      <i className="bi bi-bell-fill"></i>
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div
        className={`container-fluid ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar menu"
          >
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li>
                  <div className="accordion" id="sidebarAccordion">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="user-profile">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseUserProfile"
                          aria-expanded="true"
                          aria-controls="collapseUserProfile"
                        >
                          User Profile
                        </button>
                      </h2>
                      <div
                        id="collapseUserProfile"
                        className="accordion-collapse collapse show"
                        aria-labelledby="user-profile"
                        data-bs-parent="#sidebarAccordion"
                      >
                        <div className="accordion-body">
                          <ul className="nav flex-column">
                            <li className="nav-item">
                              <Link className="nav-link" to="/profile">
                                <i className="bi bi-person-circle"></i> User
                                Information
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="accordion" id="product-section">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingProduct">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseProduct"
                          aria-expanded="true"
                          aria-controls="collapseProduct"
                        >
                          Product Section
                        </button>
                      </h2>
                      <div
                        id="collapseProduct"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingProduct"
                        data-bs-parent="#product-section"
                      >
                        <div className="accordion-body">
                          <ul className="nav flex-column">
                            <li className="nav-item">
                              <Link className="nav-link" to="/brands">
                                Brands
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link className="nav-link" to="/category">
                                Category
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link className="nav-link" to="/product">
                                Product
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {props.children}
          </main>
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </Fragment>
  );
};

export default MasterLayout;
