import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer'
import MainContainer from '../components/MainContainer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../utils/constants';
import { useSelector } from 'react-redux';
import DefaultButton from '../components/DefaultButton';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const imageURI = require('../assets/images/logoBlack.png')
    const profileImage = useSelector((state) => state.profile.profileImage);
    const [modal, setModal] = useState(false)
    const navigation = useNavigation();

    return (
        <>
            <View className='bg-black1 z-20 '>

                <View className='flex flex-row items-center justify-between w-full  p-4'>
                    <View className='flex flex-row items-center justify-center gap-4 '>
                        <Image source={profileImage} height={10} width={10} alt='dummy-profile' className=' w-14 h-14 rounded-full ' />
                        <View className='flex justify-center'>
                            <Text className={`font-poppins text-lightText text-sm`}>Welcome</Text>
                            <Text className={`text-white font-poppins font-bold text-2xl`}>Antonio 👋</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        className=' p-2 rounded-full flex items-center justify-center w-12 h-12 '
                        onPress={() => setModal((prv) => !prv)}

                    >
                        <Ionicons
                            name={'ellipsis-vertical'}
                            color={'#ffffff'}
                            size={22}
                        />
                    </TouchableOpacity>

                </View>

                {modal ? <View className='bg-[#171717] p-2 absolute right-10 top-24 rounded-xl flex '>

                    <TouchableOpacity className='flex-row gap-2 items-center justify-center p-2' onPress={() => navigation.navigate('AboutUs')}>
                        <Ionicons
                            name={'information-circle-outline'}
                            color={'#ffffff'}
                            size={25}
                        />
                        <Text className='text-white '>About Us</Text>
                    </TouchableOpacity>

                    <View className='border border-zinc-700 bg-zinc-700 rounded-full'></View>

                    <TouchableOpacity className='flex-row gap-2 items-center justify-center p-2' onPress={() => navigation.reset({ index: 0, routes: [{ name: 'LoginScreen', from : 'HomeScreen' }] })}>
                        <Ionicons
                            name={'log-out-outline'}
                            color={colors.fail}
                            size={25}
                        />
                        <Text className='text-white'>Log Out</Text>
                    </TouchableOpacity>
                </View> : null}
            </View>

            <KeyboardAvoidingContainer>
                <MainContainer>

                    <View className='p-4 -mt-2 mb-4 mx-auto font-poppinsRegular w-[90%] rounded-xl bg-blue1 shadow-lg shadow-blue1 overflow-hidden z-10 relative flex-row items-center justify-between'>
                        <View className='max-w-[65%]'>
                            <Text className='z-10 text-2xl font-poppinsBold font-extrabold'>MediGenie</Text>
                            <Text className='z-10 text italic text-sm'>Your Health, simplifiied with AI.</Text>
                        </View>
                        <View className=''>
                            <Image source={imageURI} height={10} width={10} alt='dummy-profile' className='w-16 h-16  z-0' />
                        </View>
                    </View>

                    <View className='flex gap-2 items-center justify-start'>

                        <View className='max-w-[90%] h-52 p-6  mx-auto rounded-xl flex items-start justify-around border border-blue1'>
                            <View className=' relative flex gap-2'>
                                <Text className='font-poppins text-white font-bold text-2xl'>Symptom Checker</Text>
                                <Text className='font-poppins text-white pr-32 text-sm'>Upload an image or type your  symptoms to get an instant analysis.</Text>
                                <MaterialIcons
                                    name={'health-and-safety'}
                                    color={colors?.blue1}
                                    size={50}
                                    className='absolute right-0 top-0'
                                />
                            </View>
                            <View className='self-end w-40 '>
                                <DefaultButton border textWhite thinPadding icon={'arrow-forward'} onPress={() => navigation.navigate('SymptomCheckerScreen')}>
                                    Try Now
                                </DefaultButton>
                            </View>
                        </View>

                        <View className='max-w-[90%] h-52 p-6 border border-blue1 mx-auto  rounded-xl flex items-start justify-around'>
                            <View className=' relative flex gap-2'>
                                <Text className='font-poppins text-white font-bold text-2xl'>Report Scanner</Text>
                                <Text className='font-poppins text-white pr-32 text-sm'>Scan and organize your health records with ease.</Text>
                                <MaterialIcons
                                    name={'document-scanner'}
                                    color={colors?.blue1}
                                    size={50}
                                    className='absolute right-0 top-0'
                                />
                            </View>
                            <View className='self-end w-40 '>
                                <DefaultButton border textWhite thinPadding icon={'arrow-forward'} onPress={() => navigation.navigate('ReportScan')}>
                                    Try Now
                                </DefaultButton>
                            </View>
                        </View>

                        <View className='max-w-[90%] h-52 p-6 border border-blue1 mx-auto  rounded-xl flex items-start justify-around'>
                            <View className=' relative flex gap-2'>
                                <Text className='font-poppins text-white font-bold text-2xl'>PDF Analyzer</Text>
                                <Text className='font-poppins text-white pr-32 text-sm'>Upload medical reports and get a summarized overview instantly.</Text>
                                <MaterialIcons
                                    name={'picture-as-pdf'}
                                    color={colors?.blue1}
                                    size={50}
                                    className='absolute right-0 top-0'
                                />
                            </View>
                            <View className='self-end w-40 '>
                                <DefaultButton border textWhite thinPadding icon={'arrow-forward'} onPress={() => navigation.navigate('PDFAnalyzer')}>
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