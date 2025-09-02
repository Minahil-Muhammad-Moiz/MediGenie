import { View, Text, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer'
import MainContainer from '../components/MainContainer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  captureImageFromCamera,
  pickImageFromGallery,
  removeProfileImage,
} from '../redux/slices/profileSlice';
import { useNavigation } from '@react-navigation/native';
import { loadToken } from '../redux/slices/authSlice';
import { fetchUser } from '../redux/slices/userSlice';

const Profile = () => {
  const imageURI = require('../assets/images/dummy-profile.png')
  const navigation = useNavigation();
  const [profileUploadModal, setProfileUploadModal] = useState(false);
  const dispatch = useDispatch();
  const profileImage = useSelector((state) => state.profile.profileImage);

  // 👇 Get user state (all fields are now top-level in userSlice)
  const user = useSelector((state) => state.user);

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


  return (
    <KeyboardAvoidingContainer>
      <MainContainer>
        <View className='flex-1 items-center justify-start w-full'>
          <Text className='text-lightText font-extrabold text-2xl text-center'>User profile</Text>

          {/* Avatar */}
          <View className='relative w-20 h-20 mx-auto overflow-hidden flex items-center justify-center my-4'>
            <Image source={profileImage || imageURI} className='w-full h-full rounded-full border-2 border-blue1' />
            <TouchableOpacity
              className='absolute bottom-0 right-0 p-2 rounded-full bg-blue1 z-10'
              onPress={() => setProfileUploadModal(true)}>
              <Ionicons name={'camera-outline'} size={16} color={colors.black1} />
            </TouchableOpacity>
          </View>

          {/* Basic Info */}
          <View className='border border-lightGrey p-4 rounded-2xl my-2 w-full flex relative'>
            <TouchableOpacity
              className='p-2 gap-1 self-end rounded-xl absolute top-2 right-2 border border-lightGrey bg-black1 flex-row z-10 items-center justify-center'
              onPress={() => navigation.navigate('ProfileScreen')}>
              <Text className='text-white text-sm'>Edit</Text>
              <AntDesign name={'edit'} size={12} color={'#ffffff'} />
            </TouchableOpacity>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Name</Text>
              <Text className='text-white w-[50%]'>{user?.name || 'John Smith'}</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Email</Text>
              <Text className='text-white w-[50%]'>{user?.email}</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Role</Text>
              <Text className='text-white w-[50%]'>{user?.role || 'User'}</Text>
            </View>
          </View>

          {/* Profile Info */}
          <View className='border border-lightGrey p-4 rounded-2xl my-2 w-full flex relative'>
            <TouchableOpacity
              className='p-2 gap-1 self-end rounded-xl absolute top-2 right-2 border border-lightGrey bg-black1 flex-row z-10 items-center justify-center'
              onPress={() => navigation.navigate('ProfileScreen')}>
              <Text className='text-white text-sm'>Edit</Text>
              <AntDesign name={'edit'} size={12} color={'#ffffff'} />
            </TouchableOpacity>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Gender</Text>
              <Text className='text-white'>{user?.gender || 'Male'}</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Age</Text>
              <Text className='text-white'>{user?.age || '22'}</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Language</Text>
              <Text className='text-white'>English</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>City</Text>
              <Text className='text-white'>{user?.city || 'Karachi'}</Text>
            </View>
          </View>

          {/* Medical History */}
          <View className='border border-lightGrey p-4 rounded-2xl my-2 w-full'>
            <TouchableOpacity
              className='p-2 gap-1 self-end rounded-xl absolute top-2 right-2 border border-lightGrey bg-black1 flex-row z-10 items-center justify-center'
              onPress={() => navigation.navigate('MedicalHistory')}>
              <Text className='text-white text-sm'>Edit</Text>
              <AntDesign name={'edit'} size={12} color={'#ffffff'} />
            </TouchableOpacity>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Chronic conditions</Text>
              <Text className='text-white'>{user?.chronic_conditions || 'None'}</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Current medications</Text>
              <Text className='text-white'>{user?.current_medications || 'None'}</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Known allergies</Text>
              <Text className='text-white'>{user?.known_allergies || 'None'}</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Family Medical History</Text>
              <Text className='text-white'>{user?.family_medical_history || 'None'}</Text>
            </View>
          </View>

          {/* Health Status */}
          <View className='border border-lightGrey p-4 rounded-2xl w-full my-2'>
            <TouchableOpacity
              className='p-2 gap-1 self-end rounded-xl absolute top-2 right-2 border border-lightGrey bg-black1 flex-row z-10 items-center justify-center'
              onPress={() => navigation.navigate('HealthStatus')}>
              <Text className='text-white text-sm'>Edit</Text>
              <AntDesign name={'edit'} size={12} color={'#ffffff'} />
            </TouchableOpacity>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Symptoms pattern</Text>
              <Text className='text-white'>{user?.symptom_pattern || 'None'}</Text>
            </View>

            <View className='flex-row gap-2 w-full border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Sleep quality</Text>
              <Text className='text-white'>{user?.sleep_quality || 'None'}</Text>
            </View>

            <View className='flex-row gap-2 w-full border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Diet type</Text>
              <Text className='text-white'>{user?.diet_type || 'None'}</Text>
            </View>
          </View>

          {/* Lifestyle */}
          <View className='border border-lightGrey w-full p-4 rounded-2xl my-2'>
            <TouchableOpacity
              className='p-2 gap-1 self-end rounded-xl absolute top-2 right-2 border border-lightGrey bg-black1 flex-row z-10 items-center justify-center'
              onPress={() => navigation.navigate('LifeStyle')}>
              <Text className='text-white text-sm'>Edit</Text>
              <AntDesign name={'edit'} size={12} color={'#ffffff'} />
            </TouchableOpacity>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Lifestyle habits</Text>
              <Text className='text-white'>{user?.lifestyle_type || 'Active'}</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Occupation</Text>
              <Text className='text-white'>{user?.occupation || 'Student'}</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Smoking habits</Text>
              <Text className='text-white'>{user?.smoking ? 'Yes' : 'No'}</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Alcohol consumption</Text>
              <Text className='text-white'>{user?.alcohol ? 'Yes' : 'No'}</Text>
            </View>
          </View>

          {/* Personal Goals */}
          <View className='border border-lightGrey p-4 w-full rounded-2xl my-2 flex items-start justify-start'>
            <TouchableOpacity
              className='p-2 gap-1 self-end rounded-xl absolute top-2 right-2 border border-lightGrey bg-black1 flex-row z-10 items-center justify-center'
              onPress={() => navigation.navigate('PersonalGoals')}>
              <Text className='text-white text-sm'>Edit</Text>
              <AntDesign name={'edit'} size={12} color={'#ffffff'} />
            </TouchableOpacity>

            <Text className='text-white font-bold'>Personal Goals</Text>
            <View className='flex-row flex-wrap gap-2 my-1 items-center justify-start'>
              {user?.personal_goals.map((item, index) =>
                <Text key={index} className='p-2 rounded-2xl font-semibold bg-blue1 text-sm'>{item}</Text>
              )}
            </View>
          </View>
        </View>

        {/* Profile Upload Modal */}
        <Modal visible={profileUploadModal} transparent animationType='fade'>
          <TouchableWithoutFeedback onPress={() => setProfileUploadModal(false)}>
            <View className='mx-auto flex-1 items-center justify-center bg-darkGrey/60 w-full'>
              <View className=' bg-darkGrey rounded-3xl p-4 w-[90%] items-center'>
                <Text className='text-white font-poppinsBold text-2xl font-bold'>Profile Photo</Text>
                <View className='flex flex-row items-center w-full justify-evenly mt-6'>
                  <TouchableOpacity className='p-3 border border-blue1 rounded-xl flex items-center' onPress={handleCamera}>
                    <Ionicons name={'camera-outline'} size={25} color={colors.blue1} />
                    <Text className='text-white'>Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className='p-3 border border-blue1 rounded-xl flex items-center' onPress={handleGallery}>
                    <Ionicons name={'image-outline'} size={25} color={colors.blue1} />
                    <Text className='text-white'>Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className='p-3 border border-blue1 rounded-xl flex items-center' onPress={handleRemove}>
                    <Ionicons name={'trash-outline'} size={25} color={colors.fail} />
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
