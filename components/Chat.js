import {useEffect, useState} from 'react'
import { StyleSheet, Text, View,  TextInput, FlatList } from 'react-native';
import colors from '../config/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../store/chatHistory';


const Chat = ({ socket }) => {
const chatHistory = useSelector((state) =>state.chatHistory.value)
const dispatch = useDispatch();

// useState for the users current message they want to send
const [currentMessage, setCurrentMessage] = useState("");
//Function to send message
const sendMessage = () => {
  if(currentMessage !== ""){
    console.log("Message Sent");
    const messageData = {
      message: currentMessage,
      msgAuthor: "you",
      time: new Date().getHours()+":"+ new Date().getMinutes()
    };
    dispatch(addMessage(messageData))
    console.log(chatHistory)
    socket.emit('msg_from_react', messageData);
  }
}

// useEffect for displaying messages.
useEffect(() => {
  socket.on("msg_from_flask", (data) =>{
      console.log(`Received Message`);
      const messageData = {
        message: data.response,
        msgAuthor: "Amica",
        time: new Date().getHours()+":"+ new Date().getMinutes(),
        context: data.context
      }
      console.log(messageData);
      // using spread operator.. look into it. Opens up the array and put the content(data) at the end if array.
      dispatch(addMessage(messageData))

  })
}, [socket])


    //Dummy data
const dummyMessages = [
    {
      id: 1,
      msgAuthor: "amica",
      message: "Hey, whatsup?",
      time : new Date().getHours()+":"+ new Date().getMinutes()
    },
    {
      id: 2,
      msgAuthor: "you",
      message: "I'm stressed from work",
      time : new Date().getHours()+":"+ new Date().getMinutes()
    },
    {
      id: 3,
      msgAuthor: "amica",
      message: "Okay, lets log this mood !",
      time : new Date().getHours()+":"+ new Date().getMinutes()
    },
    {
      id: 4,
      msgAuthor: "you",
      message: "Sure",
      time : new Date().getHours()+":"+ new Date().getMinutes()
    },
    {
      id: 5,
      msgAuthor: "amica",
      message: "Describe the mood",
      time : new Date().getHours()+":"+ new Date().getMinutes()
    },
    {
      id: 6,
      msgAuthor: "you",
      message: "Stressed",
      time : new Date().getHours()+":"+ new Date().getMinutes()
    },
    {
      id: 7,
      msgAuthor: "And the cause ?",
      message: "And the cause ?",
      time : new Date().getHours()+":"+ new Date().getMinutes()
    },
    {
      id: 8,
      msgAuthor: "you",
      message: "Work",
      time : new Date().getHours()+":"+ new Date().getMinutes()
    },
    {
      id: 9,
      msgAuthor: "amica",
      message: "Hmm, I think I might have something for you. So if something is stressing you out regularly like work this tension can build up day after day. It’s important to have a destressing routine. This can be meditation or a relaxation technique to do when you’re home from work. Want to hear?",
      time : new Date().getHours()+":"+ new Date().getMinutes()
    },
    ]
  return (
<>
    <FlatList
    data={chatHistory}
    renderItem={({ item }) => (
      <View style={item.msgAuthor==="you" ? styles.youMsgContainer:styles.amicaMsgContainer}>
      <View>
        <Text>{item.msgAuthor ==="you"? "You:":"Amica:"}</Text>
        <View style={item.msgAuthor === "you" ? styles.youMsgBox:styles.amicaMsgBox} >
          <Text>{item.message}</Text>
          <Text>{item.time}</Text>
        </View>
        {
          item.context && item.context.length > 0 ? (
            <FlatList
            data={item.context}
            renderItem={({ context }) => (
              <View style={styles.amicaMsgContainer}>
                {console.log("item.context")}
                {console.log(item.context)}
                {console.log("///item.context")}
                {console.log(context)}
                <View>
                  <Text>Amica</Text>
                  <View style={styles.amicaMsgBox} >
                    <Text>{context.response[0]}</Text>
                    <Text>{item.time}</Text>
                  </View>
                </View>
              </View>
            )}/>
          ):(
            <>
            <Text>None</Text>
            </>
          )
        }
        </View>
      </View>
    )} />
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
        backgroundColor: "#ffff",
        paddingVertical: 10,
        paddingHorizontal: 10,    
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        }
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
});

export default Chat