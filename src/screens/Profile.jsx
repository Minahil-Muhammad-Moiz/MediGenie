import { View, Text, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer'
import MainContainer from '../components/MainContainer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Alert } from "react-native"; // make sure this is imported
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  captureImageFromCamera,
  pickImageFromGallery,
  removeProfileImage,
} from '../redux/slices/profileSlice';
import { useNavigation } from '@react-navigation/native';
import { updateUserProfile } from '../redux/slices/userSlice';

const Profile = () => {
  const imageURI = require('../assets/images/dummy-profile.png')
  const navigation = useNavigation();
  const [profileUploadModal, setProfileUploadModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // 👈 new state for edit mode
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


  const handleUpdate = () => {

    if (isEditing) {
      const payload = {
        email: user.email,
        name: user.name,
        age: user.age,
        date_of_birth: user.date_of_birth,
        image: user.image,
        gender: user.gender,
        city: user.city,
        chronic_conditions: user.chronic_conditions,
        current_medications: user.current_medications,
        known_allergies: user.known_allergies,
        family_medical_history: user.family_medical_history,
        symptom_pattern: user.symptom_pattern,
        sleep_quality: user.sleep_quality,
        diet_type: user.diet_type,
        lifestyle_type: user.lifestyle_type,
        occupation: user.occupation,
        smoking: user.smoking,
        alcohol: user.alcohol,
      };

      dispatch(updateUserProfile(payload))
        .unwrap()
        .then((res) => {
          console.log("✅ Update successful:", res);
          Alert.alert("Success", "Profile updated successfully!");
        })
        .catch((err) => {
          console.error("❌ Update failed:", err);

          Alert.alert(
            "Update Failed",
            typeof err === "string"
              ? err
              : err?.detail || "Something went wrong. Make sure all fields are updated."
          );
        });
    }

    setIsEditing(!isEditing);
  };


  return (
    <KeyboardAvoidingContainer>
      <MainContainer>
        <View className='flex-1 items-center justify-start w-full'>
          {/* Header with Update/Done button */}
          <View className='flex-row w-full justify-between items-center px-4 my-2'>
            <Text className='text-lightText font-extrabold text-2xl'>User Profile</Text>
            <TouchableOpacity
              className='px-4 py-2 rounded-xl bg-blue1'
              onPress={handleUpdate}>
              <Text className='text-black1 font-bold'>{isEditing ? 'Done' : 'Update'}</Text>
            </TouchableOpacity>
          </View>

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
            {isEditing && (
              <TouchableOpacity
                className='p-2 gap-1 self-end rounded-xl absolute top-2 right-2 border border-lightGrey bg-black1 flex-row z-10 items-center justify-center'
                onPress={() => navigation.navigate('ProfileScreen')}>
                <Text className='text-white text-sm'>Edit</Text>
                <AntDesign name={'edit'} size={12} color={'#ffffff'} />
              </TouchableOpacity>
            )}

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Name</Text>
              <Text className={`text-white ${!user?.name && 'italic'} `}>{user?.name || 'Not Updated'}</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Gender</Text>
              <Text className={`text-white ${!user?.gender && 'italic'} `}>{user?.gender || 'Not Updated'}</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Age</Text>
              <Text className={`text-white ${!user?.age && 'italic'} `}>{user?.age || 'Not Updated'}</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>City</Text>
              <Text className={`text-white ${!user?.city && 'italic'} `}>{user?.city || 'Not Updated'}</Text>
            </View>
          </View>

          {/* Medical History */}
          <View className='border border-lightGrey p-4 rounded-2xl my-2 w-full relative'>
            {isEditing && (
              <TouchableOpacity
                className='p-2 gap-1 self-end rounded-xl absolute top-2 right-2 border border-lightGrey bg-black1 flex-row z-10 items-center justify-center'
                onPress={() => navigation.navigate('MedicalHistory')}>
                <Text className='text-white text-sm'>Edit</Text>
                <AntDesign name={'edit'} size={12} color={'#ffffff'} />
              </TouchableOpacity>
            )}

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Chronic conditions</Text>
              <Text className={`text-white ${!user?.chronic_conditions && 'italic'} `}>{user?.chronic_conditions || 'Not Updated'}</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Current medications</Text>
              <Text className={`text-white ${!user?.current_medications && 'italic'} `}>{user?.current_medications || 'Not Updated'}</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Known allergies</Text>
              <Text className={`text-white ${!user?.known_allergies && 'italic'} `}>{user?.known_allergies || 'Not Updated'}</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Family Medical History</Text>
              <Text className={`text-white ${!user?.family_medical_history && 'italic'} `}>{user?.family_medical_history || 'Not Updated'}</Text>
            </View>
          </View>

          {/* Health Status */}
          <View className='border border-lightGrey p-4 rounded-2xl w-full my-2 relative'>
            {isEditing && (
              <TouchableOpacity
                className='p-2 gap-1 self-end rounded-xl absolute top-2 right-2 border border-lightGrey bg-black1 flex-row z-10 items-center justify-center'
                onPress={() => navigation.navigate('HealthStatus')}>
                <Text className='text-white text-sm'>Edit</Text>
                <AntDesign name={'edit'} size={12} color={'#ffffff'} />
              </TouchableOpacity>
            )}

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Symptoms pattern</Text>
              <Text className={`text-white ${!user?.symptom_pattern && 'italic'} `}>{user?.symptom_pattern || 'Not Updated'}</Text>
            </View>

            <View className='flex-row gap-2 w-full border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Sleep quality</Text>
              <Text className={`text-white ${!user?.sleep_quality && 'italic'} `}>{user?.sleep_quality || 'Not Updated'}</Text>
            </View>

            <View className='flex-row gap-2 w-full border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Diet type</Text>
              <Text className={`text-white ${!user?.diet_type && 'italic'} `}>{user?.diet_type || 'Not Updated'}</Text>
            </View>
          </View>

          {/* Lifestyle */}
          <View className='border border-lightGrey w-full p-4 rounded-2xl my-2 relative'>
            {isEditing && (
              <TouchableOpacity
                className='p-2 gap-1 self-end rounded-xl absolute top-2 right-2 border border-lightGrey bg-black1 flex-row z-10 items-center justify-center'
                onPress={() => navigation.navigate('LifeStyle')}>
                <Text className='text-white text-sm'>Edit</Text>
                <AntDesign name={'edit'} size={12} color={'#ffffff'} />
              </TouchableOpacity>
            )}

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Lifestyle habits</Text>
              <Text className={`text-white ${!user?.lifestyle_type && 'italic'} `}>{user?.lifestyle_type || 'Not Updated'}</Text>
            </View>

            <View className='flex-row gap-2 border border-b-zinc-700 mb-2 px-2'>
              <Text className='text-white font-bold w-[50%]'>Occupation</Text>
              <Text className={`text-white ${!user?.occupation && 'italic'} `}>{user?.occupation || 'Not Updated'}</Text>

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
          <View className='border border-lightGrey p-4 w-full rounded-2xl my-2 flex items-start justify-start relative'>
            {isEditing && (
              <TouchableOpacity
                className='p-2 gap-1 self-end rounded-xl absolute top-2 right-2 border border-lightGrey bg-black1 flex-row z-10 items-center justify-center'
                onPress={() => navigation.navigate('PersonalGoals')}>
                <Text className='text-white text-sm'>Edit</Text>
                <AntDesign name={'edit'} size={12} color={'#ffffff'} />
              </TouchableOpacity>
            )}

            <Text className='text-white font-bold'>Personal Goals</Text>
            <View className='flex-row flex-wrap gap-2 my-1 items-center justify-start'>
              {user?.personal_goals?.map((item, index) =>
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
