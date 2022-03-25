// React imports
import {useState} from 'react'
// React Redux imports
import { Provider, useSelector } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './store/user';
import chatHistoryReducer from './store/chatHistory';

// Async Storage imports
import AsyncStorage from '@react-native-async-storage/async-storage';
// React Native Navigator imports
import { NavigationContainer, DefaultTheme} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Screens
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import AmicaScreen from './screens/AmicaScreen';
import Mood from './screens/tabs/Mood';
import Journal from './screens/tabs/Journal';
// Components
import Header from './components/Header';
// React native
import { View, StyleSheet } from 'react-native';
// Colors
import colors from './config/colors';
// Icons
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 



// Redux store that holds the redux reducers
const store = configureStore({
    reducer: {
      user: userReducer,
      chatHistory: chatHistoryReducer
    }
});


const App = () => {
// const stateUser = useSelector((state) => state.user.value);
// Stack Navigator for all of application
const Stack = createNativeStackNavigator();
// Tab navigator for main features
const BottomTabs = createBottomTabNavigator();
// User Authentication useState for 
const [authenticated, setAuthenticated] = useState(false)
// Function to check users authenticated state. Depending on state then save or remove JWT Token from local storage
const onAuthenticated = async (auth, token) =>{
  setAuthenticated(auth)
  if(authenticated){
    try{
      await AsyncStorage.setItem('@token', token)
    } catch (e){
      console.log(e)
    }
  } else {
    try{
      await AsyncStorage.removeItem('@token')
    } catch (e) {
      console.log(e)
    }
  }
}


// Theme to set background of app through react navigation
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};



// Function tabs to return the tab navigator that is passed as children to..
 const tabs = () => {
   return <BottomTabs.Navigator screenOptions={{tabBarShowLabel: false, activeBackgroundColor: colors.primary}}>
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
          <BottomTabs.Screen name="Journal" component={Journal}  options={{headerTitle: () =>  <Header />,
             tabBarIcon: ({focused}) =>(
              <Ionicons name="journal" size={24} color={ focused ? colors.primary : colors.label} />
             )
           }} />
          </BottomTabs.Navigator>

 }
// Function tabs to return the tab navigator that is passed as children to..
  const tabs02 = () => {
                return <BottomTabs.Navigator screenOptions={{
                  tabBarShowLabel: false,
                  activeBackgroundColor: colors.background,
                  tabBarStyle: {
                    backgroundColor: "#ffff",
                    bottom: 30,
                    marginHorizontal: 20,
                    //Max height
                    height: 60,
                    borderRadius: 5,
                    // Shadow
                    shadowColor:"#000",
                    shadowOpacity: 0.06,
                    shadowOffset:{
                      width: 0,
                      height: 1,
                    }
                  }
                }}>
                        <BottomTabs.Screen name="MoodLog" component={MoodLogger} options={{
                          tabBarIcon: ({focused}) => (
                            <View style={{ position: "absolute", top:"50%"}}>
                             <Ionicons name="bookmark" size={24} color={ focused ? colors.danger : colors.font} />
                            </View>
                          )
                        }} />
                        <BottomTabs.Screen name="Amica" component={AmicaScreen} 
                          options={{
                            headerTitle: () =>  <Header />,
                            activeBackgroundColor: colors.background,
                            tabBarIcon: ({focused}) => (
                              <View style={{ position: "absolute", top:"50%"}}>
                                <FontAwesome5 name="smile-beam" size={24} color={ focused ? colors.danger : colors.font} />
                              </View>
                            )
                          }}
                        />
                        <BottomTabs.Screen name="Journal" component={Journal} 
                          options={{
                            tabBarIcon: ({focused}) => (
                              <View style={{ position: "absolute", top:"50%"}}>
                                <Feather name="book-open" size={24} color={ focused ? colors.danger : colors.font} />
                              </View>
                            )
                          }}
                        />
                        </BottomTabs.Navigator>
  }  


  const Authentication = () => {
    const user = useSelector((state) => state.user.value);

    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
      {!user.auth ? (
         <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </>
        ):( 
         <>
          <Stack.Screen name="Home"  children={tabs} />
        </>
      )} 
      </Stack.Navigator>
    );
  }

  return (
    <Provider store={store}>
    <NavigationContainer theme={MyTheme}>
        <Authentication />
    </NavigationContainer>
    </Provider>
  );
}


export default App;
