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
import { pick, keepLocalCopy } from '@react-native-documents/picker'; // ✅ for picking & saving files
import MainContainer from '../components/MainContainer';
import { colors } from '../utils/constants';

export default function MediLens() {
    const navigation = useNavigation();

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [pdfUploaded, setPdfUploaded] = useState(false);
    const [pdfFile, setPdfFile] = useState(null); // ✅ store uploaded file details

    // 📂 Actual PDF Upload
    const handleUpload = async () => {
        try {
            const [file] = await pick({ type: 'application/pdf' }); // only PDF
            if (!file) return;

            setIsUploading(true);

            // create local copy
            const [localCopy] = await keepLocalCopy({
                files: [
                    {
                        uri: file.uri,
                        fileName: file.name ?? 'document.pdf',
                    },
                ],
                destination: 'documentDirectory',
            });

            setIsUploading(false);

            const savedFile = {
                uri: localCopy.localUri,
                name: localCopy.localUri.split('/').pop(), // extract filename
            };

            setPdfFile(savedFile);
            console.log('Saved file:', savedFile);

            setPdfUploaded(true);
            Alert.alert(
                '✅ Success',
                `Your PDF "${file.name}" has been analyzed. You can now chat with the bot!`
            );


        } catch (err) {
            console.log('Upload Error:', err);
            Alert.alert('❌ Failed', 'Could not upload file.');
            setIsUploading(false);
        }
    };

    // 💬 Send message with dummy bot reply
    const sendMessage = () => {
        if (inputText.trim() === '') return;

        const userMessage = { id: Date.now().toString(), text: inputText, isUser: true };
        setMessages((prev) => [...prev, userMessage]);

        setInputText('');

        // Dummy bot reply
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    text: `🤖 Bot reply to: "${userMessage.text}"`,
                    isUser: false,
                },
            ]);
        }, 1000);
    };

    // 💬 Render message bubbles
    const renderItem = ({ item }) => (
        <View
            className={`px-4 py-2 rounded-2xl max-w-[75%] my-2 shadow-md ${item.isUser ? 'self-end bg-blue1' : 'self-start bg-gray-200'
                }`}
        >
            <Text className="text-base text-black">{item.text}</Text>
        </View>
    );

    return (
        <>
            {/* Header */}
            <View className=" p-4 w-full bg-black1 absolute top-0 z-10">
                <View className='flex-row items-center'>
                    <TouchableOpacity
                        className="bg-darkGrey p-2 rounded-full items-center justify-center w-12 h-12"
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back-outline" color={colors.lightText} size={22} />
                    </TouchableOpacity>
                    <Text className="font-bold text-2xl text-white ml-4">MediLens</Text>
                </View>
                {pdfFile && (
                    <Text className="text-black w-full bg-blue1 rounded-full font-bold text-center text-sm p-1">
                        📄 {pdfFile?.name}
                    </Text>
                )}
            </View>


            <SafeAreaView className="flex-1 bg-black1 relative pt-20">
                <MainContainer>
                    {/* Show Upload Button if PDF not uploaded */}
                    {!pdfUploaded && !isUploading && (
                        <View className="flex-1 items-center justify-center">
                            <TouchableOpacity
                                onPress={handleUpload}
                                className="bg-blue1 px-6 py-3 rounded-2xl"
                            >
                                <Text className="text-white text-lg font-semibold">
                                    Upload PDF
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Show Loader when uploading */}
                    {isUploading && (
                        <View className="flex-1 items-center justify-center">
                            <ActivityIndicator size="large" color={colors.blue1} />
                            <Text className="text-white mt-4">Analyzing your PDF...</Text>
                        </View>
                    )}

                    {/* Chat Messages */}
                    {pdfUploaded && (
                        <FlatList
                            data={messages.slice().reverse()}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                            className="flex-1 px-4"
                            inverted
                            contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
                        />
                    )}
                </MainContainer>

                {/* Input Area (enabled only if PDF is uploaded) */}
                <View className="flex-row items-center p-4 px-2 bg-[#171717] border-t border-[#171717]">
                    <TextInput
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder={
                            pdfUploaded ? 'Type your message' : 'Upload a PDF to start chatting'
                        }
                        placeholderTextColor="#888"
                        editable={pdfUploaded}
                        className={`flex-1 rounded-3xl mx-2 py-2 px-4 text-base text-black ${pdfUploaded ? 'bg-lightText' : 'bg-gray-400'
                            }`}
                    />
                    <TouchableOpacity
                        onPress={sendMessage}
                        disabled={!pdfUploaded}
                        className="ml-2"
                    >
                        <Ionicons
                            name="paper-plane-outline"
                            size={24}
                            color={pdfUploaded ? colors.blue1 : '#555'}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
}
