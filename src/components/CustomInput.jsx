import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/colors';

const CustomInput = ({
  placeholder,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry,
  value,
  onChangeText,
  keyboardType = 'default',
}) => {
  return (
    <View className="relative justify-center">
      {/* Left Icon */}
      {leftIcon && (
        <Ionicons
          name={leftIcon}
          size={25}
          color={colors.lightGrey}
          style={{
            position: 'absolute',
            left: 20,
            zIndex: 1,
          }}
        />
      )}

      {/* Input Field */}
      <TextInput
        className="border-blue1 border rounded-full pl-20 pr-12 py-4 text-white text-lg "
        placeholder={placeholder}
        placeholderTextColor={colors.lightGrey}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        keyboardAppearance="default"
      />

      {/* Right Icon */}
      {rightIcon && (
        <TouchableOpacity
          onPress={onRightIconPress}
          style={{
            position: 'absolute',
            right: 20,
            zIndex: 2,
          }}
        >
          <Ionicons
            name={rightIcon}
            size={25}
            color={colors.lightGrey}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomInput;
