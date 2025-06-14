import { View, Text, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer'
import MainContainer from '../components/MainContainer'
import Ionicons from 'react-native-vector-icons/Ionicons';
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
        <View className='flex-1 items-center justify-between w-full'>
          <View className='w-full flex-1 justify-center'>

            <View className='-mt-2 relative w-28 h-28 mx-auto overflow-hidden flex items-center justify-center'>
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
            <View className='border border-lightGrey p-4 rounded-2xl my-2'>
              <View className='flex gap-2'>
                <Text className='text-whtite'>Name</Text>
                <Text className='text-whtite'>John Smith</Text>
              </View>

              <View className='flex gap-2'>
                <Text className='text-whtite'>Gender</Text>
                <Text className='text-whtite'>She</Text>
              </View>

              <View className='flex gap-2'>
                <Text className='text-whtite'>Age</Text>
                <Text className='text-whtite'>22</Text>
              </View>

              <View className='flex gap-2'>
                <Text className='text-whtite'>Language</Text>
                <Text className='text-whtite'>English</Text>
              </View>

              <View className='flex gap-2'>
                <Text className='text-whtite'>City/Country</Text>
                <Text className='text-whtite'>Karachi, Pakistan</Text>
              </View>
            </View>

            {/* Medical History */}
            <View className='border border-lightGrey p-4 rounded-2xl my-2'>
              <View className='flex gap-2'>
                <Text className='text-whtite'>Chronic conditions</Text>
                <Text className='text-whtite'>None</Text>
              </View>

              <View className='flex gap-2'>
                <Text className='text-whtite'>Current medication</Text>
                <Text className='text-whtite'>None</Text>
              </View>

              <View className='flex gap-2'>
                <Text className='text-whtite'>Known allergies</Text>
                <Text className='text-whtite'>None</Text>
              </View>

              <View className='flex gap-2'>
                <Text className='text-whtite'>Past major illness</Text>
                <Text className='text-whtite'>None</Text>
              </View>
            </View>

            {/* Health Status */}
            <View className='border border-lightGrey p-4 rounded-2xl my-2'>
              <View className='flex gap-2'>
                <Text className='text-whtite'>Symptoms pattern</Text>
                <Text className='text-whtite'>None</Text>
              </View>

              <View className='flex gap-2'>
                <Text className='text-whtite'>Sleep quality</Text>
                <Text className='text-whtite'>None</Text>
              </View>

              <View className='flex gap-2'>
                <Text className='text-whtite'>Diet type</Text>
                <Text className='text-whtite'>None</Text>
              </View>
            </View>

            {/* Life Style */}
            <View className='border border-lightGrey p-4 rounded-2xl my-2'>
              <View className='flex gap-2'>
                <Text className='text-whtite'>Lifestyle habits</Text>
                <Text className='text-whtite'>Active</Text>
              </View>

              <View className='flex gap-2'>
                <Text className='text-whtite'>Occupation</Text>
                <Text className='text-whtite'>Student</Text>
              </View>

              <View className='flex gap-2'>
                <Text className='text-whtite'>Smoking habits</Text>
                <Text className='text-whtite'>None</Text>
              </View>

              <View className='flex gap-2'>
                <Text className='text-whtite'>Alcohol consumption</Text>
                <Text className='text-whtite'>None</Text>
              </View>
            </View>

            {/* Personal Goals */}
            <View className='border border-lightGrey p-4 rounded-2xl my-2'>
              <View className={` bg-blue1 rounded-xl p-3 `}
              >
                <Text style={{ color: colors.black1, fontWeight: '600' }}>
                  Eat Healthy 
                </Text>
              </View>
            </View>

          </View>
          <DefaultButton
            fill
            border
            onPress={handleNext}
            title='Submit'
          >
            Next
          </DefaultButton>
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