import {useState, useEffect} from 'react'
import { SafeAreaView,StyleSheet, Text, View,StatusBar, TouchableOpacity, TextInput, Platform, FlatList } from 'react-native';
// Redux useSelector
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../store/chatHistory';
// Socket.IO client
import io from 'socket.io-client'
//Creating isntance of socket io client

//importing colors for styling
import colors from "../config/colors";
// importing components
import Chat from '../components/Chat';  

const AmicaScreen = () => {

  const user = useSelector((state) => state.user.value);
  const chat = useSelector((state)=> state.chatHistory.value);
  const dispatch = useDispatch();
  // io.set('Authorization', (handshake, callback) => {
  //   handshake.test = "Testing123";
  //   callback(null, true);
  // });

  // const socket = io.connect('http://127.0.0.1:5000')


  const socket = io.connect('http://127.0.0.1:5000', {
  extraHeaders: {
    Authorization: `Bearer ${user.access_token}`
  }
})

// const user = useSelector((state) => state.user.value);




// socket.io connection event
socket.on('connect', () =>{
  console.log('Connected to Flask app');
  //socket.emit('get_chat_log', user.access_token)
  //socket.on('chat_log_from_flask', (data)=>{
    //console.log("////// Below this is chat history from db //////")
    //console.log(data)
    // dispatch(addMessage(data))
    // console.log("////// Redux chat history //////")
    // console.log(chat.value)
  //})
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

      backgroundColor: colors.background,
      justifyContent: "flex-end",
      paddingTop: Platform.OS ==="android" ? StatusBar.currentHeight: 0,
    }
    });

export default AmicaScreen