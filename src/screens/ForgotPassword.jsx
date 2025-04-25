import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer'
import MainContainer from '../components/MainContainer'
import DefaultButton from '../components/DefaultButton'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/colors';

const ForgotPassword = () => {
    const navigation = useNavigation()
    return (
        <KeyboardAvoidingContainer>
            <MainContainer>
                <TouchableOpacity
                    className='bg-darkGrey p-2 rounded-full w-14 h-14 items-center justify-center'
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back-outline" color={colors.lightText} size={25} />
                </TouchableOpacity>
                <DefaultButton fill border onPress={() => navigation.navigate('EmailVerification')}>Send Code</DefaultButton>
            </MainContainer>
        </KeyboardAvoidingContainer>
    )
}

export default ForgotPassword
