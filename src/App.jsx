import { View, Text, ImageBackground, StatusBar } from 'react-native'
import React from 'react';
import '../global.css'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './screens/StartScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import EmailVerification from './screens/EmailVerification';


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
      <EmailVerification />
      {/* <Stack.Navigator initialRouteName="GettingStarted"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="GettingStarted" component={StartScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name='EmailVerification' component={EmailVerification} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      </Stack.Navigator> */}
    </NavigationContainer>
  )
}

export default App