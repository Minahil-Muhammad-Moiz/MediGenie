// redux/slices/mediLensSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createParser } from "eventsource-parser";

// 🔹 Create Session
export const createSession = createAsyncThunk(
  "mediLens/createSession",
  async ({ file, title }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access");
      if (!token) return rejectWithValue({ error: "No auth token found" });

      const formData = new FormData();
      formData.append("file", {
        uri: file.uri,
        name: file.name,
        type: "application/pdf",
      });
      formData.append("title", title);

      const response = await axios.post(`${API_URL}/rag/session/create/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log("Create Session Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { error: "Upload failed" });
    }
  }
);

// 🔹 Send Message (Streaming via SSE)
export const sendMessage = createAsyncThunk(
  "mediLens/sendMessage",
  async ({ sessionId, content }, { dispatch, rejectWithValue }) => {
    // console.log(sessionId);

    try {
      const token = await AsyncStorage.getItem("access");
      if (!token) return rejectWithValue({ error: "No auth token found" });

      // Add user message immediately
      const userMessage = { id: Date.now().toString(), text: content, isUser: true };
      dispatch(addMessage(userMessage));

      // Create placeholder bot message
      const botId = `${Date.now()}-bot`;
      dispatch(addMessage({ id: botId, text: "...", isUser: false, streaming: false }));

      // Make API request
      const response = await fetch(`${API_URL}/rag/message/create/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session: sessionId, // 👈 changed from `session`
          content,
        }),
      });

      // Handle failure
      if (!response.ok) {
        const errText = await response.text();
        console.log("❌ API Error:", errText);
        throw new Error(errText || "Message failed");
      }

      // Try parsing JSON, fallback to text
      let botReply;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        botReply = (await response.json()).reply || "No reply found";
      } else {
        botReply = await response.text();
      }
      const cleanedBotReply = botReply
        .split("\n")
        .map(line => line.replace(/^data:\s?/, "").trim())
        .filter(line => line.length > 0)
        .join(" ");
      // console.log(cleanedBotReply);


      // Update bot message with final text
      dispatch(updateMessage({ id: botId, text: cleanedBotReply }));

      return { success: true };
    } catch (error) {
      console.log("Send Message Error:", error.message);
      return rejectWithValue({ error: error.message });
    }
  }
);

const mediLensSlice = createSlice({
  name: "mediLens",
  initialState: {
    sessionId: null,
    loading: false,
    error: null,
    messages: [],
  },
  reducers: {
    clearSession: (state) => {
      state.sessionId = null;
      state.error = null;
      state.messages = [];
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    appendStreamingChunk: (state, action) => {
      const { id, chunk } = action.payload;
      const msg = state.messages.find((m) => m.id === id);
      if (msg) msg.text += chunk;
    },
    finishStreaming: (state, action) => {
      const msg = state.messages.find((m) => m.id === action.payload);
      if (msg) msg.streaming = false;
    },
    // 👇 new reducer
    updateMessage: (state, action) => {
      const { id, text } = action.payload;
      const msg = state.messages.find((m) => m.id === id);
      if (msg) {
        msg.text = text;
        msg.streaming = false;
      }
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
        state.sessionId = action.payload.id;
      })
      .addCase(createSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});


export const { clearSession, addMessage, appendStreamingChunk, finishStreaming, updateMessage } =
  mediLensSlice.actions;
export default mediLensSlice.reducer;
