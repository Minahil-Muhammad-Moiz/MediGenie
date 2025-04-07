import { View, Text, ImageBackground } from 'react-native'
import React from 'react';
import '../global.css'

const App = () => {
  const imageURI = require('./assets/plusSign.jpg')
  return (
    <ImageBackground source={imageURI} className='flex-1'>
      {/* <View> */}
      <Text className='text-white'>TEST APP</Text>
      <Text className='text-white'>TEST APP</Text>
      <Text className='text-white'>TEST APP</Text>
      {/* </View> */}
    </ImageBackground>
  )
}

export default App