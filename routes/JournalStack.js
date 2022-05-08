import React from 'react'
// React Native Navigator imports
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import Journal from '../screens/tabs/Journal';
import JournalEntry from '../screens/JournalEntry';
// Navigation Stack
import Header from '../components/Header';
const JournalStack = () => {
// Stack Navigator journal screens
const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="JournalScreen" component={Journal} options={{headerTitle: () =>  <Header />}} />
    <Stack.Screen name="JournalEntry"  component={JournalEntry} options={{headerTitle: () =>  <Header />}} />
  </Stack.Navigator>
  )
}
export default JournalStack

