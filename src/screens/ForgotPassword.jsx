import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer'
import MainContainer from '../components/MainContainer'
import DefaultButton from '../components/DefaultButton'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/constants';
import CustomInput from '../components/CustomInput'

const ForgotPassword = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleEmailInput = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            setEmailError('Email is required');
            return;
        } else if (!emailRegex.test(email)) {
            setEmailError('Enter a valid email address');
            return;
        }

        // navigation.navigate('EmailVerification');
        navigation.navigate('EmailVerification', { from: 'ForgotPassword' });
    }

    return (
        <KeyboardAvoidingContainer>
            <MainContainer>
                <TouchableOpacity
                    className='bg-darkGrey p-2 rounded-full w-14 h-14 items-center justify-center'
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back-outline" color={colors.lightText} size={25} />
                </TouchableOpacity>

                <View className='mt-[8%] flex gap-2 justify-center items-start'>
                    <Text className='text-white font-extrabold text-4xl'>Forgot Password?</Text>
                    <Text className='text-white'>Don't worry! It occurs. Please enter the email address linked with your account.</Text>
                </View>

                <View className='mt-[8%] flex gap-6'>
                    <View>
                        <CustomInput
                            leftIcon="mail-outline"
                            keyboardType="email-address"
                            placeholder="Enter your Email"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text.trim().toLowerCase());
                                setEmailError('');
                            }}
                            autoCapitalize="none"
                        />
                        {emailError !== '' && (
                            <Text className="text-fail text-sm ml-2 mt-1">{emailError}</Text>
                        )}
                    </View>

                    <DefaultButton
                        fill
                        border
                        onPress={handleEmailInput}
                    >
                        Send Code
                    </DefaultButton>

                </View>
            </MainContainer>
        </KeyboardAvoidingContainer>
    )
}

export default ForgotPassword
