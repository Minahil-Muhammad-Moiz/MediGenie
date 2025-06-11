import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer';
import MainContainer from '../components/MainContainer';
import { colors } from '../utils/constants';

export default function PDFAnalyzer() {
    const navigation = useNavigation();
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hello! How can I help you today?', isUser: false },
        { id: '2', text: 'I need medical assistance.', isUser: true },
    ]);
    const [inputText, setInputText] = useState('');

    const sendMessage = () => {
        if (inputText.trim() === '') return;
        const newMessage = { id: Date.now().toString(), text: inputText, isUser: true };
        setMessages((prev) => [...prev, newMessage]);
        setInputText('');
    };

    const renderItem = ({ item }) => (
        <View
            className={`px-4 py-2 rounded-2xl max-w-[75%] my-2 ${
                item.isUser ? 'self-end bg-blue1' : 'self-start bg-gray-200'
            }`}
        >
            <Text className="text-base text-black">{item.text}</Text>
        </View>
    );

    return (
        <>
            {/* Header */}
            <View className="flex-row items-center p-2 w-full bg-[#171717]">
                <TouchableOpacity
                    className="bg-darkGrey p-2 rounded-full items-center justify-center w-14 h-14"
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back-outline" color={colors.lightText} size={25} />
                </TouchableOpacity>
                <Text className="font-bold text-xl text-white ml-4">PDF Analyzer</Text>
            </View>

            <SafeAreaView className="flex-1 bg-white">
                <KeyboardAvoidingContainer>
                    <MainContainer>
                        {/* Chat Messages */}
                        <FlatList
                            data={messages}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                            className="flex-1 px-4 py-2"
                        />
                    </MainContainer>
                </KeyboardAvoidingContainer>

                {/* Input Area */}
                <View className="flex-row items-center pt-4 pb-6 px-2 bg-[#171717] border-t border-[#171717]">
                    <TextInput
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Type your message"
                        placeholderTextColor="#171717"
                        className="bg-lightText flex-1 rounded-3xl mx-2 py-2 px-4 text-base text-black"
                    />
                    <TouchableOpacity>
                        <Ionicons name="attach" size={30} color={colors.lightGrey} className="mx-1" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="mic" size={30} color={colors.lightGrey} className="mx-1" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={sendMessage}>
                        <Ionicons name="send" size={24} color={colors.blue1} className="mx-2" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
}
