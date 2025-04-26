import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MainContainer from '../components/MainContainer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer';
import DefaultButton from '../components/DefaultButton';
import { OtpInput } from 'react-native-otp-entry';

const EmailVerification = () => {
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false);
    const [modalSuccess, setModalSucess] = useState(false)
    const [OTPtext, setOTPtext] = useState('')
    const [resendDisabled, setResendDisabled] = useState(false);
    const [timer, setTimer] = useState(0);

    const handleVerification = (text) => {
        if (text === "1234") {
            setModalSucess(true)
            setModalVisible(true);
            setTimeout(() => {
                setModalVisible(false);
                navigation.navigate('ResetPassword');
            }, 1500);
        } else {
            setModalSucess(false)
            setModalVisible(true);
            setTimeout(() => {
                setModalVisible(false);
            }, 1500);
        }
    }

    useEffect(() => {
        let interval;
        if (resendDisabled) {
            setTimer(60); // 60 seconds
            interval = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setResendDisabled(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendDisabled]);


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
                    <Text className='text-white font-extrabold text-4xl'>OTP Verification</Text>
                    <Text className='text-white'>Enter the 4-digit code sent to your email</Text>
                </View>

                <View className='mt-[4%] flex gap-10'>
                    <View className='flex items-center justify-center'>
                        <OtpInput
                            numberOfDigits={4}
                            focusColor='#22d3ee'
                            autoFocus={false}
                            // hideStick={true}
                            blurOnFilled={true}
                            disabled={false}
                            type="numeric"
                            secureTextEntry={false}
                            // focusStickBlinkingDuration={500}
                            onFocus={() => console.log("Focused")}
                            onBlur={() => console.log("Blurred")}
                            // onTextChange={(text) => setOTPtext(text)}
                            onFilled={(text) => {
                                if (text) {
                                    setOTPtext(text);
                                    handleVerification(text);
                                }
                            }}
                            textInputProps={{
                                accessibilityLabel: "One-Time Password",
                            }}
                            textProps={{
                                accessibilityRole: "text",
                                accessibilityLabel: "OTP digit",
                                allowFontScaling: false,
                            }}
                            theme={{
                                containerStyle: {
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 6,
                                    marginTop: 24,
                                },
                                pinCodeContainerStyle: {
                                    borderWidth: 1,
                                    borderColor: '#aaa',
                                    borderRadius: 12,
                                    width: 50,
                                    height: 60,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginHorizontal: 4,
                                },
                                focusedPinCodeContainerStyle: {
                                    borderColor: '#22d3ee',
                                    borderWidth: 2,
                                },
                                // filledPinCodeContainerStyle: {
                                //     backgroundColor: '#0f0',
                                // },
                                disabledPinCodeContainerStyle: {
                                    backgroundColor: '#444',
                                    opacity: 0.5,
                                },
                                pinCodeTextStyle: {
                                    color: '#fff',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                },
                                placeholderTextStyle: {
                                    color: '#888',
                                    fontSize: 20,
                                },
                                focusStickStyle: {
                                    height: 2,
                                    width: 8,
                                    backgroundColor: '#22d3ee',
                                    marginTop: 4,
                                    borderRadius: 4,
                                },
                            }}
                        />
                    </View>

                    <View>
                        <DefaultButton fill border title='Verify' onPress={() => handleVerification(OTPtext)}>
                            Verify
                        </DefaultButton>

                        <View className='inline-flex flex-row justify-center items-center mt-2'>
                            <Text className='text-lightGrey  font-poppins font-medium'>
                                Didn't recieve code?{' '}
                            </Text>
                            <TouchableOpacity onPress={() => setResendDisabled(true)} disabled={resendDisabled}>
                                <Text className='font-poppinsBold font-bold text-lightText '>
                                    Resend
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {resendDisabled && (
                            <Text className='text-sm text-lightText text-center mt-1'>
                                You can resend code in {timer}s
                            </Text>
                        )}
                    </View>
                </View>

                <Modal visible={modalVisible} transparent animationType="fade">
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)' }}>
                        <View style={{ backgroundColor: colors.darkGrey, padding: 24, borderRadius: 20, alignItems: 'center', width: '60%' }}>
                            <Ionicons name={modalSuccess ? "checkmark-circle" : "close-circle"} size={64} color={modalSuccess ? colors.success : colors.fail} />
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 16, textAlign: 'center' }}>
                                {modalSuccess ? 'OTP Verified' : 'Invalid OTP'}
                            </Text>
                        </View>
                    </View>
                </Modal>

            </MainContainer>
        </KeyboardAvoidingContainer>
    )
}

export default EmailVerification