import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/colors';
import MainContainer from '../components/MainContainer';
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer';
import CustomInput from '../components/CustomInput';
import { Formik } from 'formik';
import DefaultButton from '../components/DefaultButton';
import * as Yup from 'yup';
import StartScreen from './StartScreen';
import SignUpScreen from './SignUpScreen';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});


export default function LoginScreen() {
  const [secureTextEntry, setSecureTextEntry] = useState(false)
  const navigation = useNavigation()

  const handleBack = () => {
    navigation.goBack()
  }

  const handleLogin = (values) => {
    try {
      // Call your login API or auth logic here
      // move to next page
      // test api
      if (
        values.email.toLowerCase() === 'test@example.com' &&
        values.password === '123456'
      ) {
        navigation.navigate(SignUpScreen);
      } else {
        alert('Invalid email or password');
      }
    }
    catch (error) {
      console.log('Login error:', error);
    }
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
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={(values) =>
              handleLogin(values)
            }>
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, errors, touched, }) =>
              <>
                <CustomInput leftIcon={"mail-outline"}
                  keyboardType="email-address"
                  placeholder="Enter your Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  autoCapitalize="none"
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text className="text-fail text-sm ml-2 -my-6 ">{errors.email}</Text>
                )}

                <CustomInput
                  leftIcon="lock-closed-outline"
                  placeholder="Enter your Password"
                  autoCapitalize="none"
                  secureTextEntry={!secureTextEntry}
                  rightIcon={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                  onRightIconPress={() => setSecureTextEntry(!secureTextEntry)}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />

                {touched.password && errors.password && (
                  <Text className="text-fail text-sm ml-2 -my-6 ">{errors.password}</Text>
                )}

                <TouchableOpacity>
                  <Text className='text-lightText font-poppinsBold font-bold text-lg text-right border -mt-4'>Forgot Password?</Text>
                </TouchableOpacity>

                {/* login button  */}
                <DefaultButton onPress={handleSubmit} title="Submit" fill>LOG IN</DefaultButton>

                <Text className='text-center text-lightGrey text-lg font-poppins font-medium'>or continue with</Text>

                <TouchableOpacity className=' flex flex-row items-center justify-center rounded-full border border-blue1 '>
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
              </>}
          </Formik>
        </View>
      </MainContainer>
    </KeyboardAvoidingContainer>
  )
}