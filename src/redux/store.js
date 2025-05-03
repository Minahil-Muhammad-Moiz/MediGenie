import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import otpReducer from './slices/otpSlice';
import profileReducer from './slices/profileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    otp: otpReducer,
    profile: profileReducer,
  },
});

export default store;
