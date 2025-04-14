import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/colors';

export default function SignUpScreen() {
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const navigation = useNavigation()

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <View className='bg-black1 flex-1 p-12'>
      {/* back button */}
      <TouchableOpacity className='bg-darkGrey p-4 rounded-full flex items-center justify-center w-16 h-16 mt-6' onPress={handleBack}>
        <Ionicons name={"arrow-back-outline"} color={colors.lightText}
          size={25} />
      </TouchableOpacity>

      <View className='mt-8 flex gap-3'>
        <Text className='text-white text-bold font-extrabold  font-poppinsBold text-5xl '>Lets,</Text>
        <Text className='text-white text-bold font-extrabold  font-poppinsBold text-5xl '>Get Started</Text>
      </View>

      <View className='relative mt-10 flex gap-7'>
        {/* username and email */}
        <View className='relative justify-center '>
          <Ionicons
            name="person-outline"
            size={25}
            color={colors.lightGrey}
            style={{
              position: 'absolute',
              left: 20,
              zIndex: 1,
            }}
          />
          <TextInput
            className="border-blue1 border rounded-full pl-20 py-4 text-white text-lg"
            placeholder="Username"
            placeholderTextColor={colors.lightGrey}
            keyboardType="default"
            keyboardAppearance="default"
          />
        </View>
        <View className='relative justify-center '>
          <Ionicons
            name="mail-outline"
            size={25}
            color={colors.lightGrey}
            style={{
              position: 'absolute',
              left: 20,
              zIndex: 1,
            }}
          />
          <TextInput
            className="border-blue1 border rounded-full pl-20 py-4 text-white text-lg"
            placeholder="Email"
            placeholderTextColor={colors.lightGrey}
            keyboardType="email-address"
            keyboardAppearance="default"
          />
        </View>

        {/* password inputs */}
        <View className='relative justify-center '>
          <Ionicons
            name={"lock-closed-outline"}
            size={25}
            color={colors.lightGrey}
            style={{
              position: 'absolute',
              left: 20,
              zIndex: 1,
            }} />
          <TextInput className='border-blue1 border rounded-full pl-20 py-4 text-white text-lg z-10'
            placeholder='Enter Password'
            placeholderTextColor={colors.lightGrey}
            secureTextEntry={secureTextEntry}
            keyboardAppearance='default' />
          <Ionicons
            name={"eye-outline"}
            size={25}
            color={colors.lightGrey}
            style={{
              position: 'absolute',
              right: 20,
            }}
            className={"z-20 backdrop-blur-md bg-black1  rounded-full  shadow-white shadow-2xl "}
            onPress={() => setSecureTextEntry(prv => !prv)} />
        </View>
        <View className='relative justify-center '>
          <Ionicons
            name={"lock-closed-outline"}
            size={25}
            color={colors.lightGrey}
            style={{
              position: 'absolute',
              left: 20,
              zIndex: 1,
            }} />
          <TextInput className='border-blue1 border rounded-full pl-20 py-4 text-white text-lg z-10'
            placeholder='Confirm Password'
            placeholderTextColor={colors.lightGrey}
            secureTextEntry={secureTextEntry}
            keyboardAppearance='default' />
          <Ionicons
            name={"eye-outline"}
            size={25}
            color={colors.lightGrey}
            style={{
              position: 'absolute',
              right: 20,
            }}
            className={"z-20 backdrop-blur-md bg-black1  rounded-full  shadow-white shadow-2xl "}
            onPress={() => setSecureTextEntry(prv => !prv)} />
        </View>

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
    </View>
  )
}