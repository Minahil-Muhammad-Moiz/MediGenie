import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 🔹 Create Session (upload PDF)
export const createSession = createAsyncThunk(
  "mediLens/createSession",
  async ({ file, title }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access"); // ✅ get token

      if (!token) {
        return rejectWithValue({ error: "No auth token found" });
      }

      const formData = new FormData();
      formData.append("file", {
        uri: file.uri,
        name: file.name,
        type: "application/pdf",
      });
      formData.append("title", title);

      const response = await axios.post(
        `${API_URL}/rag/session/create/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // ✅ attach token
          },
        }
      );

    //   console.log(response.data);
      return response.data;
      
    } catch (error) {
      console.log("Create Session Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { error: "Upload failed" });
    }
  }
);

const mediLensSlice = createSlice({
  name: "mediLens",
  initialState: {
    sessionId: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSession: (state) => {
      state.sessionId = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionId = action.payload.id; // ✅ save sessionId
      })
      .addCase(createSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearSession } = mediLensSlice.actions;
export default mediLensSlice.reducer;
