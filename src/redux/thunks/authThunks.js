// src/redux/thunks/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { register } from '../slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "https://medigenie-1.onrender.com/api/auth";

// 🔹 Register User
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/registration/`,
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
        `${API_URL}/log-in/`,
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
        `${API_URL}/verify-code/`,
        {
          email,
          verification_code: code,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Save tokens & user
      await AsyncStorage.setItem("access", response.data.access);
      await AsyncStorage.setItem("refresh", response.data.refresh);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      console.log("OTP Verify Error:", error.response?.data || error.message);
      if (error.response) return rejectWithValue(error.response.data);
      return rejectWithValue({ error: 'Network Error' });
    }
  }
);

// 🔹 Logout User
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const refresh = await AsyncStorage.getItem("refresh");
      if (!refresh) return rejectWithValue({ message: "No refresh token found" });

      await axios.post(
        `${API_URL}/logout/`,
        { refresh },
        { headers: { "Content-Type": "application/json" } }
      );

      // Clear storage
      await AsyncStorage.multiRemove(["access", "refresh", "user"]);

      return true;
    } catch (error) {
      console.log("Logout Error:", error.response?.data || error.message);
      if (error.response) return rejectWithValue(error.response.data);
      return rejectWithValue({ error: "Network Error" });
    }
  }
);
