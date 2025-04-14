import { View, Text, ImageBackground, StatusBar } from 'react-native'
import React from 'react';
import '../global.css'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './pages/StartScreen';
import LoginScreen from './pages/LoginScreen';
import SignUpScreen from './pages/SignUpScreen';


const App = () => {

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        barStyle="dark-content"
        showHideTransition="fade"
        hidden={true}
      />
      <Stack.Navigator initialRouteName="GettingStarted"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="GettingStarted" component={StartScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App