import { View, Text, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer';
import MainContainer from '../components/MainContainer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ageOptions, cityCountry, colors, genders } from '../utils/constants';
import CustomInput from '../components/CustomInput';
import DefaultButton from '../components/DefaultButton';
import {
  captureImageFromCamera,
  pickImageFromGallery,
  removeProfileImage,
} from '../redux/slices/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import DropdownComponent from '../components/DropdownComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchUser, updateField } from '../redux/slices/userSlice';

const ProfileScreen = () => {
  const route = useRoute();
  const routeName = route?.from;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const profileImage = useSelector((state) => state.profile.profileImage);
  const { user } = useSelector((state) => state.user);

  const [profileUploadModal, setProfileUploadModal] = useState(false);

  // Local states for form fields
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');

  // sync initial values from redux user
  useEffect(() => {
    if (user?.profile) {
      setUsername(user.profile.name || '');
      setGender(user.profile.gender || '');
      setAge(user.profile.age ? String(user.profile.age) : '');
      setCity(user.profile.city || '');
    }
  }, [user]);

  const handleCamera = async () => {
    dispatch(captureImageFromCamera())
      .unwrap()
      .then(() => setProfileUploadModal(false))
      .catch((e) => console.warn(e));
  };

  const handleGallery = async () => {
    dispatch(pickImageFromGallery())
      .unwrap()
      .then(() => setProfileUploadModal(false))
      .catch((e) => console.warn(e));
  };

  const handleRemove = () => {
    dispatch(removeProfileImage());
    setProfileUploadModal(false);
  };

  const handleNext = () => {
    const formData = {
      name: username,
      gender,
      age,
      city,
    };

    // 🔥 Update Redux userSlice with new data
    Object.entries(formData).forEach(([field, value]) => {
      dispatch(updateField({ field, value }));
    });

    // console.log('Updated Redux user data:', formData);

    if (routeName === 'EmailVerification') {
      navigation.navigate('MedicalHistory', { from: 'ProfileScreen', profileData: formData });
    } else {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingContainer>
      <MainContainer>
        <View className="flex-1 items-center justify-between w-full">
          <View className="w-full flex-1 justify-center gap-1">
            {/* Profile Image */}
            <View className="-mt-2 relative w-28 h-28 mx-auto overflow-hidden flex items-center justify-center">
              <Image
                source={profileImage}
                height={10}
                width={10}
                alt="profile"
                className="w-full h-full rounded-full border-2 border-blue1"
              />
              <TouchableOpacity
                className="absolute bottom-0 right-0 p-2 rounded-full bg-blue1 z-10"
                onPress={() => setProfileUploadModal(true)}
              >
                <Ionicons name="camera-outline" size={22} color={colors.black1} />
              </TouchableOpacity>
            </View>

            {/* Name */}
            <CustomInput
              placeholder="Enter your name"
              legendText="Name"
              keyboardType="default"
              startLeft={true}
              value={username}
              onChangeText={setUsername}
            />

            {/* Gender */}
            <DropdownComponent
              label="Gender"
              placeholder="Select your gender"
              startLeft={true}
              data={genders}
              value={gender}
              onSelect={(val) => setGender(val)}
            />

            {/* Age */}
            <DropdownComponent
              label="Age"
              placeholder="Select your age"
              startLeft={true}
              data={ageOptions}
              value={age}
              onSelect={(val) => setAge(val)}
            />

            {/* City */}
            <DropdownComponent
              placeholder="Select your city/Country"
              label="City, Country"
              startLeft={true}
              data={cityCountry}
              value={city}
              onSelect={(val) => setCity(val)}
            />
          </View>

          <DefaultButton fill border onPress={handleNext} title="Submit">
            {routeName === 'EmailVerification' ? 'Next' : 'Save'}
          </DefaultButton>
        </View>

        {/* Modal for Image options */}
        <Modal visible={profileUploadModal} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setProfileUploadModal(false)}>
            <View className="mx-auto flex-1 items-center justify-center bg-darkGrey/60 w-full">
              <View className="bg-darkGrey rounded-3xl p-4 w-[90%] items-center">
                <Text className="text-white font-poppinsBold text-2xl font-bold">Profile Photo</Text>
                <View className="flex flex-row items-center w-full justify-evenly mt-6">
                  <TouchableOpacity
                    className="p-3 border border-blue1 rounded-xl flex items-center"
                    onPress={handleCamera}
                  >
                    <Ionicons name="camera-outline" size={25} color={colors.blue1} />
                    <Text className="text-white">Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="p-3 border border-blue1 rounded-xl flex items-center"
                    onPress={handleGallery}
                  >
                    <Ionicons name="image-outline" size={25} color={colors.blue1} />
                    <Text className="text-white">Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="p-3 border border-blue1 rounded-xl flex items-center"
                    onPress={handleRemove}
                  >
                    <Ionicons name="trash-outline" size={25} color={colors.fail} />
                    <Text className="text-white">Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </MainContainer>
    </KeyboardAvoidingContainer>
  );
};

export default ProfileScreen;
