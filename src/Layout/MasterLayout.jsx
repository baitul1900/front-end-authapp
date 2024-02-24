/* eslint-disable react/prop-types */
import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios"; // Import axios
// Assuming you have a constant for the base URL
import { Menu } from "antd";
import {
  UserOutlined, // Import desired icons
  ShopOutlined,
} from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";

const { SubMenu } = Menu;

const items = [
  {
    label: "User Information",
    key: "profile",
    path: "/profile",
    icon: <UserOutlined />,
  },
  { label: "Brands", key: "profile", path: "/brands" },
  { label: "Category", key: "profile", path: "/category" },
  { label: "Product", key: "profile", path: "/product" },
];

const MasterLayout = (props) => {
  const [userData, setUserData] = useState(null);
  const isLoggedIn = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header with the token
          },
        };
        const response = await axios.get(
          "http://localhost:8000/api/v1/profile",
          config
        ); // Fetch user profile data
        setUserData(response.data.data); // Assuming the user data is nested under the 'data' key
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    Cookies.remove("token");
    sessionStorage.removeItem("token");
    toast.success("Logout successful");
    navigate("/");
  };

  const renderMenuItems = () => {
    return items.map((item) => {
      if (item.path) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        );
      } else {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.label}
          </Menu.Item>
        );
      }
    });
  };

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
        <div className="container-fluid">
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
              <ul className="navbar-nav d-flex justify-content-end">
                {isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <button
                        className="btn btn-link nav-link"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                    <li className="nav-item w-25 text-end">
                      {userData && (
                        <Link className="nav-link" to="/profile">
                          <img
                            src={
                              userData.image
                                ? userData.image
                                : "user-avatar.png"
                            }
                            alt="User Avatar"
                            className="img-fluid w-25"
                          />
                        </Link>
                      )}
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

      <Menu
        className=" pt-5 menu bg-secondary text-dark"
        style={{ width: 256 }}
        mode="vertical"
        defaultSelectedKeys={["profile"]}
      >
        {renderMenuItems()}
      </Menu>

      {props.children}
    </Fragment>
  );
};

export default MasterLayout;
