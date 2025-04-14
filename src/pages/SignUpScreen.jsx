import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/colors';
import MainContainer from '../components/MainContainer';
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer';
import CustomInput from '../components/CustomInput';

export default function SignUpScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigation = useNavigation()

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <KeyboardAvoidingContainer>
      <MainContainer>
        {/* back button */}
        <TouchableOpacity className='bg-darkGrey p-4 rounded-full flex items-center justify-center w-16 h-16 mt-6' onPress={handleBack}>
          <Ionicons name={"arrow-back-outline"} color={colors.lightText}
            size={25} />
        </TouchableOpacity>

        <View className='mt-8 flex gap-3'>
          <Text className='text-white text-bold font-extrabold  font-poppinsBold text-5xl '>Lets,</Text>
          <Text className='text-white text-bold font-extrabold  font-poppinsBold text-5xl '>Get Started</Text>
        </View>

        <View className='relative mt-10 flex gap-6'>
          {/* username and email */}
          <CustomInput leftIcon={"person-outline"} placeholder="Username" />
          <CustomInput leftIcon={"mail-outline"} placeholder="Email" keyboardType="email-address" />

          {/* password inputs */}
          <CustomInput
            leftIcon="lock-closed-outline"
            placeholder="Enter Password"
            secureTextEntry={!showPassword}
            rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
            onRightIconPress={() => setShowPassword(!showPassword)}
          />

          <CustomInput
            leftIcon="lock-closed-outline"
            placeholder="Confirm Password"
            secureTextEntry={!showConfirmPassword}
            rightIcon={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
            onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          {/* terms and conditions */}
          <View className='-mb-4 inline-flex flex-wrap flex-row justify-start items-center'>
            <Text className="text-center text-lightGrey text-lg font-poppins font-medium justify-center items-center flex ">
              By continuing, you agree to MediGenie's{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Text className="font-poppinsBold font-bold text-lightText text-lg text-left">Terms and Conditions</Text>
            </TouchableOpacity>
          </View>

          {/* signup button */}
          <TouchableOpacity className='rounded-full bg-blue1 
        '>
            <Text className='font-poppinsBold font-bold text-xl p-4  text-center text-black1'>SIGN UP</Text>
          </TouchableOpacity>

          <Text className='text-center text-lightGrey text-lg font-poppins font-medium'>or continue with</Text>

          {/* Google button */}
          <TouchableOpacity className=' border border-blue1 rounded-full flex flex-row items-center justify-center'>
            <Image
              source={require('../assets/images/google_ic.png')}
              className="h-8 w-8"
            />
            <Text className='font-poppinsBold font-bold text-xl p-4  text-center text-white'>Google</Text>
          </TouchableOpacity>

          <View className='inline-flex flex-row justify-center items-center -mt-2'>
            <Text className="text-center text-lightGrey text-lg font-poppins font-medium justify-center items-center flex ">
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Text className="font-poppinsBold font-bold text-lightText text-xl">Log in </Text>
            </TouchableOpacity>
          </View>

        </View>
      </MainContainer>
    </KeyboardAvoidingContainer>
  )
}