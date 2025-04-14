import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/colors';
import MainContainer from '../components/MainContainer';
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer';
import CustomInput from '../components/CustomInput';

export default function LoginScreen() {
  const [secureTextEntry, setSecureTextEntry] = useState(false)
  const navigation = useNavigation()

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <KeyboardAvoidingContainer
    >
      <MainContainer>
        <TouchableOpacity className='bg-darkGrey p-4 rounded-full flex items-center justify-center w-16 h-16 mt-6' onPress={handleBack}>
          <Ionicons name={"arrow-back-outline"} color={colors.lightText}
            size={25} />
        </TouchableOpacity>

        <View className='mt-16 flex gap-3'>
          <Text className='text-white text-bold font-extrabold  font-poppinsBold text-5xl '>Hey,</Text>
          <Text className='text-white text-bold font-extrabold  font-poppinsBold text-5xl '>Welcome</Text>
          <Text className='text-white text-bold font-extrabold  font-poppinsBold text-5xl '>Back</Text>
        </View>

        <View className='relative mt-16 flex gap-8'>
          <CustomInput leftIcon={"mail-outline"} keyboardType="email-address" placeholder="Enter your Email" />
          <CustomInput
            leftIcon="lock-closed-outline"
            placeholder="Confirm Password"
            secureTextEntry={!secureTextEntry}
            rightIcon={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
            onRightIconPress={() => setSecureTextEntry(!secureTextEntry)}
          />

          <TouchableOpacity>
            <Text className='text-lightText font-poppinsBold font-bold text-lg text-right '>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity className='mt-4  rounded-full bg-blue1 
        '>
            <Text className='font-poppinsBold font-bold text-xl p-4  text-center text-black1'>LOG IN</Text>
          </TouchableOpacity>

          <Text className='text-center text-lightGrey text-lg font-poppins font-medium'>or continue with</Text>

          <TouchableOpacity className=' border border-blue1 rounded-full flex flex-row items-center justify-center'>
            <Image
              source={require('../assets/images/google_ic.png')}
              className="h-8 w-8"
            />
            <Text className='font-poppinsBold font-bold text-xl p-4  text-center text-white'>Google</Text>
          </TouchableOpacity>

          <View className='inline-flex flex-row justify-center items-center -mt-2'>
            <Text className="text-center text-lightGrey text-lg font-poppins font-medium justify-center items-center flex ">
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
              <Text className="font-poppinsBold font-bold text-lightText text-xl">Sign up</Text>
            </TouchableOpacity>
          </View>

        </View>
      </MainContainer>
    </KeyboardAvoidingContainer>
  )
}