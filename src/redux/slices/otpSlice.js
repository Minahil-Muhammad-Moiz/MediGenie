import { createSlice } from '@reduxjs/toolkit';

const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    email: '',
    otp: '',
    isVerified: false,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    verifyOtp: (state) => {
      state.isVerified = true;
    },
    resetOtp: (state) => {
      state.email = '';
      state.otp = '';
      state.isVerified = false;
    },
  },
});

export const { setEmail, setOtp, verifyOtp, resetOtp } = otpSlice.actions;
export default otpSlice.reducer;
