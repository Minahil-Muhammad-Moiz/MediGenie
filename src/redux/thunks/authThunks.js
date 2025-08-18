// src/redux/thunks/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { register } from '../slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔹 Register User
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://medigenie-1.onrender.com/api/auth/registration/',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      dispatch(register({ message: response.data.message }));
      return response.data;
    } catch (error) {
      if (error.response) return rejectWithValue(error.response.data);
      return rejectWithValue({ error: 'Network Error' });
    }
  }
);

// 🔹 Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://medigenie-1.onrender.com/api/auth/log-in/",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { access, refresh, user } = response.data;

      // persist tokens + user
      await AsyncStorage.setItem("access", access);
      await AsyncStorage.setItem("refresh", refresh);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      return response.data;
    } catch (error) {
      console.log("Login Error:", error.response?.data || error.message);
      if (error.response) return rejectWithValue(error.response.data);
      return rejectWithValue({ error: "Network Error" });
    }
  }
);
// 🔹 Verify OTP
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://medigenie-1.onrender.com/api/auth/verify-code/',
        {
          email,                      // ✅ Correct field
          verification_code: code,    // ✅ Backend expects this
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // ✅ Save tokens & user immediately
      await AsyncStorage.setItem("access", response.data.access);
      await AsyncStorage.setItem("refresh", response.data.refresh);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      console.log("OTP Verify Error:", error.message);
      console.log("OTP Verify Response:", error.response?.data);
      console.log("OTP Verify Status:", error.response?.status);
      if (error.response) return rejectWithValue(error.response.data);
      return rejectWithValue({ error: 'Network Error' });
    }
  }
);
