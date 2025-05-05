import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/colors';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const DropdownComponent = ({ label = 'Dropdown Label', placeholder = 'Select item', onSelect, errorBorder, startLeft }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View className="w-full mb-4 px-2">
      {/* {(value || isFocus) && (
        <Text className={`absolute left-4 top-0 z-10 bg-white px-1 text-sm ${isFocus ? 'text-blue-500' : 'text-gray-500'}`}>
          {label}
        </Text>
      )} */}

      {label && (
        <View className='pl-6'>
          <Text className='font-poppinsSemiBold' style={{ color: '#fff' }} >{label}</Text>
        </View>
      )}

      <Dropdown
        style={{
          height: 50,
          width: '100%',
          borderWidth: 1,
          backgroundColor: isFocus ? '#262626' : colors.black1,
          borderRadius: 100,
          borderColor:`${errorBorder ? colors.fail : colors.blue1}`,
          paddingLeft:` ${startLeft ? '24px' : '80px'}`,
          paddingRight: '48px',
          paddingVertical: '16px',
          color: "#ffffff",
          fontSize: '16px'
        }}
        placeholderStyle={{ fontSize: 16 }}
        selectedTextStyle={{ fontSize: 16 }}
        inputSearchStyle={{ fontSize: 16, height: 40 }}
        
        iconStyle={{ width: 20, height: 20 }}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder="Search..."
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
            style={{ marginRight: 10 }}
          />
        )}
      />
    </View>
  );
};

export default DropdownComponent;
