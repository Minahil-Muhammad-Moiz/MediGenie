import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/constants';

const DefaultButton = ({ ...props }) => {
    return (
        <TouchableOpacity {...props} className={`w-full rounded-full ${props?.thinPadding ? 'px-4 py-3' : 'p-4'} ${props?.fill ? 'bg-blue1' : 'bg-black1'}  ${props?.border && 'border border-blue1'} flex-row items-center justify-center gap-2`} onPress={props?.onPress} title={props?.title}>
            <Text className={`font-poppinsBold font-bold text-base  text-center ${props?.textWhite ? 'text-white' : 'text-black1'}`}>{props?.children}</Text>
            {props?.icon ?
                <Ionicons
                    name={props?.icon}
                    color={colors.black1}
                    size={25}
                /> : null}
        </TouchableOpacity>
    )
}

export default DefaultButton;