import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
// import goglicon from '../assets/images/'

export default function LoginScreen() {
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const navigate = useNavigation()

  const handleBack = ()=>{
    navigate.goBack()
  }

  return (
    <View className='bg-black1 flex-1 p-12'>
      <TouchableOpacity className='bg-grey1 p-4 rounded-full flex items-center justify-center w-16 h-16 mt-8' onPress={handleBack}>
        <Ionicons name={"arrow-back-outline"} color={'#ffffff'}
          size={25} />
      </TouchableOpacity>

      <View className='mt-16 flex gap-3'>
        <Text className='text-white text-bold font-extrabold  font-poppinsBold text-5xl '>Hey,</Text>
        <Text className='text-white text-bold font-extrabold  font-poppinsBold text-5xl '>Welcome</Text>
        <Text className='text-white text-bold font-extrabold  font-poppinsBold text-5xl '>Back</Text>
      </View>

      <View className='relative mt-16 flex gap-8'>
        <View className='relative justify-center '>
          <Ionicons
            name="mail-outline"
            size={25}
            color="grey"
            style={{
              position: 'absolute',
              left: 20,
              zIndex: 1,
            }}
          />
          <TextInput
            className="border-blue1 border rounded-full pl-16 py-4 text-white text-lg"
            placeholder="Enter your Email"
            placeholderTextColor="grey"
            keyboardType="email-address"
            keyboardAppearance="default"
          />
        </View>

        <View className='relative justify-center -mb-4'>
          <Ionicons
            name={"lock-closed-outline"}
            size={25}
            color={"grey"}
            style={{
              position: 'absolute',
              left: 20,
              zIndex: 1,
            }} />
          <TextInput className='border-blue1 border rounded-full pl-20 py-4 text-white text-lg z-10'
            placeholder='Enter your Password'
            placeholderTextColor={'grey'}
            secureTextEntry={secureTextEntry}
            keyboardAppearance='default' />
          <Ionicons
            name={"eye-outline"}
            size={25}
            color={"grey"}
            style={{
              position: 'absolute',
              right: 20,
            }}
            className={"z-20 backdrop-blur-md bg-black1  rounded-full  shadow-white shadow-2xl "} 
            onPress={()=>setSecureTextEntry(prv => !prv)}/>
        </View>

        <TouchableOpacity>
          <Text className='text-lightText font-poppinsBold font-bold text-lg text-right '>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity className='mt-4  rounded-full bg-blue1 
        '>
          <Text className='font-poppinsBold font-bold text-xl p-4  text-center text-black1'>LOG IN</Text>
        </TouchableOpacity>

        <Text className='text-center text-lightText text-lg font-poppins font-medium'>or conntinue with</Text>

        <TouchableOpacity className=' border border-blue1 rounded-full flex flex-row items-center justify-center'>
          <Image
            source={require('../assets/images/google_ic.png')}
            className="h-8 w-8"
          />
          <Text className='font-poppinsBold font-bold text-xl p-4  text-center text-white'>Google</Text>
        </TouchableOpacity>

        <View className='inline-flex flex-row justify-center items-center -mt-2'>
          <Text className="text-center text-lightText text-lg font-poppins font-medium justify-center items-center flex ">
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity>
            <Text className="font-poppinsBold font-bold text-lightText text-xl">Sign up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}