import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import KeyboardAvoidingContainer from "../components/KeyboardAvoidingContainer";
import Ionicons from "react-native-vector-icons/Ionicons";
import MainContainer from "../components/MainContainer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { colors, sleepQuality } from "../utils/constants";
import CustomInput from "../components/CustomInput";
import DefaultButton from "../components/DefaultButton";
import DropdownComponent from "../components/DropdownComponent";
import { updateField } from "../redux/slices/userSlice";

const HealthStatus = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const routeName = route?.params?.from;

  // Extract user data from Redux
  const { image, symptom_pattern, sleep_quality, diet_type } = useSelector(
    (state) => state.user
  );

  const handleNext = () => {
    if (routeName === "MedicalHistory") {
      navigation.navigate("LifeStyle", { from: "HealthStatus" });
    } else {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingContainer>
      <MainContainer>
        {/* Header */}
        <View className="flex flex-row items-center justify-between w-full">
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
            Your Health Status
          </Text>
        </View>

        {/* Form */}
        <View className="flex-1 justify-center w-full gap-1">
          {/* Symptom Pattern */}
          <CustomInput
            placeholder="E.g. frequent headache , joint pain etc"
            legendText="Symptoms pattern"
            keyboardType="default"
            startLeft={true}
            value={symptom_pattern || ""}
            onChangeText={(val) =>
              dispatch(updateField({ field: "symptom_pattern", value: val }))
            }
          />

          {/* Sleep Quality */}
          <DropdownComponent
            label="Sleep Quality"
            placeholder="Select your sleep quality."
            startLeft={true}
            data={sleepQuality}
            value={sleep_quality || ""}
            onSelect={(val) =>
              dispatch(updateField({ field: "sleep_quality", value: val }))
            }
          />

          {/* Diet Type */}
          <CustomInput
            placeholder="Vegetarian / High protein / Junk food etc"
            legendText="Diet Type"
            keyboardType="default"
            startLeft={true}
            value={diet_type || ""}
            onChangeText={(val) =>
              dispatch(updateField({ field: "diet_type", value: val }))
            }
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

export default HealthStatus;
