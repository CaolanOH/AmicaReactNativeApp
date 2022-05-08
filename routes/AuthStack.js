import React from 'react'
// Redux Imports
import { useSelector } from 'react-redux';
// React Native Navigator imports
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import WelcomeScreen from '../screens/WelcomeScreen';
// Navigation Stack
import HomeStack from './HomeStack';
const AuthStack = () => {
// Stack navigator instance for Authentication stack below
const Stack = createNativeStackNavigator();
// Accessing user state from redux for conditional statement below
const user = useSelector((state) => state.user.value);
  return (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    {!user.auth ? (
       <>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      </>
      ):( 
       <>
        <Stack.Screen name="Home" component={HomeStack} />
      </>
    )} 
    </Stack.Navigator>
  )
}
export default AuthStack

