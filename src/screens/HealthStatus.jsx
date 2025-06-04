import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainContainer from '../components/MainContainer'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { colors, sleepQuality } from '../utils/constants';
import CustomInput from '../components/CustomInput';
import DefaultButton from '../components/DefaultButton';
import LifeStyle from './LifeStyle';
import DropdownComponent from '../components/DropdownComponent';

const HealthStatus = () => {
    const navigation = useNavigation();
    const profileImage = useSelector((state) => state.profile.profileImage);

    const handleNext = () => {
        navigation.navigate(LifeStyle)
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

                    <Image source={profileImage} height={10} width={10} alt='dummy-profile' className='w-14 h-14 rounded-full border-2 border-blue1 ' />

                </View>

                <View className='mt-[4%] flex gap-2'>
                    <Text className='text-white font-extrabold font-poppinsBold text-4xl'>Your  Health  Status</Text>
                </View>

                <View className='flex-1 justify-center w-full'>

                    <CustomInput
                        placeholder="e.g. frequent headache , joint pain  etc"
                        legendText="Symptoms pattern"
                        keyboardType="default"
                        startLeft={true}
                    />
                    <Text className="text-fail text-sm ml-2 ">error</Text>

                    <DropdownComponent
                        label="Sleep Quality"
                        placeholder="Select your sleep quality."
                        onSelect={(val) => console.log('Selected:', val)}
                        startLeft={true}
                        data={sleepQuality}
                    />
                    <Text className="text-fail text-sm ml-2 ">error</Text>


                    <CustomInput
                        placeholder="vegeterian/High protein /Junk food etc"
                        legendText="Diet Type"
                        keyboardType="default"
                        startLeft={true}
                    />
                    <Text className="text-fail text-sm ml-2 ">error</Text>

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

export default HealthStatus