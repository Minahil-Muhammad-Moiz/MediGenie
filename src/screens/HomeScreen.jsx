import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer'
import MainContainer from '../components/MainContainer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/constants';
import { useSelector } from 'react-redux';


const HomeScreen = () => {
    const profileImage = useSelector((state) => state.profile.profileImage);

    return (
        <>
            <View className='bg-black1 relative'>

                <View className='flex flex-row items-center justify-between w-full bg-blue1 p-7 pb-20 rounded-b-3xl'>
                    <View className='flex flex-row items-center justify-center gap-4 '>
                        <Image source={profileImage} height={10} width={10} alt='dummy-profile' className=' w-16 h-16 rounded-full ' />
                        <View className='flex justify-center'>
                            <Text className={`text-zinc-700 text`}>Welcome</Text>
                            <Text className={`text-black font-bold text-3xl`}>Antonio 👋</Text>

                        </View>

                    </View>

                    <TouchableOpacity
                        className=' p-2 rounded-full flex items-center justify-center w-14 h-14 '
                    // onPress={() => navigation.goBack()}
                    >
                        <Ionicons
                            name={'ellipsis-vertical'}
                            color={colors.black1}
                            size={25}
                        />
                    </TouchableOpacity>


                </View>

                <View className='max-w-[90%] p-2 bg-white absolute top-[100%] -translate-y-[30%] -translate-x-[50%] left-[50%] z-10'>
                    <Text>Your all-in-one companion to manage and understand your health better. Get started by checking your symptoms, scanning reports, or uploading PDFs.</Text>
                </View>
            </View>

            <KeyboardAvoidingContainer>
                <MainContainer>
                </MainContainer>
            </KeyboardAvoidingContainer>
        </>
    )
}

export default HomeScreen