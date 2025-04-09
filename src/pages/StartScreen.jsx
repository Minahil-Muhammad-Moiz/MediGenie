import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button } from '@react-navigation/elements'
import { useNavigation } from '@react-navigation/native'

export default function StartScreen() {
    const imageURI = require('../assets/images/logo.png')
    const navigation = useNavigation();

    const handleLogin = ()=>{
        navigation.navigate('LoginScreen')
    };

    const handleSignUp = ()=>{
        navigation.navigate('SignUpScreen')
    };

    return (
        // <ImageBackground source={imageURI} className='flex-1 items-center justify-end'>
        <View className='flex-1 items-center justify-center h-full w-full bg-primary relative'>

            <View className='flex items-center px-12 pb-12 -pt-10 gap-4'>
                <Image source={imageURI} height={10} width={10} alt='logo' className='h-44 w-44' />
                <Text className='text-white text-5xl font-extrabold font-poppinsBold'>MediGenie</Text>
                <Text className='text-center text-light text-xl font-poppins'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, facilis!</Text>
            </View>

            <View className='mx-10 mb-20 flex flex-row w-[80%] items-center absolute bottom-0 justify-center bg-tertiary rounded-[3rem] overflow-hidden border-secondary border'>

                <TouchableOpacity className='rounded-[3rem] p-4 text-center border-secondary border bg-secondary w-[50%]' onPress={handleLogin}>
                    <Text className='text-black text-center font-bold text-xl font-poppinsRegular'>LOG IN</Text>
                </TouchableOpacity >

                <TouchableOpacity className='w-[50%] rounded-3xl bg-tertiary p-4' onPress={handleSignUp}>
                    <Text className='text-white text-center font-bold text-xl font-poppinsRegular'>SIGN UP</Text>
                </TouchableOpacity>


            </View>
        </View>
        // </ImageBackground>
    )
}

const styles = StyleSheet.create({})