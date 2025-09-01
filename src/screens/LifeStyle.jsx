import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import KeyboardAvoidingContainer from "../components/KeyboardAvoidingContainer";
import Ionicons from "react-native-vector-icons/Ionicons";
import MainContainer from "../components/MainContainer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { alcoholConsumption, colors, smokingHabits } from "../utils/constants";
import CustomInput from "../components/CustomInput";
import DefaultButton from "../components/DefaultButton";
import { updateField } from "../redux/slices/userSlice";
import DropdownComponent from "../components/DropdownComponent";

const LifeStyle = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();
    const routeName = route?.params?.from;

    // Extract lifestyle fields from Redux
    const { image, lifestyle_type, occupation, smoking, alcohol } = useSelector(
        (state) => state.user
    );

    const handleNext = () => {
        if (routeName === "HealthStatus") {
            navigation.navigate("PersonalGoals", { from: "LifeStyle" });
        } else {
            navigation.goBack();
        }
    };

    return (
        <KeyboardAvoidingContainer>
            <MainContainer>
                {/* Header */}
                <View className="flex flex-row items-center justify-between w-full ">
                    <TouchableOpacity
                        className="bg-darkGrey p-2 rounded-full flex items-center justify-center w-12 h-12 "
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons
                            name={"arrow-back-outline"}
                            color={colors.lightText}
                            size={22}
                        />
                    </TouchableOpacity>

                    <Image
                        source={image ? { uri: image } : require("../assets/images/dummy-profile.png")}
                        className="w-12 h-12 rounded-full border-2 border-blue1 "
                    />
                </View>

                {/* Title */}
                <View className="mt-[2%] flex">
                    <Text className="text-white font-extrabold font-poppinsBold text-3xl">
                        Your Lifestyle & Habits
                    </Text>
                </View>

                {/* Form */}
                <View className="flex-1 justify-center w-full">
                    {/* Lifestyle Type */}
                    <CustomInput
                        placeholder="Active / Sedentary"
                        legendText="Lifestyle Habits"
                        keyboardType="default"
                        startLeft={true}
                        value={lifestyle_type || ""}
                        onChangeText={(val) =>
                            dispatch(updateField({ field: "lifestyle_type", value: val }))
                        }
                    />

                    {/* Occupation */}
                    <CustomInput
                        placeholder="Desk Job / Field Work / Student"
                        legendText="Occupation"
                        keyboardType="default"
                        startLeft={true}
                        value={occupation || ""}
                        onChangeText={(val) =>
                            dispatch(updateField({ field: "occupation", value: val }))
                        }
                    />

                    {/* Smoking */}
                    <DropdownComponent
                        label="Smoking Habits"
                        placeholder="Yes / No"
                        startLeft={true}
                        data={smokingHabits}
                        value={smoking}
                        onSelect={(val) => dispatch(
                            updateField({
                                field: "smoking",
                                value: val,
                            })
                        )}
                    />

                    {/* Alcohol */}
                    <DropdownComponent
                        label="Alcohol Consumption"
                        placeholder="Yes / No"
                        startLeft={true}
                        data={alcoholConsumption}
                        value={alcohol}
                        onSelect={(val) => dispatch(
                            updateField({
                                field: "alcohol",
                                value: val,
                            })
                        )}
                    />
                </View>

                {/* Next Button */}
                <DefaultButton fill border onPress={handleNext} title="Submit">
                    Next
                </DefaultButton>
            </MainContainer>
        </KeyboardAvoidingContainer>
    );
};

export default LifeStyle;
