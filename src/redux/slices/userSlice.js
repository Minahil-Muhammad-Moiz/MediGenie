// redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    let token = state.auth.token;  // try Redux first

    if (!token) {
      token = await AsyncStorage.getItem("access"); // fallback
    }

    if (!token) return thunkAPI.rejectWithValue("No token");

    const res = await axios.get("https://medigenie-1.onrender.com/api/auth/user/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});


const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
