import { View, Text, ImageBackground } from 'react-native'
import React from 'react';
import '../global.css'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './pages/StartScreen';


const App = () => {

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Getting Started" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Getting Started" component={StartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App