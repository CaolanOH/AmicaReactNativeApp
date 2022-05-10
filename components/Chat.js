// React Imports
import {useEffect, useState, useRef} from 'react'
import axios from 'axios';
// React Native Imports
import { StyleSheet, Text, View,  TextInput, FlatList, Modal, Pressable, ScrollView } from 'react-native';
// Colors Imports
import colors from '../config/colors';
// Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../store/chatHistory';

import moment from 'moment';
// Component Imports
import MoodModal from './modals/MoodModal';
import JournalModal from './modals/JournalModal';
const Chat = ({ socket }) => {
// Redux chat history state
const chatHistory = useSelector((state) =>state.chatHistory.value)
// Redux user state
const user = useSelector((state) =>state.user.value)
// Reduce dispatch
const dispatch = useDispatch();
// Flatlist reference object for displaying messages animation.
const flatListRef = useRef();
// useState for the users current message they want to send
const [currentMessage, setCurrentMessage] = useState("");

//Function to send message
const sendMessage = () => {
  if(currentMessage !== ""){
    console.log("Message Sent");
    const messageData = {
      token:  user.access_token,
      msg: currentMessage,
      is_user: true,
      timestamp: new Date().toISOString()
    };
    dispatch(addMessage(messageData))
    console.log("This is the chat history below")
    console.log(chatHistory)
    socket.emit('msg_from_react', messageData);
  }
}


// useEffect for displaying messages.
useEffect(() => {
  socket.on("msg_from_flask", (data) =>{
      console.log(`Received Message from flask, this is in the useEffect`);
      console.log(data);
      dispatch(addMessage(data))
      console.log("Outputing the chat history below this is in the useEffect")
      console.log(chatHistory.msg)
  })
}, [socket])
  return (
<>
    <FlatList
    ref={flatListRef}
    data={chatHistory}
    keyExtractor={(chatHistory, index) => index.toString()}
    onContentSizeChange={() => flatListRef.current.scrollToEnd({animated: true})}
    renderItem={({ item }) => (
      <View style={item.is_user ? styles.youMsgContainer:styles.amicaMsgContainer}>
      <View>
        <Text style={styles.msgLabel}>{item.is_user ? "You:":"Amica:"}</Text>
        <View style={item.is_user ? styles.youMsgBox:styles.amicaMsgBox} >
          <Text style={item.is_user ? styles.youMsgText:styles.amicaMsgText}>{item.msg}</Text>
          <Text style={item.is_user ? styles.youTime:styles.amicaTime}>{moment(item.timestamp).fromNow()}</Text>
        </View> 
        </View>
        {item.action ?
          item.action == "journal" ? (
              <JournalModal />
          ):(
            <MoodModal />
          ): null
       }
      </View>
    )} 
    />
    <View style={styles.chatfooter}>
    <TextInput
      style={styles.messageInput} 
      placeholder='Message...'
      autoCapitalize = 'none'
      clearButtonMode="always"
      onChangeText={(message) => setCurrentMessage(message)}
      onSubmitEditing={() => sendMessage()}
    />
    </View>
</>
  )
}
// Styles
const styles = StyleSheet.create({
    chatfooter:{
        marginVertical:10,
        alignItems:"center"
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    messageInput:{ 
        width: "90%",
        borderRadius: 5,
        borderWidth:0.5,
        borderColor: colors.label,
        backgroundColor: "#ffff",
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    amicaMsgContainer:{
        marginVertical: 16,
        marginLeft:10
      },
      msgLabel:{
        color: colors.label,
        fontSize:12,
        marginBottom:4,
        marginTop:4
      },
    youMsgContainer:{
        marginRight:10,
        marginLeft: "50%"
      },
    youMsgBox:{
        backgroundColor: colors.primary,
        padding: 5,
        width: "100%",
        borderRadius:5,
      },
      youMsgText:{
        color: colors.background,
        fontSize: 11,
      },
      youTime:{
        color: colors.background,
        fontSize: 10,
        paddingTop:3
      },
      amicaMsgBox: { 
        color: colors.font,
        backgroundColor: colors.secondary,
        padding: 5,
        width: "50%",
        borderRadius:5,
        borderWidth: 0.5,
        borderColor: colors.label
      },
      amicaMsgText:{
        color: colors.font,
        fontSize: 11,
      },
      amicaTime:{
        color: colors.label,
        fontSize: 10,
        paddingTop:3
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      modalBtn:{
        padding: 10,
      },
      modalBtnText:{
        fontSize:10,
        color: colors.primary
      }
});
export default Chat