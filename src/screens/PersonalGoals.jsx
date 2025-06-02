import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainContainer from '../components/MainContainer'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { colors, goalOptions } from '../utils/constants';
import CustomInput from '../components/CustomInput';
import DefaultButton from '../components/DefaultButton';

const PersonalGoals = () => {
    const navigation = useNavigation();
    const profileImage = useSelector((state) => state.profile.profileImage);
    const [selectedGoal, setSelectedGoal] = useState(null);

    const handleSelect = (goal) => {
        setSelectedGoal(goal);
        onSelect && onSelect(goal);
    };


    const handleNext = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
        });
    }


    return (
        <KeyboardAvoidingContainer>
            <MainContainer>

                <View className='flex flex-row items-center justify-between w-full mt-[4%]'>

                    <TouchableOpacity
                        className='bg-darkGrey p-2 rounded-full flex items-center justify-center w-14 h-14 '
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons
                            name={'arrow-back-outline'}
                            color={colors.lightText}
                            size={25}
                        />
                    </TouchableOpacity>

                    <Image source={profileImage} height={10} width={10} alt='dummy-profile' className='w-14 h-14 rounded-full border-4 border-blue1 ' />

                </View>

                <View className='mt-[4%] flex gap-2'>
                    <Text className='text-white font-extrabold font-poppinsBold text-4xl'>Your Goals Tag</Text>
                </View>

                <View className='flex-1 justify-center '>

                        {goalOptions.map((goal) => {
                            const isActive = selectedGoal === goal;
                            return (
                                <TouchableOpacity
                                    key={goal}
                                    onSelect={(value) => {
                                        console.log('User selected goal:', value);
                                    }}
                                    onPress={() => handleSelect(goal)}
                                    style={{
                                        backgroundColor: isActive ? colors.blue1 : "#333",
                                        paddingVertical: 16,
                                        paddingHorizontal: 18,
                                        borderRadius: 25,
                                        marginRight: 10,
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text style={{ color: isActive ? colors.black1 : colors.lightText, fontWeight: '600' }}>
                                        {goal}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                </View>

                <DefaultButton
                    fill
                    border
                    onPress={handleNext}
                    title='Submit'
                >
                    Submit
                </DefaultButton>
            </MainContainer>
        </KeyboardAvoidingContainer>
    )
}

export default PersonalGoals