import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function LoginScreen() {
  return (
    <View className='bg-black1 flex-1 p-12 '>
      <TouchableOpacity className='bg-grey1 p-4 rounded-full flex items-center justify-center w-16 h-16'>
        <Ionicons name={"arrow-back-outline"} color={'#ffffff'}
          size={25} />
      </TouchableOpacity>

      <View className='mt-24 flex gap-3'>
        <Text className='text-white text-bold font-extrabold  font-poppinsBold text-5xl '>Hey,</Text>
        <Text className='text-white text-bold font-extrabold  font-poppinsBold text-5xl '>Welcome</Text>
        <Text className='text-white text-bold font-extrabold  font-poppinsBold text-5xl '>Back</Text>
      </View>

      <View className='relative flex gap-8 mt-16'>
        <View className='relative'>
          <Ionicons name={"mail-outline"} size={25} color={"grey"} className={"absolute top-[50%] translate-y-[-50%] left-10"} />
          <TextInput className='border-blue1 border rounded-full pl-20 py-4 text-white text-lg' 
          placeholder='Enter your Email'
          placeholderTextColor={'grey'}
          keyboardType='email-address'/>
        </View>
        
        <View className='relative'>
          <Ionicons name={"lock-closed-outline"} size={25} color={"grey"} className={"absolute top-[50%] translate-y-[-50%] left-10"} />
          <TextInput className='border-blue1 border rounded-full pl-20 py-4 text-white text-lg z-10' 
          placeholder='Enter your Password'
          placeholderTextColor={'grey'}
          secureTextEntry={true}/>
          <Ionicons name={"eye-outline"} size={25} color={"grey"} className={"absolute top-[50%] translate-y-[-50%] right-1 pr-10 z-20 backdrop-blur-md bg-black1  rounded-full  shadow-white shadow-2xl "} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})