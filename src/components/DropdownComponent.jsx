import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/constants';

// const data = 

const DropdownComponent = ({ label = 'Dropdown Label', placeholder = 'Select item', onSelect, errorBorder, startLeft, data }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View className="w-full mt-2">

      {label && (
        <View className='pl-6'>
          <Text className='font-poppinsSemiBold' style={{ color: '#fff' }} >{label}</Text>
        </View>
      )}

      <Dropdown
        style={{
          height: 36,
          width: '100%',
          borderWidth: 1,
          backgroundColor: isFocus ? '#262626' : colors.black1,
          borderRadius: 100,
          borderColor: errorBorder ? colors.fail : colors.blue1,
          paddingLeft: 24,
          paddingRight: 24,
          zIndex:1,
        }}
        placeholderStyle={{
          fontSize: 16,
          color: colors.lightGrey,
          paddingLeft: startLeft ? 0 : 56,
        }}
        selectedTextStyle={{
          fontSize: 16,
          color: '#ffffff',
          paddingLeft: startLeft ? 0 : 56,
        }}

        containerStyle={{
          // backgroundColor: '#1f1f1f',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#3B82F6',
          marginTop: -10,
          zIndex: -1,
        }}

        itemTextStyle={{
          // color: colors,
          fontSize: 14,
        }}

        itemContainerStyle={{
          paddingHorizontal: 6,
          borderBottomWidth: 1,
          borderBottomColor: '#2c2c2c',
          // marginTop: -12,
          // backgroundColor: colors?.darkGrey,
        }}

        iconStyle={{ width: 20, height: 20 }}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          onSelect && onSelect(item.value);
          setIsFocus(false);
        }}
        renderrightIcon={() => (
          <Ionicons
            name="chevron-down-outline"
            size={20}
            color={isFocus ? '#3B82F6' : '#6B7280'}
          // style={{ marginRight: 10 }}
          />
        )}
      />
    </View>
  );
};

export default DropdownComponent;
