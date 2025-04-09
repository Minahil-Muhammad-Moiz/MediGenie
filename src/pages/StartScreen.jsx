import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button } from '@react-navigation/elements'

export default function StartScreen() {
    const imageURI = require('../assets/logo.png')
    return (
        // <ImageBackground source={imageURI} className='flex-1 items-center justify-end'>
        <View className='flex-1 items-center justify-center h-full w-full bg-zinc-950 relative border border-white'>

            <View className='flex items-center px-12 pb-12 -pt-10 gap-4'>
                <Image source={imageURI} height={10} width={10} alt='logo' className='h-52 w-52'/>
                <Text className='text-white text-5xl font-extrabold'>MediGenie</Text>
                <Text className='text-center text-white text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, facilis!</Text>
            </View>

            <View className='px-10 py-20 flex gap-5 w-full items-center absolute bottom-0 justify-center'>

                <TouchableOpacity className='w-full rounded-2xl bg-neutral-900 p-4 '>
                    <Text className='text-white text-center font-bold text-lg'>Sing Up</Text>
                </TouchableOpacity>

                <TouchableOpacity className='rounded-2xl p-4 text-center bg-cyan-400 w-full'>
                    <Text className='text-black text-center font-bold text-lg'>LOG IN</Text>
                </TouchableOpacity >

            </View>
        </View>
        // </ImageBackground>
    )
}

const styles = StyleSheet.create({})