import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/constants';
import { Text } from '@react-navigation/elements';

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
  legendText,
  startLeft,
  minLength,
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
    <View className='justify-center mt-4'>
      {legendText && (
        <View className='pl-6'>
          <Text className='font-poppinsSemiBold' style={{ color: '#fff' }} >{legendText}</Text>
        </View>
      )}
      <View className="relative flex flex-row  items-center justify-stretch">
        {/* Left Icon */}
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={22}
            color={colors.lightGrey}
            style={{
              position: 'absolute',
              left: 20,
              // top: '50%',
              zIndex: 1,
            }}
          />
        )}
        {/* Input Field */}
        <TextInput
          className={`${errorBorder ? "border-fail" : "border-blue1"} border rounded-full w-full ${startLeft ? 'pl-6' : 'pl-20'}  pr-12 py-2 text-white text-base`}
          placeholder={placeholder}
          placeholderTextColor={colors.lightGrey}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          keyboardAppearance="default"
          minLength={minLength}
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
              size={22}
              color={colors.lightGrey}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>

  );
};

export default CustomInput;
