import { View, Text } from 'react-native'
import React from 'react'
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer'
import MainContainer from '../components/MainContainer'

const HomeScreen = () => {
    return (
        <KeyboardAvoidingContainer>
            <MainContainer>
                <View className='mt-[8%] flex gap-2 justify-center items-start'>
                    <Text className='text-white font-extrabold text-4xl'>Welcome to Home!!</Text>
                </View>
            </MainContainer>
        </KeyboardAvoidingContainer>
    )
}

export default HomeScreen