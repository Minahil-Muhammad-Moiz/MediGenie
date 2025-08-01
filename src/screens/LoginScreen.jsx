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
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../utils/constants';
import MainContainer from '../components/MainContainer';
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer';
import CustomInput from '../components/CustomInput';
import { Formik } from 'formik';
import DefaultButton from '../components/DefaultButton';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import StartScreen from './StartScreen';

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
  const dispatch = useDispatch()

  const handleLogin = (values) => {
    try {
      if (
        values.email.toLowerCase() === 'test@example.com' &&
        values.password === '123456'
      ) {
        dispatch(login({ user: values.email, token: 'fake-token', loginMethod: 'email' }));
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainScreen' }],
        });
      } else {
        alert('Invalid email or password');
      }
    }
    catch (error) {
      console.log('Login error:', error);
    }
  }

  const route = useRoute(); // <-- Get route params
  const routeName = route?.from;
  console.log(routeName)
  const handleBack = () => {
    if (routeName === 'HomeScreen' || routeName === 'SettingsScreen') {
      navigation.navigate('GettingStarted', { from: 'LoginScreen' })
    } else {
      navigation.goBack();
    }
  }

  return (
    <KeyboardAvoidingContainer
    >
      <MainContainer>
        <TouchableOpacity
          className='bg-darkGrey p-2 rounded-full w-12 h-12 items-center justify-center'
          onPress={handleBack}
        >
          <Ionicons name="arrow-back-outline" color={colors.lightText} size={22} />
        </TouchableOpacity>

        <View className='mt-[4%] flex gap-2'>
          <Text className='text-white font-extrabold text-3xl'>Hey,</Text>
          <Text className='text-white font-extrabold text-3xl'>Welcome back!</Text>
          {/* <Text className='text-white font-extrabold text-5xl'>Back</Text> */}
        </View>

        <View className='mt-[2%] flex-1 justify-around'>
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
                <View className='flex gap-1'>
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
                    <Text className="text-fail text-sm ml-2 ">{errors.password}</Text>
                  )}

                  <TouchableOpacity className='self-end mt-1 my-4' onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text className='text-lightText font-bold text-base'>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                <View className=''>
                  <DefaultButton onPress={handleSubmit} title="Submit" fill>
                    LOG IN
                  </DefaultButton>

                  <Text className='text-center text-lightGrey text-base font-medium my-2'>or continue with</Text>

                  <TouchableOpacity className='flex flex-row items-center justify-center rounded-full border border-blue1 py-2'>
                    <Image
                      source={require('../assets/images/google_ic.png')}
                      className="h-5 w-5 mr-2"
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
