import { View } from 'react-native'
import React from 'react'
// import styled from 'styled-components'
// import { colors } from '../utils/colors'

// const StyledView = styled.View`
//     flex: 1;
//     padding: 30px;
//     backgroundColor: ${colors.black1};

export default function MainContainer(props) {
    // <StyledView {...props}>{props.children}</StyledView>
    return (
        <View className='flex-1 p-7 bg-black1'>{props.children}</View>
    )
}
 