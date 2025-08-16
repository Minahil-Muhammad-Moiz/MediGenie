// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { registerUser, verifyOtp } from '../thunks/authThunks';

const initialState = {
  isLoggedIn: false,
  isRegistered: false,
  user: null,
  token: null,
  loginMethod: 'email',
  loading: false,
  error: null,
  registrationMessage: null,
  otpVerified: false,
  otpMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loginMethod = action.payload.loginMethod;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.loginMethod = 'email';
    },
    register: (state, action) => {
      state.isRegistered = true;
      state.registrationMessage = action.payload.message || null;
    },
    resetRegistration: (state) => {
      state.isRegistered = false;
      state.registrationMessage = null;
    },
    resetOtp: (state) => {
      state.otpVerified = false;
      state.otpMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Registration
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      })

      // 🔹 OTP Verification
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpVerified = false;
        state.otpMessage = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpVerified = true;
        state.otpMessage = action.payload.message;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.otpVerified = false;
        state.error = action.payload || 'OTP verification failed';
      });
  },
});

export const { login, logout, register, resetRegistration, resetOtp } = authSlice.actions;
export default authSlice.reducer;
