import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/constants';
import MainContainer from '../components/MainContainer';
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer';
import CustomInput from '../components/CustomInput';
import DefaultButton from '../components/DefaultButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../redux/slices/authSlice';

// ✅ Validation schema
const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username too short')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

export default function SignUpScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSignUp = (values) => {
    try {
      // 🚀 Call your sign-up API or logic here
      dispatch(register({ user: values }));

      // Option 1: move to MainScreen immediately
      // navigation.reset({ index: 0, routes: [{ name: 'MainScreen' }] });

      // Option 2: move to LoginScreen (ask user to login)
      // navigation.navigate('EmailVerification', { from: 'SignUpScreen' });
      navigation.navigate('EmailVerification', { from: 'SignUpScreen' });
      // navigation.navigate('EmailVerification', { from: 'signup' });
    } catch (error) {
      Alert.alert('Sign up failed', 'Something went wrong. Try again.');
    }
  };

  return (
    <KeyboardAvoidingContainer>
      <MainContainer>
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

        <View className='mt-[2%] flex gap-2'>
          <Text className='text-white font-extrabold font-poppinsBold text-3xl'>Let's, Get Started</Text>
          {/* <Text className='text-white font-extrabold font-poppinsBold text-4xl'></Text> */}
        </View>

        <View className='flex-1 justify-around'>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={SignUpSchema}
            onSubmit={(values) => handleSignUp(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
              isSubmitting,
            }) => (
              <>
                <View>
                  <CustomInput
                    leftIcon={'person-outline'}
                    placeholder='Username'
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    errorBorder={touched.username && errors.username}
                  />
                  {touched.username && errors.username && (
                    <Text className='text-red-500 text-sm ml-2 '>
                      {errors.username}
                    </Text>
                  )}

                  <CustomInput
                    leftIcon={'mail-outline'}
                    placeholder='Email'
                    keyboardType='email-address'
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    autoCapitalize="none"
                    errorBorder={touched.email && errors.email}
                  />
                  {touched.email && errors.email && (
                    <Text className='text-red-500 text-sm ml-2 '>
                      {errors.email}
                    </Text>
                  )}

                  <CustomInput
                    leftIcon='lock-closed-outline'
                    placeholder='Enter Password'
                    secureTextEntry={!showPassword}
                    rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    onRightIconPress={() => setShowPassword(!showPassword)}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    autoCapitalize="none"
                    errorBorder={touched.password && errors.password}
                  />
                  {touched.password && errors.password && (
                    <Text className='text-red-500 text-sm ml-2 '>
                      {errors.password}
                    </Text>
                  )}

                  <CustomInput
                    leftIcon='lock-closed-outline'
                    placeholder='Confirm Password'
                    secureTextEntry={true}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    autoCapitalize="none"
                    errorBorder={touched.confirmPassword && errors.confirmPassword}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text className='text-red-500 text-sm ml-2 '>
                      {errors.confirmPassword}
                    </Text>
                  )}

                  {/* Terms and Conditions */}
                  <View className=' inline-flex flex-wrap flex-row justify-start items-center my-3'>
                    <Text className='text-lightGrey  font-poppins font-medium'>
                      By continuing, you agree to MediGenie's{' '}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('TermsConditions')}>
                      <Text className='font-poppinsBold font-bold text-lightText  text-left'>
                        Terms and Conditions
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  {/* Submit Button */}
                  <DefaultButton
                    fill
                    onPress={handleSubmit}
                    title='Submit'
                  >
                    SIGN IN
                  </DefaultButton>

                  <Text className='text-center text-lightGrey  font-poppins font-medium my-2'>
                    or continue with
                  </Text>

                  {/* Google Signup */}
                  <TouchableOpacity className='border border-blue1 rounded-full flex flex-row items-center justify-center py-2'>
                    <Image
                      source={require('../assets/images/google_ic.png')}
                      className='h-5 w-5 mr-2'
                    />
                    <Text className='font-poppinsBold font-bold text-center text-white text-base'>
                      Google
                    </Text>
                  </TouchableOpacity>

                  <View className='inline-flex flex-row justify-center items-center mt-2'>
                    <Text className='text-lightGrey  font-poppins font-medium'>
                      Already have an account?{' '}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                      <Text className='font-poppinsBold font-bold text-lightText '>
                        Log in
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </Formik>
        </View>
      </MainContainer>
    </KeyboardAvoidingContainer>
  );
}
