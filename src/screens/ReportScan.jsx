import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer';
import MainContainer from '../components/MainContainer';
import { colors } from '../utils/constants';
import { useNavigation } from '@react-navigation/native';

export default function ReportScan() {
    const navigation = useNavigation()
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hello! How can I help you today?', isUser: false },
        { id: '2', text: ' I need medical assisstance.', isUser: true },
    ]);
    const [inputText, setInputText] = useState('');

    const sendMessage = () => {
        if (inputText.trim() === '') return;
        const newMessage = { id: Date.now().toString(), text: inputText, isUser: true };
        setMessages((prev) => [...prev, newMessage]);
        setInputText('');
    };

    const renderItem = ({ item }) => (
        <View style={[styles.messageBubble, item.isUser ? styles.userBubble : styles.botBubble]}>
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <>
            {/* Header */}
            <View className='flex-row items-center p-4 w-full bg-[#171717] '>
                <TouchableOpacity
                    className='bg-darkGrey p-2 rounded-full flex items-center justify-center w-14 h-14 '
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name={'arrow-back-outline'}
                        color={colors.lightText}
                        size={25}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle} className='font-bold text-xl text-white  '>Report Scanner</Text>
            </View>

            <SafeAreaView className='flex-1 '>
                <MainContainer>

                    {/* Chat Messages */}
                    <FlatList
                        data={messages}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={styles.chatContainer}
                    />

                </MainContainer>
                {/* Input Area */}
                <View style={styles.inputContainer} className='flex-row items-center py-4 px-2 bg-[#171717] border-t border-[#171717]'>
                    <TextInput
                        style={styles.input}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Type your message"
                        placeholderTextColor='#171717'
                        className='bg-lightText flex-1 rounded-3xl mx-2 p-4 '
                    />
                    <TouchableOpacity>
                        <Icon name="attach" size={30} color={colors.lightGrey} className='mx-1 ' />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="mic" size={30} color={colors.lightGrey} className='mx-1 ' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={sendMessage}>
                        <Icon name="send" size={24} color={colors.blue1} className='mx-2 ' />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

        </>
    );
}

const styles = StyleSheet.create({
    chatContainer: {
        padding: 10,
        flexGrow: 1,
    },
    messageBubble: {
        padding: 10,
        borderRadius: 12,
        marginVertical: 5,
        maxWidth: '75%',
    },
    userBubble: {
        backgroundColor: colors.blue1,
        alignSelf: 'flex-end',
    },
    botBubble: {
        backgroundColor: '#EEE',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
    },
});
