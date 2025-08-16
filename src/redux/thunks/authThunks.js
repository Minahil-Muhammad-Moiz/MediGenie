// src/redux/thunks/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { register } from '../slices/authSlice';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://medigenie-1.onrender.com/api/auth/registration/',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // We only have status/message — no user object yet
      dispatch(register({ message: response.data.message }));
      return response.data;

    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ error: 'Network Error' });
    }
  }
);
