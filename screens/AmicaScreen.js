import {useState, useEffect} from 'react'
import { SafeAreaView,StyleSheet, Text, View,StatusBar, TouchableOpacity, TextInput, Platform, FlatList } from 'react-native';
// Redux useSelector
import { useSelector } from 'react-redux';
// Socket.IO client
import io from 'socket.io-client'
//Creating isntance of socket io client
const socket = io.connect('http://127.0.0.1:5000')
// Feather Icon
import { Feather } from '@expo/vector-icons'; 
//importing colors for styling
import colors from "../config/colors";
// importing components
import Chat from '../components/Chat';

const AmicaScreen = () => {



// socket.io connection event
socket.on('connect', (chatHistory) =>{
  console.log('Connected to Flask app');

})





//Dummy data
  return (
  <>
    <SafeAreaView style={styles.container}>
    <Chat socket={socket} />
    </SafeAreaView>
      </>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      bottom: 30,
      backgroundColor: colors.background,
      justifyContent: "flex-end",
      paddingTop: Platform.OS ==="android" ? StatusBar.currentHeight: 0,
    },

    chatfooter:{
      marginVertical:10,
      alignItems:"center"
    },
    messageInput:{ 
      width: "90%",
      borderRadius: 5,
      backgroundColor: "#ffff",
      paddingVertical: 10,
      paddingHorizontal: 10,    
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    amicaMsgContainer:{
      marginVertical: 16,
      marginLeft:10
     //flexDirection:"row-reverse"
    },
    youMsgContainer:{
      marginRight:10,
      marginLeft: "50%"
    },
    amicaMsgBox: { 
      color: colors.font,
      backgroundColor: colors.primary,
      padding: 5,
      width: "50%",
      borderRadius:5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    youMsgBox:{
      color: colors.font,
      backgroundColor: colors.secondary,
      padding: 5,
      width: "100%",
      borderRadius:5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      
    },
    });

export default AmicaScreen