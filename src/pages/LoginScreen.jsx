import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Platform
} from 'react-native'
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
      if (
        values.email.toLowerCase() === 'test@example.com' &&
        values.password === '123456'
      ) {
        navigation.navigate('SignUpScreen');
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
        <TouchableOpacity
          className='bg-darkGrey p-2 rounded-full w-14 h-14 mt-[2%] items-center justify-center'
          onPress={handleBack}
        >
          <Ionicons name="arrow-back-outline" color={colors.lightText} size={25} />
        </TouchableOpacity>

        <View className='mt-[8%] flex gap-2'>
          <Text className='text-white font-extrabold text-5xl'>Hey,</Text>
          <Text className='text-white font-extrabold text-5xl'>Welcome</Text>
          <Text className='text-white font-extrabold text-5xl'>Back</Text>
        </View>

        <View className='mt-[4%] flex-1 justify-around'>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
              errors,
              touched,
            }) => (
              <>
                <View className='flex gap-2'>
                  <CustomInput
                    leftIcon="mail-outline"
                    keyboardType="email-address"
                    placeholder="Enter your Email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    autoCapitalize="none"
                    value={values.email}
                    errorBorder={touched.email && errors.email}
                  />
                  {touched.email && errors.email && (
                    <Text className="text-fail text-sm ml-2 ">{errors.email}</Text>
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
                    errorBorder={touched.password && errors.password}
                  />
                  {touched.password && errors.password && (
                    <Text className="text-fail text-sm ml-2  ">{errors.password}</Text>
                  )}

                  <TouchableOpacity className='self-end mt-1  my-4'>
                    <Text className='text-lightText font-bold text-base'>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                <View className=''>
                  <DefaultButton onPress={handleSubmit} title="Submit" fill>
                    {isSubmitting ? 'Logging in...' : 'LOG IN'}
                  </DefaultButton>

                  <Text className='text-center text-lightGrey text-base font-medium my-2'>or continue with</Text>

                  <TouchableOpacity className='flex flex-row items-center justify-center rounded-full border border-blue1 py-3'>
                    <Image
                      source={require('../assets/images/google_ic.png')}
                      className="h-6 w-6 mr-3"
                    />
                    <Text className='font-bold text-base text-white'>Google</Text>
                  </TouchableOpacity>

                  <View className='flex flex-row justify-center items-center mt-2'>
                    <Text className="text-lightGrey text-base font-medium">
                      Don't have an account?{' '}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                      <Text className="font-bold text-lightText text-base">Sign up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </Formik>
        </View>
      </MainContainer >
    </KeyboardAvoidingContainer >
  )
}
