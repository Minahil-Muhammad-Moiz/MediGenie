import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer'
import MainContainer from '../components/MainContainer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/constants';
import { useSelector } from 'react-redux';
import DefaultButton from '../components/DefaultButton';


const HomeScreen = () => {
    const imageURI = require('../assets/images/logoBlack.png')
    const profileImage = useSelector((state) => state.profile.profileImage);

    return (
        <>
            <View className='bg-black1 relative'>

                <View className='flex flex-row items-center justify-between w-full  p-6 rounded-b-3xl'>
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

                    <View className='p-10  mb-6 mx-auto font-poppinsRegular w-[90%] rounded-xl bg-blue1 overflow-hidden z-10 relative'>
                        <Text className='z-10 text-3xl font-poppinsBold font-extrabold'>MediGenie</Text>
                        <Text className='z-10 text italic max-w-[60%]'>Your Health, simplifiied with AI.</Text>
                        <Image source={imageURI} height={10} width={10} alt='dummy-profile' className=' w-24 h-24 absolute right-0 bottom-0  z-0' />
                    </View>

                    <View className='flex gap-4 items-center justify-start border bord'>

                        <View className=' h-52 border border-blue1 mx-auto p-5 rounded-2xl flex items-start justify-around'>
                            <View className='max-w-[90%] flex gap-2'>
                                <Text className='font-poppins text-white font-bold text-2xl'>Symptom Checker</Text>
                                <Text className='font-poppins text-white'>Upload an image or type your  symptoms to get an instant analysis.</Text>
                            </View>
                            <View className='self-end w-40 '>
                                <DefaultButton border fill thinPadding icon={'arrow-forward-circle'}>
                                    Try Now
                                </DefaultButton>
                            </View>
                        </View>

                        <View className=' h-52 border border-blue1 mx-auto p-5 rounded-2xl flex items-start justify-around'>
                            <View className='max-w-[90%] flex gap-2'>
                                <Text className='font-poppins text-white font-bold text-2xl'>Report Scanner</Text>
                                <Text className='font-poppins text-white'>Scan and organize your health records with ease.</Text>
                            </View>
                            <View className='self-end w-40 '>
                                <DefaultButton border fill thinPadding icon={'arrow-forward-circle'}>
                                    Try Now
                                </DefaultButton>
                            </View>
                        </View>

                        <View className=' h-52 border border-blue1 mx-auto p-5 rounded-2xl flex items-start justify-around'>
                            <View className='max-w-[90%] flex gap-2'>
                                <Text className='font-poppins text-white font-bold text-2xl'>PDF Analyzer</Text>
                                <Text className='font-poppins text-white'>Upload medical reports and get a summarized overview instantly.</Text>
                            </View>
                            <View className='self-end w-40 '>
                                <DefaultButton border fill thinPadding icon={'arrow-forward-circle'}>
                                    Try Now
                                </DefaultButton>
                            </View>
                        </View>
                    </View>

                </MainContainer>
            </KeyboardAvoidingContainer>
        </>
    )
}

export default HomeScreen