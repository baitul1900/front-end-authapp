import React, { useState, useEffect } from "react";
import { updateUserProfile, getUserProfile } from "../store/authStore";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "primereact/button";

const Profile = () => {
  const [password, setPassword] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      if (response.status === "success") {
        setUserProfile(response.data);
      } else {
        setErrorMessage("Failed to fetch user profile");
      }
    } catch (error) {
      setErrorMessage("Failed to fetch user profile");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the updateUserProfile function from the API service
      const response = await updateUserProfile(password, imageLink);

      // Check the response status
      if (response.status === "success") {
        // If successful, display success message
        setSuccessMessage(response.message);
      } else {
        // If there's an error, display error message
        setErrorMessage(response.message);
      }
    } catch (error) {
      // Handle any errors
      setErrorMessage(error.message || "Failed to update profile");
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4">Update Profile</h2>
      {userProfile && (
        <div className="mb-4">
          <h4>Profile Details:</h4>
          <p>
            <strong>Name:</strong> {userProfile.name}
          </p>
          <p>
            <strong>Email:</strong> {userProfile.email}
          </p>
          <p>
            <strong>Phone:</strong> {userProfile.phone}
          </p>
          {/* <p><strong>Image Link:</strong> {userProfile.image}</p */}
          <img
            src={userProfile["image"]}
            className="img-fluid w-25"
            alt="Profile"
          />

<Button label="Check" icon="pi pi-check" />
        </div>
      )}
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageLink" className="form-label">
            Image Link:
          </label>
          <input
            id="imageLink"
            type="text"
            className="form-control"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
      {errorMessage && (
        <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
      )}
      {successMessage && (
        <p style={{ color: "green", marginTop: "10px" }}>{successMessage}</p>
      )}
    </div>
  );
};

export default Profile;
