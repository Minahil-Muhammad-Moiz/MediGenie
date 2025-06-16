import { View, Text, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer';
import MainContainer from '../components/MainContainer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/constants';
import { useNavigation } from '@react-navigation/native';
import DefaultButton from '../components/DefaultButton';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ResetPassword = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const { handleChange, handleBlur, handleSubmit, values, touched, errors } = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Password Reset:', values);

      // Show modal
      setModalVisible(true);

      // Simulate reset process then redirect
      setTimeout(() => {
        setModalVisible(false);
        navigation.reset({
          index: 1,
          routes: [
            { name: 'GettingStarted' }, 
            { name: 'LoginScreen' }    
          ],
        });
      }, 1500);
    },
  });

  return (
    <KeyboardAvoidingContainer>
      <MainContainer>

        <TouchableOpacity
          className='bg-darkGrey p-2 rounded-full w-12 h-12 items-center justify-center'
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" color={colors.lightText} size={22} />
        </TouchableOpacity>

        <View className='mt-[4%] flex gap-2 justify-center items-start'>
          <Text className='text-white font-extrabold text-3xl'>Reset Password</Text>
          <Text className='text-white'>Your new password must be unique from those previously used.</Text>
        </View>

        <View className='my-6 flex'>
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
            <Text className='text-red-500 text-sm ml-2'>{errors.password}</Text>
          )}

          <CustomInput
            leftIcon='lock-closed-outline'
            placeholder='Confirm Password'
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values.confirmPassword}
            autoCapitalize="none"
            errorBorder={touched.confirmPassword && errors.confirmPassword}
            secureTextEntry={true}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <Text className='text-red-500 text-sm ml-2'>{errors.confirmPassword}</Text>
          )}
        </View>

        <DefaultButton fill border onPress={handleSubmit}>
          Reset Password
        </DefaultButton>

        {/* Modal for success message */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
        >
          <View className="flex-1 items-center justify-center bg-black/60">
            <View className="bg-darkGrey p-6 rounded-2xl items-center shadow-lg w-[70%]">
              <Ionicons name="checkmark-circle" size={64} color="#22c55e" />
              <Text className="text-white text-xl font-bold mt-4 text-center">Password Reset Successfully</Text>
            </View>
          </View>
        </Modal>

      </MainContainer>
    </KeyboardAvoidingContainer>
  );
};

export default ResetPassword;
