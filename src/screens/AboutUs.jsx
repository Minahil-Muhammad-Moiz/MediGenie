import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer'
import MainContainer from '../components/MainContainer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../utils/constants';
import { useNavigation } from '@react-navigation/native';
// import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

const AboutUs = () => {
  const imageURI = require('../assets/images/logoBlack.png')
  const profileImage = require('../assets/images/dummy-profile.png')
  const navigation = useNavigation();

  return (
    <>
      <KeyboardAvoidingContainer>
        <MainContainer>

          {/* Header */}
          <View className='  h-14 flex items-center justify-center gap-2 relative'>
            <TouchableOpacity
              className='bg-darkGrey absolute left-0 self-start p-2 rounded-full w-12 h-12 items-center justify-center'
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back-outline" color={colors.lightText} size={22} />
            </TouchableOpacity>

            <Text className='text-lightText font-extrabold text-2xl text-center '>About Us</Text>

          </View>

          <View className='p-4 my-6 mx-auto font-poppinsRegular w-[90%] rounded-xl bg-blue1 overflow-hidden shadow-lg shadow-blue1 z-10 relative flex-row items-center justify-between'>
            <View className='max-w-[65%]'>
              <Text className='z-10 text-xl font-poppinsBold font-extrabold'>MediGenie</Text>
              <Text className='z-10 text text-sm italic '>Your Health, simplifiied with AI.</Text>
            </View>
            <View className=''>
              <Image source={imageURI} height={10} width={10} alt='dummy-profile' className=' w-14 h-14  z-0' />
            </View>
          </View>

          <View className='flex gap-4 w-[90%] mx-auto'>

            <View className='flex-row justify-between items-start relative w-full rounded-lg'>

              <View className='w-[90%] rounded-xl p-4 z-10 '>
                <Ionicons name="people-outline" color={colors.lightText} size={25} />
                <Text className='text-lightText font-bold text-xl my-4'>Who We are?</Text>
                <Text className='text-lightText text-base '>At MediGenie, we’re a passionate team of healthcare professionals, AI engineers, and data scientists united by one goal: to make world-class medical insight accessible to everyone. Combining years of clinical expertise with cutting-edge machine learning, we empower you with fast, reliable health assessments right on your device.</Text>
              </View>

              <View className='rounded-full w-[70%] h-[70%] z-0 absolute top-[50%]  right-0 shadow-2xl shadow-blue1 '></View>
            </View>

            <View className='flex-row justify-between items-end relative w-full rounded-lg'>

              <View className='w-[90%] rounded-xl p-4 z-10 flex items-start'>
                <Ionicons name="globe-outline" color={colors.lightText} size={25} />
                <Text className='text-lightText font-bold text-xl my-4'>Our Work.</Text>
                <Text className='text-lightText text-base font-semibold '>Data-Driven Diagnosis</Text>
                <Text className='text-lightText text-base  '>We analyze your symptoms and uploaded reports using deep-learning models trained on millions of anonymized medical records—ensuring each suggestion is personalized and evidence-based.</Text>
                <Text className='text-lightText text-base font-semibold mt-3 '>Interactive Guidance</Text>
                <Text className='text-lightText text-base  '>Our intuitive chatbot clarifies uncertainties, and recommends next steps, just like a real health coach. </Text>
              </View>

              {/* <View className='rounded-full w-[70%] h-[70%] z-0 absolute top-[50%] -translate-y-[50%] right-0 shadow-2xl shadow-blue1 '></View> */}
            </View>

            <View className='flex-row my-4 gap-4 flex-wrap items-start justify-center relative '>

              <View className=' border border-blue1 rounded-lg w-36 flex items-center justify-center p-4 z-10'>
                <Ionicons name="heart-outline" color={colors.lightText} size={25} />
                <Text className='text-lightText font-bold text-lg my-2'>Empathy</Text>
                <Text className='text-lightText text-sm text-center'>Keeping Human heart in the hand of technology.</Text>
              </View>

              <View className=' border border-blue1 rounded-lg w-36 flex items-center justify-center p-4 z-10'>
                <Ionicons name="phone-portrait-outline" color={colors.lightText} size={25} />
                <Text className='text-lightText font-bold text-lg my-2'>Accessibility</Text>
                <Text className='text-lightText text-sm text-center'>Helping prople to get healthcare support.</Text>
              </View>

              <View className=' border border-blue1 rounded-lg w-36 flex items-center justify-center p-4 z-10'>
                <Ionicons name="checkmark-circle-outline" color={colors.lightText} size={25} />
                <Text className='text-lightText font-bold text-lg my-2'>Accuracy</Text>
                <Text className='text-lightText text-sm text-center'>Ensuring precision
                  in every output.</Text>
              </View>

              <View className=' border border-blue1 rounded-lg w-36 flex items-center justify-center p-4 z-10'>
                <MaterialCommunityIcons name="lightbulb-on-outline" color={colors.lightText} size={25} />
                <Text className='text-lightText font-bold text-lg my-2'>Innovation</Text>
                <Text className='text-lightText text-sm text-center'>Pioneering AI  solutions for healthcare.</Text>
              </View>

              <View className='rounded-full w-[70%] h-[70%] z-0 absolute top-[50%] -translate-y-[50%]  shadow-2xl shadow-blue1 '></View>
            </View>

            <Text className='text-white text-center text-xl font-bold'>Our Team</Text>
            <View className=' mb-4 flex-row items-center justify-center gap-4 flex-wrap relative shadow-3xl shadow-blue1 max-w-[90%] mx-auto p-4'>

              <View className='flex items-center justify-center shadow-3xl shadow-blue1'>
                <Image source={profileImage} height={10} width={10} alt='dummy-profile' className=' w-14 h-14 rounded-full z-0 mb-4 border border-blue1' />
                <Text className='text-white text-center font-poppinsBold text-sm'>Dr. John Smith</Text>
                <Text className='text-white text-center font-poppinsBold text-sm'>General physician</Text>
              </View>

              <View className='flex items-center justify-center shadow-3xl shadow-blue1'>
                <Image source={profileImage} height={10} width={10} alt='dummy-profile' className=' w-14 h-14 rounded-full z-0 mb-4 border border-blue1' />
                <Text className='text-white text-center font-poppinsBold text-sm'>Dr. John Smith</Text>
                <Text className='text-white text-center font-poppinsBold text-sm'>General physician</Text>
              </View>

              <View className='flex items-center justify-center shadow-3xl shadow-blue1'>
                <Image source={profileImage} height={10} width={10} alt='dummy-profile' className=' w-14 h-14 rounded-full z-0 mb-4 border border-blue1' />
                <Text className='text-white text-center font-poppinsBold text-sm'>Dr. John Smith</Text>
                <Text className='text-white text-center font-poppinsBold text-sm'>General physician</Text>
              </View>

              <View className='flex items-center justify-center shadow-3xl shadow-blue1'>
                <Image source={profileImage} height={10} width={10} alt='dummy-profile' className=' w-14 h-14 rounded-full z-0 mb-4 border border-blue1' />
                <Text className='text-white text-center font-poppinsBold text-sm'>Dr. John Smith</Text>
                <Text className='text-white text-center font-poppinsBold text-sm'>General physician</Text>
              </View>

              {/* <View className='rounded-full w-[70%] h-[70%] z-0 absolute top-[50%] -translate-y-[50%] shadow-2xl shadow-blue1 '></View> */}
            </View>

          </View>

          <Text className='text-lightGrey text-center text-sm'>
            copyright@2025 | Medigenie
          </Text>

        </MainContainer>
      </KeyboardAvoidingContainer>
    </>
  )
}

export default AboutUs