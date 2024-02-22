import axios from 'axios';

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



