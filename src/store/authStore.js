import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:8000/api/v1';

// Function to register a user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user-registration`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to register user');
  }
};

// Function to verify OTP
export const verifyOTP = async (email, otp) => {
  try {
    const response = await axios.get(`${BASE_URL}/verify-otp/${email}/${otp}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to verify OTP');
  }
};


export const loginUser = async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, userData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to login');
    }
  }


  export const getUserProfile = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/profile`); // Assuming the profile endpoint is '/api/v1/profile'
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user profile');
    }
  }
  
  
  