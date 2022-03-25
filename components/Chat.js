import {useEffect, useState} from 'react'
import { StyleSheet, Text, View,  TextInput, FlatList } from 'react-native';
import colors from '../config/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../store/chatHistory';
import user from '../store/user';
import moment from 'moment';

const Chat = ({ socket }) => {
  const chatHistory = useSelector((state) =>state.chatHistory.value)
  const user = useSelector((state) =>state.user.value)
  const dispatch = useDispatch();

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
      timestamp: new Date().toISOString(),
      context:""
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
      // using spread operator.. look into it. Opens up the array and put the content(data) at the end if array.
      dispatch(addMessage(data))
      console.log("Outputing the chat history below this is in the useEffect")
      console.log(chatHistory.msg)

  })
}, [socket])



  return (
<>
    <FlatList
    data={chatHistory}
    renderItem={({ item }) => (
      <View style={item.is_user ? styles.youMsgContainer:styles.amicaMsgContainer}>
      <View>
        <Text style={styles.msgLabel}>{item.is_user ? "You:":"Amica:"}</Text>
        <View style={item.is_user ? styles.youMsgBox:styles.amicaMsgBox} >
          <Text style={item.is_user ? styles.youMsgText:styles.amicaMsgText}>{item.msg}</Text>
          <Text style={item.is_user ? styles.youTime:styles.amicaTime}>{item.timestamp}</Text>
        </View> 
        </View>
        {item.context && item.context.length > 0 ? (
              <View>
                <Text style={styles.msgLabel}>Amica</Text> 
                <View style={styles.amicaMsgBox} >
                  <Text style={styles.amicaMsgText}>{item.context[1].response}</Text>
                  <Text style={styles.amicaTime}>{item.timestamp}</Text>
                </View>
              </View>
       ):(
          <>
          <Text>None</Text>
          </>
        )}
      </View>
    )} 
    />
    <View style={styles.chatfooter}>
    <TextInput
      style={styles.messageInput} 
      placeholder='Message...'
      onChangeText={(message) => setCurrentMessage(message)}
      onSubmitEditing={() => sendMessage()}
    />
    {/* <Feather name="send" size={24} color="black" /> */}
    </View>
</>
  )
}

const styles = StyleSheet.create({
    chatfooter:{
        marginVertical:10,
        alignItems:"center"
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
       //flexDirection:"row-reverse"
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
      }
});

export default Chat