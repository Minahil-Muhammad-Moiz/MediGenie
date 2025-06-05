import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer'
import MainContainer from '../components/MainContainer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/constants';
import { useSelector } from 'react-redux';


const HomeScreen = () => {
    const imageURI = require('../assets/images/logoBlack.png')
    const profileImage = useSelector((state) => state.profile.profileImage);

    return (
        <>
            <View className='bg-black1 relative'>

                <View className='flex flex-row items-center justify-between w-full  p-7 rounded-b-3xl'>
                    <View className='flex flex-row items-center justify-center gap-4 '>
                        <Image source={profileImage} height={10} width={10} alt='dummy-profile' className=' w-16 h-16 rounded-full ' />
                        <View className='flex justify-center'>
                            <Text className={`font-poppins text-lightText text`}>Welcome</Text>
                            <Text className={`text-white font-poppins font-bold text-3xl`}>Antonio 👋</Text>

                        </View>

                    </View>

                    <TouchableOpacity
                        className=' p-2 rounded-full flex items-center justify-center w-14 h-14 '
                    // onPress={() => navigation.goBack()}
                    >
                        <Ionicons
                            name={'ellipsis-vertical'}
                            color={colors.blue1}
                            size={25}
                        />
                    </TouchableOpacity>


                </View>

                {/* absolute top-[100%] -translate-y-[30%] -translate-x-[50%] left-[50%]  */}
            </View>

            <KeyboardAvoidingContainer>
                <MainContainer>
                    <View className=' mx-auto font-poppinsRegular max-w-[90%] rounded-xl bg-blue1 overflow-hidden z-10 relative pr-20'>
                        <Text className='z-10 text-3xl font-poppinsBold '>MediGenie</Text>
                        <Text className='z-10 text italic'>Your all-in-one companion to manage and understand your health better. </Text>
                        <Image source={imageURI} height={10} width={10} alt='dummy-profile' className=' w-28 h-28 absolute right-0 bottom-0 z-0' />

                    </View>
                </MainContainer>
            </KeyboardAvoidingContainer>
        </>
    )
}

export default HomeScreen