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


export const loginUser = async (email, password) => {
  try {
      const response = await axios.post(`${BASE_URL}/login`, { email, password });
      const token = response.data.token;
      
      // Store the token in session storage
      sessionStorage.setItem('token', token);

      console.log('Token:', token);
      
      // Store the token in a cookie
      Cookies.set('token', token, { expires: 1 }); // Adjust expiry date as needed
      
      return { status: 'success', message: 'Login successful' };
  } catch (error) {
      throw new Error('Failed to login');
  }
};





export const getUserProfile = async () => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user profile');
  }
};
  
  
  
  
  