import { View } from 'react-native'
import React from 'react'
import styled from 'styled-components'
import { colors } from '../utils/colors'

const StyledView = styled.View`
    flex: 1;
    padding: 30px;
    backgroundColor: ${colors.black1};
`
export default function MainContainer(props) {
    return (
        <StyledView {...props}>{props.children}</StyledView>
    )
}
