// src/redux/slices/authSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { registerUser, verifyOtp } from '../thunks/authThunks';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔹 Load token on app startup
export const loadToken = createAsyncThunk('auth/loadToken', async () => {
  const access = await AsyncStorage.getItem('access');
  const refresh = await AsyncStorage.getItem('refresh');
  const user = await AsyncStorage.getItem('user');

  if (access && refresh && user) {
    return {
      access,
      refresh,
      user: JSON.parse(user),
    };
  }
  return null;
});


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
      state.token = action.payload.access;   // ✅ access token
      state.loginMethod = action.payload.loginMethod || 'email';

      // ✅ persist tokens & user
      try {
        AsyncStorage.setItem('access', action.payload.access);
        if (action.payload.refresh) {
          AsyncStorage.setItem('refresh', action.payload.refresh);
        }
        AsyncStorage.setItem('user', JSON.stringify(action.payload.user));
      } catch (e) {
        console.log('Failed to save tokens in AsyncStorage', e);
      }
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.loginMethod = 'email';
      state.otpVerified = false;

      AsyncStorage.removeItem('access');
      AsyncStorage.removeItem('refresh');
      AsyncStorage.removeItem('user');
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
      // 🔹 Load token
      .addCase(loadToken.fulfilled, (state, action) => {
        if (action.payload) {
          state.token = action.payload.access;
          state.user = action.payload.user;
          state.isLoggedIn = true;
        }
      })
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
      // inside extraReducers
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpVerified = true;
        state.otpMessage = "OTP Verified Successfully ✅";

        // ✅ Store tokens + user
        state.isLoggedIn = true;
        state.token = action.payload.access;
        state.user = action.payload.user;

        // persist to AsyncStorage
        AsyncStorage.setItem('access', action.payload.access);
        AsyncStorage.setItem('refresh', action.payload.refresh);
        AsyncStorage.setItem('user', JSON.stringify(action.payload.user));
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
