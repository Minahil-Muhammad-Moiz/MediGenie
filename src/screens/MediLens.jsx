import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { pick, keepLocalCopy } from "@react-native-documents/picker";
import MainContainer from "../components/MainContainer";
import { colors } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  createSession,
  sendMessage,
  fetchSessions,
  retrieveSession,
} from "../redux/slices/mediLensSlice";

// 🔹 Message bubble
const MessageBubble = ({ item }) => {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (item.streaming) {
      const interval = setInterval(() => setShowCursor((prev) => !prev), 500);
      return () => clearInterval(interval);
    }
  }, [item.streaming]);

  return (
    <View
      className={`px-4 py-2 rounded-2xl max-w-[75%] my-2 shadow-md ${item.isUser ? "self-end bg-blue1" : "self-start bg-gray-200"
        }`}
    >
      <Text className="text-base text-black">
        {item.text}
        {item.streaming && showCursor && <Text className="text-gray-500">▌</Text>}
      </Text>
    </View>
  );
};

export default function MediLens() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { sessionId, messages, sessions, loading, title } = useSelector(
    (state) => state.mediLens
  );



  const [inputText, setInputText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchSessions());
  }, [dispatch]);

  // 📂 Upload PDF
  const handleUpload = async () => {
    try {
      const [file] = await pick({ type: "application/pdf" });
      if (!file) return;

      setIsUploading(true);

      const [localCopy] = await keepLocalCopy({
        files: [{ uri: file.uri, fileName: file.name ?? "document.pdf" }],
        destination: "documentDirectory",
      });

      const savedFile = {
        uri: localCopy.localUri,
        name: localCopy.localUri.split("/").pop(),
      };

      const result = await dispatch(createSession({ file: savedFile, title: savedFile.name }));

      if (result.meta.requestStatus === "fulfilled") {
        setPdfUploaded(true);
        Alert.alert("✅ Ready to Chat!", `PDF "${savedFile.name}" uploaded`);
        dispatch(fetchSessions());
      } else {
        throw new Error(result.payload?.error || "Upload failed");
      }
    } catch (err) {
      Alert.alert("❌ Failed", err.message || "Could not upload file.");
    } finally {
      setIsUploading(false);
    }
  };

  // 💬 Send message
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    dispatch(sendMessage({ sessionId, content: inputText }));
    setInputText("");
  };

  return (
    <SafeAreaView className="flex-1 bg-black1 relative">
      {/* Header */}
      <View className="p-4 w-full bg-black1 flex-row items-center z-10">
        <TouchableOpacity
          className="bg-darkGrey p-2 rounded-full items-center justify-center w-12 h-12"
          onPress={() => setMenuOpen(!menuOpen)}
        >
          <Ionicons name="menu-outline" color={colors.lightText} size={22} />
        </TouchableOpacity>
        <Text className="font-bold text-2xl text-white ml-4">
          {title || "MediLens"}
        </Text>
      </View>

      {/* Side Menu */}
      {menuOpen && (
        <View className="absolute top-0 left-0 bottom-0 w-64 bg-[#222] z-20 p-4">
          <TouchableOpacity
            className="bg-darkGrey p-2 rounded-full items-center justify-center w-12 h-12"
            onPress={() => setMenuOpen(false)}
          >
            <Ionicons name="close" color={colors.lightText} size={22} />
          </TouchableOpacity>
          <Text className="text-white font-bold text-xl my-4">Sessions</Text>

          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <FlatList
              data={sessions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className={`p-3 rounded-lg mb-2 ${item.id === sessionId ? "bg-blue1" : "bg-gray-700"
                    }`}
                  onPress={() => {
                    dispatch(retrieveSession(item.id));
                    setPdfUploaded(true);
                    setMenuOpen(false);
                    console.log(sessionId, title);

                  }}
                >
                  <Text className="text-white">{item.title}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      )}

      {/* Main Content */}
      <SafeAreaView className="flex-1 pt-2">
        <MainContainer>
          {!pdfUploaded && !isUploading && (
            <View className="flex-1 items-center justify-center">
              <TouchableOpacity
                onPress={handleUpload}
                className="bg-blue1 px-6 py-3 rounded-2xl"
              >
                <Text className="text-white text-lg font-semibold">Upload PDF</Text>
              </TouchableOpacity>
            </View>
          )}

          {isUploading && (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color={colors.blue1} />
              <Text className="text-white mt-4">Analyzing your PDF...</Text>
            </View>
          )}

          {pdfUploaded && (
            <FlatList
              data={messages.slice().reverse()}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <MessageBubble item={item} />}
              className="flex-1 px-4"
              inverted
              contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
            />
          )}
        </MainContainer>

        {/* Input */}
        <View className="flex-row items-center p-4 px-2 bg-[#171717] border-t border-[#171717]">
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder={pdfUploaded ? "Type your message" : "Upload a PDF to start chatting"}
            placeholderTextColor="#888"
            editable={pdfUploaded}
            className={`flex-1 rounded-3xl mx-2 py-2 px-4 text-base text-black ${pdfUploaded ? "bg-lightText" : "bg-gray-400"
              }`}
          />
          <TouchableOpacity onPress={handleSendMessage} disabled={!pdfUploaded} className="ml-2">
            <Ionicons
              name="paper-plane-outline"
              size={24}
              color={pdfUploaded ? colors.blue1 : "#555"}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}
