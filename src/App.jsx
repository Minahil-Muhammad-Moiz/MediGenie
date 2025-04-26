import { View, Text, ImageBackground, StatusBar } from 'react-native'
import React from 'react';
import '../global.css'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './screens/StartScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import EmailVerification from './screens/EmailVerification';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import HomeScreen from './screens/HomeScreen';
import { Provider } from 'react-redux';
import store from './redux/store';


const App = () => {

  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
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
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name='EmailVerification' component={EmailVerification} />
          <Stack.Screen name='ResetPassword' component={ResetPassword} />
          <Stack.Screen name='HomeScreen' component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App