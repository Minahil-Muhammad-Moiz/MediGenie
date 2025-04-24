import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import MainContainer from '../components/MainContainer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/colors';
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer';
import DefaultButton from '../components/DefaultButton';

const EmailVerification = () => {
    const navigation = useNavigation()

    const handleBack = () => {
        navigation.goBack()
    }

    const textInputRef = useRef(null)
    const MAX_CODE_LENGTH = 4;
    const [code, setCode] = useState('')

    const handleOnSubmitEditing = () => {

    }

    return (
        <KeyboardAvoidingContainer>
            <MainContainer>

                <TouchableOpacity
                    className='bg-darkGrey p-2 rounded-full w-14 h-14 items-center justify-center'
                    onPress={handleBack}
                >
                    <Ionicons name="arrow-back-outline" color={colors.lightText} size={25} />
                </TouchableOpacity>

                <View className='mt-[8%] flex gap-2 justify-center items-center'>
                    <Text className='text-white font-extrabold text-4xl'>OTP Verification</Text>
                    <Text className='text-white'>Enter the 4-digit code sent to your email</Text>
                </View>

                <View className='border border-red-600 mt-[4%] flex gap-4'>
                    <View className='flex items-center justify-center'>
                        <TextInput
                            keyboardType='number-pad'
                            reuturnKeyType='done'
                            textContentType='oneTimeCode'
                            ref={textInputRef}
                            maxLength={MAX_CODE_LENGTH}
                            value={code}
                            onChangeText={setCode}
                            onSubmitEditing={handleOnSubmitEditing} 
                            className='border border-lightGrey max-w-[15%] p-3 rounded-lg font-poppinsBold text-center text-base '
                            placeholder='1234'
                            placeholderTextColor={colors.lightGrey}/>
                    </View>

                    <View>
                        <DefaultButton fill border title='Verify'>
                            Verify
                        </DefaultButton>

                        <View className='inline-flex flex-row justify-center items-center mt-2'>
                            <Text className='text-lightGrey  font-poppins font-medium'>
                                Didn't recieve code?{' '}
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                                <Text className='font-poppinsBold font-bold text-lightText '>
                                    Resend
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </MainContainer>
        </KeyboardAvoidingContainer>
    )
}

export default EmailVerification