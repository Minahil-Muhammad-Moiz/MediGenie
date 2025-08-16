import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from '../thunks/authThunks';

const initialState = {
  isLoggedIn: false,
  isRegistered: false,
  user: null,
  token: null,
  loginMethod: 'email',
  loading: false,
  error: null,
  registrationMessage: null, // <-- for API message
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
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});


export const { login, logout, register, resetRegistration } = authSlice.actions;
export default authSlice.reducer;
