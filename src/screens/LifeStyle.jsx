import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainContainer from '../components/MainContainer'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { colors } from '../utils/constants';
import CustomInput from '../components/CustomInput';
import DefaultButton from '../components/DefaultButton';
import PersonalGoals from './PersonalGoals';

const LifeStyle = () => {
    const navigation = useNavigation();
    const profileImage = useSelector((state) => state.profile.profileImage);

    const route = useRoute(); // <-- Get route params
    const routeName = route?.params?.from;
    // console.log(routeName)
    const handleNext = () => {
        if (routeName === 'HealthStatus') {
            navigation.navigate('PersonalGoals', { from: 'LifeStyle' })
        } else {
            navigation.goBack();
        }
    }

    return (
        <KeyboardAvoidingContainer>
            <MainContainer>

                <View className='flex flex-row items-center justify-between w-full '>

                    <TouchableOpacity
                        className='bg-darkGrey p-2 rounded-full flex items-center justify-center w-12 h-12 '
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons
                            name={'arrow-back-outline'}
                            color={colors.lightText}
                            size={22}
                        />
                    </TouchableOpacity>

                    <Image source={profileImage} height={10} width={10} alt='dummy-profile' className='w-12 h-12 rounded-full border-2 border-blue1 ' />

                </View>

                <View className='mt-[2%] flex'>
                    <Text className='text-white font-extrabold font-poppinsBold text-3xl'>Your Lifestyle & habits</Text>
                </View>

                <View className='flex-1 justify-center w-full'>

                    <CustomInput
                        placeholder="Active/Sedentary"
                        legendText="Lifestyle Habits"
                        keyboardType="default"
                        startLeft={true}
                    />
                    {/* <Text className="text-fail text-sm ml-2 ">error</Text> */}

                    <CustomInput
                        placeholder="Desk Job/ Field Work/Student "
                        legendText="Occupation"
                        keyboardType="default"
                        startLeft={true}
                    />
                    {/* <Text className="text-fail text-sm ml-2 ">error</Text> */}

                    <CustomInput
                        placeholder="Yes / No"
                        legendText="Smoking Habits"
                        keyboardType="default"
                        startLeft={true}
                    />
                    {/* <Text className="text-fail text-sm ml-2 ">error</Text> */}

                    <CustomInput
                        placeholder="Yes / No"
                        legendText="Alchohol consumption"
                        keyboardType="default"
                        startLeft={true}
                    />
                    {/* <Text className="text-fail text-sm ml-2 ">error</Text> */}

                </View>

                <DefaultButton
                    fill
                    border
                    onPress={handleNext}
                    title='Submit'
                >
                    Next
                </DefaultButton>
            </MainContainer>
        </KeyboardAvoidingContainer>
    )
}

export default LifeStyle