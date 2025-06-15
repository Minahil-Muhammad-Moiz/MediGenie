import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainContainer from '../components/MainContainer'
import { useNavigation, useRoute } from '@react-navigation/native';
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
            prev.includes(tag.value)
                ? prev.filter((t) => t !== tag.value)
                : [...prev, tag.value]
        );
    };
    // console.log(selectedTags)


    const route = useRoute(); // <-- Get route params
    const routeName = route?.params?.from;
    console.log(routeName)
    const handleNext = () => {
        if (routeName === 'LifeStyle') {
            navigation.reset({
                index: 0,
                routes: [{ name: 'MainScreen', from: 'PersonalGoals' }],
            });
        } else {
            navigation.goBack();
        }
    }

    return (
        <KeyboardAvoidingContainer>
            <MainContainer >

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

                    <Image source={profileImage} height={10} width={10} alt='dummy-profile' className='w-14 h-14 rounded-full border-2 border-blue1 ' />

                </View>

                <View className='mt-[4%] flex gap-2'>
                    <Text className='text-white font-extrabold font-poppinsBold text-4xl'>Your Goals Tag</Text>
                </View>

                <View className='flex-1 justify-center w-full'>

                    <View className="flex-row flex-wrap gap-2 mb-10">
                        {availableTags.map((tag) => {
                            const isSelected = selectedTags.includes(tag.value);
                            return (
                                <TouchableOpacity
                                    key={tag?.value}
                                    onPress={() => toggleTag(tag)}
                                    className={` ${isSelected ? 'bg-blue1' : 'bg-darkGrey'} rounded-xl p-3 `}
                                >
                                    <Text style={{ color: isSelected ? colors.black1 : colors.lightText, fontWeight: '600' }}>
                                        {tag?.label}
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
                // className=' bottom-0'
                >
                    Submit
                </DefaultButton>
            </MainContainer>
        </KeyboardAvoidingContainer>
    )
}

export default PersonalGoals