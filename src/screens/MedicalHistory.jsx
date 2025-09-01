import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import KeyboardAvoidingContainer from "../components/KeyboardAvoidingContainer";
import Ionicons from "react-native-vector-icons/Ionicons";
import MainContainer from "../components/MainContainer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../utils/constants";
import CustomInput from "../components/CustomInput";
import DefaultButton from "../components/DefaultButton";
import { updateField } from "../redux/slices/userSlice";

const MedicalHistory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const routeName = route?.params?.from;

  // Profile image (still coming from profile slice as in your code)
  const profileImage = useSelector((state) => state.profile.profileImage);

  // Medical history fields from userSlice
  const {
    chronic_conditions,
    current_medications,
    known_allergies,
    family_medical_history,
  } = useSelector((state) => state.user);

  const handleNext = () => {
    if (routeName === "ProfileScreen") {
      navigation.navigate("HealthStatus", { from: "MedicalHistory" });
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
            source={profileImage}
            height={10}
            width={10}
            alt="dummy-profile"
            className="w-12 h-12 rounded-full border-2 border-blue1 "
          />
        </View>

        {/* Title */}
        <View className="mt-[2%] flex gap-2">
          <Text className="text-white font-extrabold font-poppinsBold text-3xl">
            Your Medical History
          </Text>
        </View>

        {/* Inputs */}
        <View className="flex-1 justify-center w-full">
          <CustomInput
            placeholder="e.g. Diabetes or type None"
            legendText="Chronic conditions"
            keyboardType="default"
            startLeft={true}
            value={chronic_conditions || ""}
            onChangeText={(text) =>
              dispatch(updateField({ field: "chronic_conditions", value: text }))
            }
          />

          <CustomInput
            placeholder="e.g. Paracetamol or type 'None'"
            legendText="Current Medication ( if any )"
            keyboardType="default"
            startLeft={true}
            value={current_medications || ""}
            onChangeText={(text) =>
              dispatch(updateField({ field: "current_medications", value: text }))
            }
          />

          <CustomInput
            placeholder="e.g. Penicillin, or type 'None'"
            legendText="Known allergies ( if any )"
            keyboardType="default"
            startLeft={true}
            value={known_allergies || ""}
            onChangeText={(text) =>
              dispatch(updateField({ field: "known_allergies", value: text }))
            }
          />

          <CustomInput
            placeholder="e.g. Asthma, or type 'None'"
            legendText="Family Medical History ( if any )"
            keyboardType="default"
            startLeft={true}
            value={family_medical_history || ""}
            onChangeText={(text) =>
              dispatch(
                updateField({ field: "family_medical_history", value: text })
              )
            }
          />
        </View>

        {/* Submit / Next button */}
        <DefaultButton fill border onPress={handleNext} title="Submit">
          {routeName === "ProfileScreen" ? "Next" : "Save"}
        </DefaultButton>
      </MainContainer>
    </KeyboardAvoidingContainer>
  );
};

export default MedicalHistory;
