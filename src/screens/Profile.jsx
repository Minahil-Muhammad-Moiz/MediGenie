import { View, Text, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer'
import MainContainer from '../components/MainContainer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ageOptions, cityCountry, colors, langs } from '../utils/constants';
import { genders } from '../utils/constants';
import CustomInput from '../components/CustomInput';
import DefaultButton from '../components/DefaultButton';
import { requestCameraPermission } from '../utils/Permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Alert } from 'react-native'; // make sure this is imported
import {
  captureImageFromCamera,
  pickImageFromGallery,
  removeProfileImage,
} from '../redux/slices/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import DropdownComponent from '../components/DropdownComponent';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const imageURI = require('../assets/images/dummy-profile.png')
  const navigation = useNavigation();
  const [profileUploadModal, setProfileUploadModal] = useState(false)
  // const [profileImage, setProfileImage] = useState(imageURI);
  const dispatch = useDispatch();
  const profileImage = useSelector((state) => state.profile.profileImage);


  const handleCamera = async () => {
    dispatch(captureImageFromCamera()).unwrap()
      .then(() => setProfileUploadModal(false))
      .catch((e) => console.warn(e));
  };

  const handleGallery = async () => {
    dispatch(pickImageFromGallery()).unwrap()
      .then(() => setProfileUploadModal(false))
      .catch((e) => console.warn(e));
  };

  const handleRemove = () => {
    dispatch(removeProfileImage());
    setProfileUploadModal(false);
  };

  const handleNext = () => {
    navigation.navigate('MedicalHistory')
  }

  return (
    <KeyboardAvoidingContainer>
      <MainContainer>
        <View className='flex-1 items-center justify-start w-full'>
          <View className='relative w-28 h-28 mx-auto overflow-hidden flex items-center justify-center my-4'>
            <Image source={profileImage} height={10} width={10} alt='profile' className='w-full h-full rounded-full border-2 border-blue1 ' />
            <TouchableOpacity className='absolute bottom-0 right-0 p-2 rounded-full bg-blue1 z-10' onPress={() => setProfileUploadModal(true)}>
              <Ionicons
                name={'camera-outline'}
                size={24}
                color={colors.black1}
              />
            </TouchableOpacity>
          </View>

          {/* Profile Screen */}
          <View className='border border-lightGrey p-4 rounded-2xl my-2 w-full flex relative'>
            <TouchableOpacity className='p-2 gap-2 self-end rounded-xl absolute top-2 right-2 border border-lightGrey bg-black1 flex-row z-10 items-center justify-center' onPress={() => setProfileUploadModal(true)}>
              <Text className='text-white'>Edit</Text>
              <AntDesign
                name={'edit'}
                size={16}
                color={'#ffffff'}
              />
            </TouchableOpacity>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Name</Text>
              <Text className='text-white w-[50%]'>John Smith</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Gender</Text>
              <Text className='text-white'>Female</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Age</Text>
              <Text className='text-white'>22</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Language</Text>
              <Text className='text-white'>English</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>City/Country</Text>
              <Text className='text-white'>Karachi, Pakistan</Text>
            </View>
          </View>

          {/* Medical History */}
          <View className='border border-lightGrey p-4 rounded-2xl my-2 w-full'>

            <TouchableOpacity className='p-2 gap-2 self-end rounded-xl absolute top-2 right-2 border border-lightGrey bg-black1 flex-row z-10 items-center justify-center' onPress={() => setProfileUploadModal(true)}>
              <Text className='text-white'>Edit</Text>
              <AntDesign
                name={'edit'}
                size={16}
                color={'#ffffff'}
              />
            </TouchableOpacity>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Chronic conditions</Text>
              <Text className='text-white'>None</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Current medication</Text>
              <Text className='text-white'>None</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Known allergies</Text>
              <Text className='text-white'>None</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Past major illness</Text>
              <Text className='text-white'>None</Text>
            </View>
          </View>

          {/* Health Status */}
          <View className='border border-lightGrey p-4 rounded-2xl w-full my-2'>

            <TouchableOpacity className='p-2 gap-2 self-end rounded-xl absolute top-2 right-2 border border-lightGrey bg-black1 flex-row z-10 items-center justify-center' onPress={() => setProfileUploadModal(true)}>
              <Text className='text-white'>Edit</Text>
              <AntDesign
                name={'edit'}
                size={16}
                color={'#ffffff'}
              />
            </TouchableOpacity>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Symptoms pattern</Text>
              <Text className='text-white'>None</Text>
            </View>

            <View className='flex-row gap-2 w-full border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Sleep quality</Text>
              <Text className='text-white'>None</Text>
            </View>

            <View className='flex-row gap-2 w-full border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Diet type</Text>
              <Text className='text-white'>None</Text>
            </View>
          </View>

          {/* Life Style */}
          <View className='border border-lightGrey w-full p-4 rounded-2xl my-2'>

            <TouchableOpacity className='p-2 gap-2 self-end rounded-xl absolute top-2 right-2 border border-lightGrey bg-black1 flex-row z-10 items-center justify-center' onPress={() => setProfileUploadModal(true)}>
              <Text className='text-white'>Edit</Text>
              <AntDesign
                name={'edit'}
                size={16}
                color={'#ffffff'}
              />
            </TouchableOpacity>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Lifestyle habits</Text>
              <Text className='text-white'>Active</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Occupation</Text>
              <Text className='text-white'>Student</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Smoking habits</Text>
              <Text className='text-white'>None</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Alcohol consumption</Text>
              <Text className='text-white'>None</Text>
            </View>
          </View>

          {/* Personal Goals */}
          <View className='border border-lightGrey p-4 w-full rounded-2xl my-2 flex items-start justify-start'>
            <TouchableOpacity className='p-2 gap-2 self-end rounded-xl absolute top-2 right-2 border border-lightGrey bg-black1 flex-row z-10 items-center justify-center' onPress={() => setProfileUploadModal(true)}>
              <Text className='text-white'>Edit</Text>
              <AntDesign
                name={'edit'}
                size={16}
                color={'#ffffff'}
              />
            </TouchableOpacity>

            <Text className='text-white font-bold'>Personal Goals</Text>

            <View className='flex-row flex-wrap gap-2 my-1 items-center justify-start'>
              <Text className='p-2 rounded-2xl font-semibold bg-blue1'>
                Eat Healthy
              </Text>
              <Text className='p-2 rounded-2xl font-semibold  bg-blue1'>
                Eat Healthy
              </Text>
              <Text className='p-2 rounded-2xl font-semibold  bg-blue1'>
                Eat Healthy
              </Text>
              <Text className='p-2 rounded-2xl font-semibold bg-blue1'>
                Eat Healthy
              </Text>
            </View>
          </View>

        </View>

        <Modal visible={profileUploadModal} transparent animationType='fade'>
          <TouchableWithoutFeedback onPress={() => setProfileUploadModal(false)}>
            <View className='mx-auto flex-1 items-center justify-center bg-darkGrey/60 w-full'>
              <View className=' bg-darkGrey rounded-3xl p-4 w-[90%] items-center'>
                <Text className='text-white font-poppinsBold text-2xl font-bold'>Profile Photo</Text>
                <View className='flex flex-row items-center w-full justify-evenly mt-6'>
                  <TouchableOpacity className='p-3  border border-blue1 rounded-xl flex items-center' onPress={handleCamera}>
                    <Ionicons
                      name={'camera-outline'}
                      size={25}
                      color={colors.blue1}
                    />
                    <Text className='text-white'>Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className='p-3  border border-blue1 rounded-xl flex items-center' onPress={handleGallery}>
                    <Ionicons
                      name={'image-outline'}
                      size={25}
                      color={colors.blue1}
                    />
                    <Text className='text-white'>Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className='p-3  border border-blue1 rounded-xl flex items-center' onPress={handleRemove}>
                    <Ionicons
                      name={'trash-outline'}
                      size={25}
                      color={colors.fail}
                    />
                    <Text className='text-white'>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </MainContainer>
    </KeyboardAvoidingContainer>
  )
}

export default Profile