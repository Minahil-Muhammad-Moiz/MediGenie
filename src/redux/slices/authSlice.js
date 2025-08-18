// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, verifyOtp, loginUser } from "../thunks/authThunks";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 🔹 Load token on app startup
export const loadToken = createAsyncThunk("auth/loadToken", async () => {
  try {
    const access = await AsyncStorage.getItem("access");
    const refresh = await AsyncStorage.getItem("refresh");
    const user = await AsyncStorage.getItem("user");

    if (access && refresh && user) {
      return {
        access,
        refresh,
        user: JSON.parse(user),
      };
    }
    return null;
  } catch (err) {
    console.log("Failed to load token:", err);
    return null;
  }
});

const initialState = {
  isLoggedIn: false,
  isRegistered: false,
  user: null,
  access: null,
  refresh: null,
  loginMethod: "email",
  loading: false,
  error: null,
  registrationMessage: null,
  otpVerified: false,
  otpMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.access = null;
      state.refresh = null;
      state.loginMethod = "email";
      state.otpVerified = false;

      // 🔹 Clear AsyncStorage
      AsyncStorage.multiRemove(["access", "refresh", "user"]);
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
          state.access = action.payload.access;
          state.refresh = action.payload.refresh;
          state.user = action.payload.user;
          state.isLoggedIn = true;
        }
      })

      // 🔹 Registration
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isRegistered = true;
        state.registrationMessage = action.payload?.message || null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })

      // 🔹 Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.user = action.payload.user;

        // ✅ persist to storage
        AsyncStorage.setItem("access", action.payload.access);
        AsyncStorage.setItem("refresh", action.payload.refresh);
        AsyncStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.payload || "Login failed";
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
        state.otpMessage = "OTP Verified Successfully";

        // ✅ Auto login after OTP
        state.isLoggedIn = true;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.user = action.payload.user;

        AsyncStorage.setItem("access", action.payload.access);
        AsyncStorage.setItem("refresh", action.payload.refresh);
        AsyncStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.otpVerified = false;
        state.error = action.payload || "OTP verification failed";
      });
  },
});

export const { logout, resetRegistration, resetOtp } = authSlice.actions;
export default authSlice.reducer;
