import React, { useState, useEffect } from "react";
import { updateUserProfile, getUserProfile } from "../store/authStore";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "primereact/button";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const Profile = () => {
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
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
      let imageUrl = userProfile.image;

      // If a new image is selected, upload it to Firebase Storage
      if (image) {
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`profile-images/${image.name}`);
        const snapshot = await imageRef.put(image);
        imageUrl = await snapshot.ref.getDownloadURL();
      }

      // Call the updateUserProfile function from the API service
      const response = await updateUserProfile(password, imageUrl);

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

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="container mt-4">
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
          <img
            src={userProfile.image}
            className="img-fluid profile-iamge"
            alt="Profile"
          />
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
          <label htmlFor="image" className="form-label">
            Update Profile Picture:
          </label>
          <input
            id="image"
            type="file"
            className="form-control"
            onChange={handleImageChange}
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
