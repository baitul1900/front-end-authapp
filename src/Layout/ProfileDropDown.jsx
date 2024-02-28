import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const ProfileDropDown = () => {
  const [userData, setUserData] = useState(null);
  const isLoggedIn = Cookies.get("token");

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
  };

  const items = [
    {
      key: "1",
      label: (
        <Link className="nav-link" to="/profile">
          Profile
        </Link>
      ),
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: (
        <Link className="nav-link" onClick={handleLogout}>
          Logout
        </Link>
      ),
    },
  ];

  return (
    <>
      {userData && (
        <>
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Link className="nav-link w-50" to="/profile">
                  <img
                    src={userData.image ? userData.image : "user-avatar.png"}
                    alt="User Avatar"
                    className="img-fluid profile-top pb-2 profile-image"
                  />
                </Link>
              </Space>
            </a>
          </Dropdown>
        </>
      )}
    </>
  );
};

export default ProfileDropDown;
