import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import KeyboardAvoidingContainer from "../components/KeyboardAvoidingContainer";
import Ionicons from "react-native-vector-icons/Ionicons";
import MainContainer from "../components/MainContainer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { availableTags, colors } from "../utils/constants";
import DefaultButton from "../components/DefaultButton";
import { updateField } from "../redux/slices/userSlice";

const PersonalGoals = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const profileImage = useSelector((state) => state.user.image);
  const selectedTags = useSelector((state) => state.user.personal_goals || []);

  const toggleTag = (tag) => {
    let updated;
    if (selectedTags.includes(tag.value)) {
      updated = selectedTags.filter((t) => t !== tag.value);
    } else {
      updated = [...selectedTags, tag.value];
    }
    // update Redux state
    dispatch(updateField({ field: "personal_goals", value: updated }));
  };

  const routeName = route?.params?.from;

  const handleNext = () => {
    if (routeName === "LifeStyle") {
      navigation.reset({
        index: 0,
        routes: [{ name: "MainScreen", from: "PersonalGoals" }],
      });
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
            source={
              profileImage
                ? { uri: profileImage }
                : require("../assets/images/dummy-profile.png")
            }
            className="w-12 h-12 rounded-full border-2 border-blue1 "
          />
        </View>

        {/* Title */}
        <View className="mt-[2%] flex ">
          <Text className="text-white font-extrabold font-poppinsBold text-3xl">
            Your Goals Tag
          </Text>
        </View>

        {/* Tags */}
        <View className="flex-1 justify-center w-full">
          <View className="flex-row flex-wrap gap-2 mb-10">
            {availableTags.map((tag) => {
              const isSelected = selectedTags.includes(tag.value);
              return (
                <TouchableOpacity
                  key={tag.value}
                  onPress={() => toggleTag(tag)}
                  className={`${
                    isSelected ? "bg-blue1" : "bg-darkGrey"
                  } rounded-xl p-2`}
                >
                  <Text
                    style={{
                      color: isSelected ? colors.black1 : colors.lightText,
                      fontWeight: "600",
                    }}
                  >
                    {tag.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Submit */}
        <DefaultButton fill border onPress={handleNext} title="Submit">
          Submit
        </DefaultButton>
      </MainContainer>
    </KeyboardAvoidingContainer>
  );
};

export default PersonalGoals;
