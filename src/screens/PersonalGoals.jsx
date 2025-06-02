import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainContainer from '../components/MainContainer'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { availableTags, colors } from '../utils/constants';
import CustomInput from '../components/CustomInput';
import DefaultButton from '../components/DefaultButton';

const PersonalGoals = () => {
    const [selectedTags, setSelectedTags] = useState([]);
    const navigation = useNavigation();
    const profileImage = useSelector((state) => state.profile.profileImage);

    const toggleTag = (tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag]
        );
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

                <View className='flex-1 justify-center w-full'>

                    <View className="flex-row flex-wrap gap-2 mb-10">
                        {availableTags.map((tag) => {
                            const isSelected = selectedTags.includes(tag);
                            return (
                                <TouchableOpacity
                                    key={tag}
                                    onPress={() => toggleTag(tag)}
                                    style={{
                                        backgroundColor: isSelected ? colors.blue1 : colors.darkGrey,
                                        paddingVertical: 8,
                                        paddingHorizontal: 16,
                                        borderRadius: 20,
                                        marginBottom: 8,
                                    }}
                                >
                                    <Text style={{ color: isSelected ? '#fff' : colors.lightText, fontWeight: '600' }}>
                                        {tag}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
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