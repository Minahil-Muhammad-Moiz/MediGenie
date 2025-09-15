import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 🔹 Fetch Session List
export const fetchSessions = createAsyncThunk(
  "mediLens/fetchSessions",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access");
      if (!token) return rejectWithValue({ error: "No auth token found" });

      const response = await axios.get(`${API_URL}/rag/session/list/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      console.log("Fetch Sessions Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { error: "Failed to load sessions" });
    }
  }
);

// 🔹 Retrieve Session (on click from list)
export const retrieveSession = createAsyncThunk(
  "mediLens/retrieveSession",
  async (sessionId, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access");
      if (!token) return rejectWithValue({ error: "No auth token found" });

      const response = await axios.get(
        `${API_URL}/rag/session/${sessionId}/retrieve/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("Retrieve Session Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { error: "Failed to retrieve session" });
    }
  }
);

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

// 🔹 Send Message
export const sendMessage = createAsyncThunk(
  "mediLens/sendMessage",
  async ({ sessionId, content }, { dispatch, rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access");
      if (!token) return rejectWithValue({ error: "No auth token found" });

      const userMessage = { id: Date.now().toString(), text: content, isUser: true };
      dispatch(addMessage(userMessage));

      const botId = `${Date.now()}-bot`;
      dispatch(addMessage({ id: botId, text: "...", isUser: false, streaming: false }));

      const response = await fetch(`${API_URL}/rag/message/create/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session: sessionId, content }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Message failed");
      }

      let botReply;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        botReply = (await response.json()).reply || "No reply found";
      } else {
        botReply = await response.text();
      }

      const cleanedBotReply = botReply
        .split("\n")
        .map((line) => line.replace(/^data:\s?/, "").trim())
        .filter((line) => line.length > 0)
        .join(" ");

      dispatch(updateMessage({ id: botId, text: cleanedBotReply }));

      return { success: true };
    } catch (error) {
      console.log("Send Message Error:", error.message);
      return rejectWithValue({ error: error.message });
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "mediLens/fetchMessages",
  async (sessionId, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access");
      if (!token) return rejectWithValue("No auth token found");

      const response = await fetch(`${API_URL}/rag/message/${sessionId}/list/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || "Failed to fetch messages");
      }

      const data = await response.json();
      // console.log(data);
      
      // Normalize to match UI format
      return data.map((msg) => ({
        id: msg.id,
        text: msg.content,
        isUser: msg.role === "User",
      }));
    } catch (err) {
      // console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

const mediLensSlice = createSlice({
  name: "mediLens",
  initialState: {
    sessionId: null,
    sessions: [],
    loading: false,
    error: null,
    messages: [],
    pdfFile: null,
    title: null,
  },
  reducers: {
    clearSession: (state) => {
      state.sessionId = null;
      state.error = null;
      state.messages = [];
      state.pdfFile = null;
      state.title = null;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    updateMessage: (state, action) => {
      const { id, text } = action.payload;
      const msg = state.messages.find((m) => m.id === id);
      if (msg) {
        msg.text = text;
        msg.streaming = false;
      }
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload.reverse();
      })
      .addCase(fetchSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.sessionId = action.payload.id;
        state.title = action.payload.title;
        state.pdfFile = action.payload.file;
      })
      .addCase(retrieveSession.fulfilled, (state, action) => {
        state.sessionId = action.payload.id;
        state.title = action.payload.title;
        state.pdfFile = action.payload.file;
        state.messages =
          action.payload.recent_messages?.reverse().map((m) => ({
            id: m.id,
            text: m.content,
            isUser: m.role === "User",
          })) || [];
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const { clearSession, addMessage, updateMessage, clearMessages } = mediLensSlice.actions;
export default mediLensSlice.reducer;
