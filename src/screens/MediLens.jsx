import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';  // ✅ for gradient button
import MainContainer from '../components/MainContainer';
import { colors } from '../utils/constants';

export default function MediLens() {
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [chatReady, setChatReady] = useState(false);
    const [loading, setLoading] = useState(false);

    // Simulated backend
    const handleFileUpload = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setChatReady(true);
            Alert.alert("✅ Ready!", "Your file has been analyzed. Start chatting now.");
        }, 2500);
    };

    const sendMessage = () => {
        if (!chatReady) {
            Alert.alert("Upload Required", "Please upload a file first to start chatting.");
            return;
        }
        if (inputText.trim() === '') return;

        const newMessage = { id: Date.now().toString(), text: inputText, isUser: true };
        setMessages((prev) => [...prev, newMessage]);
        setInputText('');

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { id: Date.now().toString(), text: "Here’s an insight from your file 📑", isUser: false }
            ]);
        }, 1000);
    };

    const renderItem = ({ item }) => (
        <View
            className={`px-4 py-2 rounded-2xl max-w-[75%] my-2 shadow-md ${
                item.isUser ? 'self-end bg-blue1' : 'self-start bg-gray-200'
            }`}
        >
            <Text className="text-base text-black">{item.text}</Text>
        </View>
    );

    return (
        <>
            {/* Header */}
            <View className="flex-row items-center p-4 w-full bg-black1">
                <TouchableOpacity
                    className="bg-darkGrey p-2 rounded-full items-center justify-center w-12 h-12"
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back-outline" color={colors.lightText} size={22} />
                </TouchableOpacity>
                <Text className="font-bold text-2xl text-white ml-4">MediLens</Text>
            </View>

            <SafeAreaView className="flex-1 bg-black1 relative">
                <MainContainer>
                    {/* Chat Messages */}
                    <FlatList
                        data={messages.slice().reverse()}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        className="flex-1 px-4"
                        inverted
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
                    />
                </MainContainer>

                {/* Input Area */}
                <View className="flex-row items-center p-3 bg-[#1c1c1c] rounded-t-2xl shadow-lg">
                    <TextInput
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder={chatReady ? "Type your message..." : "Upload a file first"}
                        placeholderTextColor="#777"
                        editable={chatReady}
                        className="bg-white/90 flex-1 rounded-3xl mx-2 py-2 px-4 text-base text-black shadow-sm"
                    />
                    <TouchableOpacity onPress={sendMessage}>
                        <Ionicons
                            name="paper-plane-outline"
                            size={26}
                            color={chatReady ? colors.blue1 : colors.lightGrey}
                        />
                    </TouchableOpacity>
                </View>

                {/* Floating Upload Button */}
                {!chatReady && !loading && (
                    <TouchableOpacity
                        onPress={handleFileUpload}
                        className="absolute bottom-20 right-6 rounded-full shadow-lg"
                    >
                        <LinearGradient
                            colors={['#4facfe', '#00f2fe']}
                            style={{
                                width: 65,
                                height: 65,
                                borderRadius: 35,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Ionicons name="cloud-upload-outline" size={32} color="#fff" />
                        </LinearGradient>
                        <Text className="text-white text-center mt-2 text-sm font-medium">
                            Upload
                        </Text>
                    </TouchableOpacity>
                )}

                {/* Loading Overlay */}
                {loading && (
                    <View className="absolute inset-0 bg-black/70 flex justify-center items-center">
                        <ActivityIndicator size="large" color={colors.primary} />
                        <Text className="text-white mt-4 text-lg font-bold animate-pulse">
                            Analyzing your file...
                        </Text>
                    </View>
                )}
            </SafeAreaView>
        </>
    );
}
