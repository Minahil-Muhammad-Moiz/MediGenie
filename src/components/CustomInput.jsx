import React, { useState } from 'react';
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
  onBlur,
  onFocus,
  errorBorder,
  ...props
}) => {
  const [inputBgColor, setInputBgColor] = useState(colors.black1)

  const customOnBlur = (e) => {
    setInputBgColor(colors.black1);
    if (onBlur) onBlur(e); // Notify parent
  };

  const customOnFocus = (e) => {
    setInputBgColor('#262626');
    if (onFocus) onFocus(e); // Notify parent
  };
  
  return (
    <View className="relative justify-center mt-4">
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
        className={`${errorBorder ? "border-fail":"border-blue1"} border rounded-full pl-20 pr-12 py-4 text-white text-base`}
        placeholder={placeholder}
        placeholderTextColor={colors.lightGrey}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        keyboardAppearance="default"
        style={{
          backgroundColor: inputBgColor,
        }}
        onBlur={customOnBlur}
        onFocus={customOnFocus}
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
