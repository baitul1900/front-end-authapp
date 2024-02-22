import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { loginUser } from "../store/authStore";
import Cookies from "js-cookie";

const LoginComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      if (response.status === "success") {
        // Calculate expiration time based on the server's response
        const expirationTime = response.expiresIn
          ? new Date(response.expiresIn)
          : new Date(Date.now() + 24 * 6060 * 1000);

        // Set token into cookies with expiration time
        Cookies.set("token", response.token, {
          expires: expirationTime,
          httpOnly: false,
        }); // Set expiry date as needed
        toast.success(response.message); // Display success message
        navigate("/"); // Redirect to dashboard
      } else {
        toast.error(response.message || "Failed to login"); // Display error message
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("An error occurred while logging in");
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default LoginComponent;
