import React from 'react'
// React Native Navigator imports
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Screens
import AmicaScreen from '../screens/AmicaScreen';
import Mood from '../screens/tabs/Mood'
import JournalStack from './JournalStack';
// Components
import Header from '../components/Header';
// Icons
import { Ionicons } from '@expo/vector-icons'; 
// Colors
import colors from '../config/colors';
const HomeStack = () => {
    const BottomTabs = createBottomTabNavigator();
  return (
    <BottomTabs.Navigator initialRouteName="Amica" screenOptions={{tabBarShowLabel: false, activeBackgroundColor: colors.primary}}>
    <BottomTabs.Screen name="Mood" component={Mood} options={{headerTitle: () =>  <Header />,
      tabBarIcon: ({focused}) =>(
       <Ionicons name="bookmark" size={24} color={ focused ? colors.primary : colors.label} />
      )
    }}/>
   <BottomTabs.Screen name="Amica" component={AmicaScreen} options={{headerTitle: () =>  <Header />,
       tabBarIcon: ({focused}) =>(
        <Ionicons name="chatbubbles" size={24} color={ focused ? colors.primary : colors.label} />
       )
     }} />
   <BottomTabs.Screen name="Journal" component={JournalStack}  options={{headerTitle: () =>  <Header />,
      tabBarIcon: ({focused}) =>(
       <Ionicons name="journal" size={24} color={ focused ? colors.primary : colors.label} />
      )
    }} />
   </BottomTabs.Navigator>
  )
}
export default HomeStack

