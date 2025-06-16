import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { colors } from '../utils/constants';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

// Define route names
const homeName = 'Home';
const profileName = 'Profile';
const settingsName = 'Settings';

const TabBar = () => {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === profileName) {
            iconName = focused ? 'person' : 'person-outline';
          } else if (rn === settingsName) {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: colors.blue1,
        tabBarInactiveTintColor: colors.lightGrey,
        tabBarLabelStyle: { paddingBottom: 6, fontSize: 10 },
        tabBarStyle: { padding: 5, height: 60, backgroundColor: '#171717', borderColor: 'white', },
      })}
    >
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={profileName} component={Profile} />
      <Tab.Screen name={settingsName} component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabBar;
