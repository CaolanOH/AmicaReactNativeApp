// React imports
import {useState} from 'react'
// React Redux imports
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './store/user';
import chatHistoryReducer from './store/chatHistory';
import moodListReducer from './store/moodList';
import journalListReducer from './store/journalList';
// React Native Navigator imports
import { NavigationContainer, DefaultTheme} from '@react-navigation/native';
import AuthStack from './routes/AuthStack';
// Colors
import colors from './config/colors';
// Redux store
const store = configureStore({
    reducer: {
      user: userReducer,
      chatHistory: chatHistoryReducer,
      moodList: moodListReducer,
      journalList: journalListReducer
    }
});
const App = () => {
// Theme to set background of app through react navigation
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};
  return (
    // The Provider wraps around the Navigation Container. Everything inside the Provider can access the redux store and its states.
    <Provider store={store}>
    <NavigationContainer theme={MyTheme}>
        <AuthStack />
    </NavigationContainer>
    </Provider>
  );
}
export default App;
