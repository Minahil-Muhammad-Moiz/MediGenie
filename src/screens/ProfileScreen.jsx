import { View, Text, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer'
import MainContainer from '../components/MainContainer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ageOptions, colors, langs } from '../utils/constants';
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

const ProfileScreen = () => {
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

            <View className=' relative  w-28 h-28 mx-auto overflow-hidden flex items-center justify-center'>
              <Image source={profileImage} height={10} width={10} alt='dummy-profile' className='w-full h-full rounded-full border-4 border-blue1 ' />
              <TouchableOpacity className='absolute bottom-0 right-0 p-2 rounded-full bg-blue1 z-10' onPress={() => setProfileUploadModal(true)}>
                <Ionicons
                  name={'camera-outline'}
                  size={24}
                  color={colors.black1}
                />
              </TouchableOpacity>
            </View>


            {/* name */}
            <CustomInput
              placeholder="Enter your name"
              legendText="Name"
              keyboardType="default"
              startLeft={true}
            />
            <Text className="text-fail text-sm ml-2 ">error</Text>

            {/* gender */}
            <DropdownComponent
              label="Gender"
              placeholder="Select your gender"
              onSelect={(val) => console.log('Selected:', val)}
              startLeft={true}
              data={genders}
            />
            <Text className="text-fail text-sm ml-2 ">error</Text>

            {/* Age */}
            <DropdownComponent
              label="Age"
              placeholder="Select your gender"
              onSelect={(val) => console.log('Selected:', val)}
              startLeft={true}
              data={ageOptions}
            />
            <Text className="text-fail text-sm ml-2 ">error</Text>

            {/* Language */}
            <DropdownComponent
              label="Preferred Language"
              placeholder="Select your gender"
              onSelect={(val) => console.log('Selected:', val)}
              startLeft={true}
              data={langs}
            />
            <Text className="text-fail text-sm ml-2 ">error</Text>


            {/* City */}
            <CustomInput
              placeholder="Enter your city/Country"
              legendText="City, Country"
              keyboardType="default"
              startLeft={true}
            />
            <Text className="text-fail text-sm ml-2 ">error</Text>

          </View>
          {/* <DefaultButton fill border className=''>Next</DefaultButton> */}
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
              <View className=' bg-darkGrey rounded-3xl p-4 w-[85%] items-center'>
                <Text className='text-white font-poppinsBold text-2xl font-bold'>Profile Photo</Text>
                <View className='flex flex-row items-center w-full justify-center mt-6'>
                  <TouchableOpacity className='p-3 w-[25%] border border-blue1 rounded-xl flex items-center' onPress={handleCamera}>
                    <Ionicons
                      name={'camera-outline'}
                      size={25}
                      color={colors.blue1}
                    />
                    <Text className='text-white'>Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className='p-3 w-[25%] border border-blue1 rounded-xl flex items-center' onPress={handleGallery}>
                    <Ionicons
                      name={'image-outline'}
                      size={25}
                      color={colors.blue1}
                    />
                    <Text className='text-white'>Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className='p-3 w-[25%] border border-blue1 rounded-xl flex items-center' onPress={handleRemove}>
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

export default ProfileScreen