import { Modal, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MainContainer from '../components/MainContainer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer';
import DefaultButton from '../components/DefaultButton';
import { OtpInput } from 'react-native-otp-entry';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp } from '../redux/thunks/authThunks';
import { resetOtp } from '../redux/slices/authSlice';

const EmailVerification = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    const { loading, otpVerified, otpMessage, error } = useSelector(
        (state) => state.auth
    );

    const [modalVisible, setModalVisible] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [OTPtext, setOTPtext] = useState('');
    const [resendDisabled, setResendDisabled] = useState(false);
    const [timer, setTimer] = useState(0);

    const routeName = route?.params?.from;
    const userEmail = route?.params?.email;

    // 🔹 Handle OTP verification
    const handleVerification = async () => {
        if (!OTPtext) return;

        const resultAction = await dispatch(verifyOtp({ email: userEmail, code: OTPtext }));

        if (verifyOtp.fulfilled.match(resultAction)) {
            setModalSuccess(true);
            setModalVisible(true);

            setTimeout(() => {
                setModalVisible(false);
                dispatch(resetOtp());
                if (routeName === 'SignUpScreen') {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'ProfileScreen', from: 'EmailVerification', data: resultAction?.payload }],
                    });
                } else {
                    navigation.navigate('ResetPassword');
                }
            }, 1500);
        } else {
            setModalSuccess(false);
            setModalVisible(true);
            setTimeout(() => {
                setModalVisible(false);
            }, 1500);
        }
    };

    // 🔹 Resend timer logic
    useEffect(() => {
        let interval;
        if (resendDisabled) {
            setTimer(60);
            interval = setInterval(() => {
                setTimer((prev) => {
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
                {/* Back button */}
                <TouchableOpacity
                    className="bg-darkGrey p-2 rounded-full w-12 h-12 items-center justify-center"
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back-outline" color={colors.lightText} size={22} />
                </TouchableOpacity>

                {/* Title */}
                <View className="mt-[4%] flex gap-2 justify-center items-start">
                    <Text className="text-white font-extrabold text-3xl">OTP Verification</Text>
                    <Text className="text-white">
                        Enter the 4-digit code sent to {userEmail}
                    </Text>
                </View>

                {/* OTP Input */}
                <View className="mt-[2%] flex gap-10">
                    <View className="flex items-center justify-center">
                        <OtpInput
                            numberOfDigits={4}
                            focusColor="#22d3ee"
                            blurOnFilled={true}
                            type="numeric"
                            onFilled={(text) => setOTPtext(text)}
                            theme={{
                                containerStyle: {
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 6,
                                    marginTop: 20,
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
                                pinCodeTextStyle: {
                                    color: '#fff',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                },
                            }}
                        />
                    </View>

                    {/* Verify + Resend */}
                    <View>
                        <DefaultButton fill border title="Verify" onPress={handleVerification}>
                            {loading ? 'Verifying...' : 'Verify'}
                        </DefaultButton>

                        <View className="inline-flex flex-row justify-center items-center mt-2">
                            <Text className="text-lightGrey font-medium">
                                Didn't receive code?{' '}
                            </Text>
                            <TouchableOpacity
                                onPress={() => setResendDisabled(true)}
                                disabled={resendDisabled}
                            >
                                <Text className="font-bold text-lightText">Resend</Text>
                            </TouchableOpacity>
                        </View>
                        {resendDisabled && (
                            <Text className="text-sm text-lightText text-center mt-1">
                                You can resend code in {timer}s
                            </Text>
                        )}
                    </View>
                </View>

                {/* Modal */}
                <Modal visible={modalVisible} transparent animationType="fade">
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.6)',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: colors.darkGrey,
                                padding: 24,
                                borderRadius: 20,
                                alignItems: 'center',
                                width: '60%',
                            }}
                        >
                            <Ionicons
                                name={modalSuccess ? 'checkmark-circle' : 'close-circle'}
                                size={64}
                                color={modalSuccess ? colors.success : colors.fail}
                            />
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    marginTop: 16,
                                    textAlign: 'center',
                                }}
                            >
                                {modalSuccess
                                    ? otpMessage || 'OTP Verified'
                                    : error?.message || 'Invalid OTP'}
                            </Text>
                        </View>
                    </View>
                </Modal>
            </MainContainer>
        </KeyboardAvoidingContainer>
    );
};

export default EmailVerification;
