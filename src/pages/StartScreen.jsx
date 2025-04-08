import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button } from '@react-navigation/elements'

export default function StartScreen() {
    const imageURI = require('../assets/plusSign.jpg')
    return (
        // <ImageBackground source={imageURI} className='flex-1 items-center justify-end'>
            <View className='flex-1 items-center justify-center h-full w-full bg-slate-950 relative border border-white'>
                
                <View className='flex items-center p-12 gap-4'>
                    <Text className='text-black text-5xl font-extrabold'>MediGenie</Text>
                    <Text className='text-center text-black'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, facilis!</Text>
                </View>

                <View className='px-10 py-20 flex gap-5 w-full bg-black rounded-t-[43px] items-center absolute bottom-0 justify-center'>

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