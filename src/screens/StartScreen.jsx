import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button } from '@react-navigation/elements'
import { useNavigation } from '@react-navigation/native'
import MainContainer from '../components/MainContainer'

export default function StartScreen() {
    const imageURI = require('../assets/images/logo.png')
    const navigation = useNavigation();

    const handleLogin = () => {
        navigation.navigate('LoginScreen')
    };

    const handleSignUp = () => {
        navigation.navigate('SignUpScreen')
    };

    return (
        // <ImageBackground source={imageURI} className='flex-1 items-center justify-end'>
        <MainContainer>
            <View className=' flex items-center justify-center h-full w-full relative'>
                {/* logo header */}
                <View className='flex items-center'>
                    <Image source={imageURI} height={10} width={10} alt='logo' className='h-44 w-44' />
                    <Text className='text-white text-5xl font-extrabold font-poppinsBold'>MediGenie</Text>
                    <Text className='text-center text-lightGrey text-xl font-poppins'>Where AI Meets Personalized Healthcare</Text>
                </View>

                {/* login/signup buttons */}
                <View className=' flex flex-row w-[90%] items-center absolute bottom-[5%] justify-center bg-darkGrey rounded-[3rem] overflow-hidden border-blue1 border'>

                    <TouchableOpacity className='rounded-[3rem] p-3 text-center border-blue1 border bg-blue1 w-[50%]' onPress={handleLogin}>
                        <Text className='text-black text-center font-bold text-lg font-poppinsRegular'>LOG IN</Text>
                    </TouchableOpacity >

                    <TouchableOpacity className='w-[50%] rounded-3xl bg-darkGrey p-3' onPress={handleSignUp}>
                        <Text className='text-white text-center font-bold text-lg font-poppinsRegular'>SIGN UP</Text>
                    </TouchableOpacity>


                </View>
            </View>
        </MainContainer>
        // </ImageBackground>
    )
}

const styles = StyleSheet.create({})