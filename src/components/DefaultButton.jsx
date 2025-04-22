import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const DefaultButton = ({ ...props }) => {
    return (
        <TouchableOpacity {...props} className={`rounded-full  ${props?.fill ? 'bg-blue1' : 'bg-black1'}  ${props?.border && 'border border-blue1'}`} onPress={props?.onPress} title={props?.title}>
            <Text className='font-poppinsBold font-bold text-base p-4 text-center text-black1'>{props?.children}</Text>
        </TouchableOpacity>
    )
}

export default DefaultButton;