import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer'
import MainContainer from '../components/MainContainer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/constants';
import { useNavigation } from '@react-navigation/native';


const SettingsScreen = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingContainer>
      <MainContainer>
        {/* Header */}
        <View className=' flex-row  gap-2 justify-center items-center'>
          <Text className='text-lightText font-extrabold text-4xl'>Settings</Text>
        </View>

        <View className='border border-lightGrey p-4 rounded-2xl my-4 w-full flex relative items-start '>
          <TouchableOpacity className='flex-row gap-2 items-center justify-start p-2 border border-b-zinc-700 mb-2 px-2 w-full' onPress={() => navigation.navigate('AboutUs')}>
            <Ionicons
              name={'information-circle-outline'}
              color={'#ffffff'}
              size={25}
            />
            <Text className='text-white'>About Us</Text>
          </TouchableOpacity>

          <TouchableOpacity className='flex-row gap-2 items-center justify-center p-2' onPress={() => navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] })}>
            <Ionicons
              name={'log-out-outline'}
              color={colors.fail}
              size={25}
            />
            <Text className='text-white'>Log Out</Text>
          </TouchableOpacity>
        </View>
      </MainContainer>
    </KeyboardAvoidingContainer>
  )
}

export default SettingsScreen