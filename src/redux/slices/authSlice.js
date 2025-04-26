import { createSlice } from '@reduxjs/toolkit';

initialState =  {
  isLoggedIn: false,
  isRegistered: false,
  user: null,
  token: null,
  loginMethod: 'email' || 'google',
}

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
      state.user = action.payload.user;
      // You can decide: auto login or just mark registered
      // state.isLoggedIn = true;  <-- if you want auto-login
    },
    resetRegistration: (state) => {
      state.isRegistered = false;
    },
  },
});

export const { login, logout, register, resetRegistration } = authSlice.actions;
export default authSlice.reducer;
