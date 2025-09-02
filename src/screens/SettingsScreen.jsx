import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer'
import MainContainer from '../components/MainContainer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/constants';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/thunks/authThunks';


const SettingsScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(logoutUser());

      if (logoutUser.fulfilled.match(resultAction)) {
        // ✅ Successfully logged out
        navigation.reset({
          index: 0,
          routes: [{ name: "LoginScreen", from: "HomeScreen" }],
        });
      } else {
        // ❌ API failed → show error
        const errorMsg = resultAction.payload?.message || "Logout failed";
        Alert.alert("Logout Error", errorMsg);
      }
    } catch (error) {
      // console.log("Logout error:", error);
      Alert.alert("Logout Error", "Something went wrong");
    }
  };


  return (
    <KeyboardAvoidingContainer>
      <MainContainer>
        <Text className='text-lightText text-center font-extrabold text-2xl'>Settings</Text>

        <View className='border border-lightGrey p-2 rounded-2xl my-4 w-full flex relative items-start '>
          <TouchableOpacity className='flex-row gap-2 items-center justify-start p-2 border border-b-zinc-700 mb-2 px-2 w-full' onPress={() => navigation.navigate('AboutUs')}>
            <Ionicons
              name={'information-circle-outline'}
              color={'#ffffff'}
              size={22}
            />
            <Text className='text-white'>About Us</Text>
          </TouchableOpacity>

          <TouchableOpacity className='flex-row gap-2 items-center justify-start p-2 border border-b-zinc-700 mb-2 px-2 w-full' onPress={()=>navigation.navigate("Profile")}>
            <Ionicons
              name={'settings-outline'}
              color={'#ffffff'}
              size={22}
            />
            <Text className='text-white'>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity className='flex-row gap-2 items-center justify-start p-2 border border-b-zinc-700 mb-2 px-2 w-full' onPress={handleLogout}>
            <Ionicons
              name={'person-remove-outline'}
              color={'#ffffff'}
              size={22}
            />
            <Text className='text-white'>Delete Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity className='flex-row gap-2 items-center justify-center p-2' onPress={handleLogout}>
            <Ionicons
              name={'log-out-outline'}
              color={colors.fail}
              size={22}
            />
            <Text className='text-white'>Log Out</Text>
          </TouchableOpacity>
        </View>
      </MainContainer>
    </KeyboardAvoidingContainer>
  )
}

export default SettingsScreen