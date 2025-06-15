import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MainContainer from '../components/MainContainer'
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/constants'

const TermsConditions = () => {
    const navigation = useNavigation();

    return (
        <View className='bg-blue1 flex-1'>
            <View className='mt-[2%] flex gap-8 bg-blue1 px-6 py-4 '>
                <TouchableOpacity
                    className='bg-darkGrey p-2 rounded-full flex items-center justify-center w-12 h-12 '
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name={'arrow-back-outline'}
                        color={colors.lightText}
                        size={22}
                    />
                </TouchableOpacity>
                <Text className='text-white  font-extrabold font-poppinsBold text-3xl mx-auto'>Terms & Conditions</Text>
            </View>

            <KeyboardAvoidingContainer>
                <MainContainer>
                    <View className='flex items-center gap-4'>
                        <Text className='text-white'>
                            Welcome to MediGenie! By using our app, you agree to the following terms and conditions. Please read them carefully before proceeding.</Text>

                        <View>
                            <Text className='text-white font-bold'>1. Acceptance of Terms</Text>
                            <Text className='text-white pl-4'>By accessing or using MediGenius, you agree to be bound by these Terms and Conditions, as well as our Privacy Policy. If you do not agree, please do not use our services.</Text>
                        </View>

                        <View>
                            <Text className='text-white font-bold'>2. Use of the App</Text>
                            <Text className='text-white pl-4'>MediGenius is designed for informational and educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.</Text>
                            <Text className='text-white pl-4'>MediGenius is designed for informational and educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.</Text>
                        </View>

                        <View>
                            <Text className='text-white font-bold'>3. User Responsibilities</Text>
                            <Text className='text-white pl-4'>You are responsible for maintaining the confidentiality of your account and password.</Text>
                            <Text className='text-white pl-4'>All information provided must be accurate and complete. Misuse of the app is strictly prohibited.</Text>
                        </View>

                        <View>
                            <Text className='text-white font-bold'>4. Medical Disclaimer</Text>
                            <Text className='text-white pl-4'>MediGenius does not provide medical advice, diagnosis, or treatment. Always consult a healthcare professional for medical concerns.</Text>
                            <Text className='text-white pl-4'>Any information provided by MediGenius is for reference only and should not be relied upon for critical health decisions.</Text>
                        </View>

                        <View>
                            <Text className='text-white font-bold'>5.Intellectual Property</Text>
                            <Text className='text-white pl-4'>All content, features, and functionality in MediGenius are owned by MediGenius and protected by copyright and trademark laws.</Text>
                            <Text className='text-white pl-4'>Unauthorized use, reproduction, or distribution of any content is prohibited.</Text>
                        </View>

                        <View>
                            <Text className='text-white font-bold'>6. Limitation of Liability</Text>
                            <Text className='text-white pl-4'>MediGenius is not liable for any damages or losses resulting from the use of our app.</Text>
                            <Text className='text-white pl-4'>The app is provided "as is" without any warranties of any kind.</Text>
                        </View>

                    </View>
                </MainContainer>
            </KeyboardAvoidingContainer>
        </View>
    )
}

export default TermsConditions