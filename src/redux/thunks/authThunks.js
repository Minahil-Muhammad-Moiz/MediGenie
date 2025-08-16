// src/redux/thunks/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { register } from '../slices/authSlice';

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
      return response.data;
    } catch (error) {
      if (error.response) return rejectWithValue(error.response.data);
      return rejectWithValue({ error: 'Network Error' });
    }
  }
);
