import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function LoginScreen() {
  return (
    <View className='bg-black1 flex-1 p-12 '>
      <TouchableOpacity className='bg-grey1 p-4 rounded-full flex items-center justify-center w-16 h-16'>
        <Ionicons name={"arrow-back-outline"} color={'#ffffff'}
        size={25}/>
      </TouchableOpacity>

      <View>
        <Text className='text-white text-bold font-poppinsBold text-3xl '>Hey,</Text>
        <Text className='text-white text-bold font-poppinsBold text-3xl '>Welcome</Text>
        <Text className='text-white text-bold font-poppinsBold text-3xl '>Back</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})