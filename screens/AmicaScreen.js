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
import colors from "../config/colors"


const AmicaScreen = () => {

const user = useSelector((state) => state.user.value);

// useState for the users current message they want to send
const [currentMessage, setCurrentMessage] = useState("");
// socket.io connection event
socket.on('connect', () =>{
  console.log('React native');
})


// useEffect for displaying messages.
useEffect(() => {
  socket.on("message_received", (data) =>{
      console.log(`Received Message`);
      console.log(data);
      // using spread operator.. look into it. Opens up the array and put the content(data) at the end if array.
      //setMessageList((prevState) => [...prevState, data])
  })
}, [socket])

//Function to send message
const sendMessage = () => {
  if(currentMessage !== ""){
    console.log("Message Sent");
    const messageData = {
      message: currentMessage
    };
    console.log(messageData);
    socket.emit('message_sent', messageData);
  }
}



//Dummy data
const dummyMessages = [
  {
    key: 1,
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
    <SafeAreaView style={styles.container}>
        {/* <View style={item.msgAuthor==="you" ? styles.youMsgContainer:styles.amicaMsgContainer}>
        <View>
          <Text>{item.msgAuthor ==="you"? "You:":"Amica:"}</Text>
          <View style={item.msgAuthor === "you" ? styles.youMsgBox:styles.amicaMsgBox} >
            <Text>{item.message}</Text>
          </View>
          </View>
        </View>
        <View style={styles.youMsgContainer}>
        <View>
          <Text>You :</Text>
          <View style={styles.youMsgBox} >
            <Text>This is a test message for the amica chat message design.</Text>
          </View>
          </View>
        </View> */}
        <FlatList
        keyExtractor={(item) => item.id} 
        data={dummyMessages}
        renderItem={({ item }) => (
          <View style={item.msgAuthor==="you" ? styles.youMsgContainer:styles.amicaMsgContainer}>
          <View>
            <Text>{item.msgAuthor ==="you"? "You:":"Amica:"}</Text>
            <View style={item.msgAuthor === "you" ? styles.youMsgBox:styles.amicaMsgBox} >
              <Text>{item.message}</Text>
              <Text>{item.time}</Text>
            </View>
            </View>
          </View>
      
        )} />
        <View style={styles.chatfooter}>
        <TextInput
          style={styles.messageInput} 
          placeholder='Message...'
          //onChangeText={(message) => setCurrentMessage(message)}
          //onSubmitEditing={() => sendMessage()}
        />
        {/* <Feather name="send" size={24} color="black" /> */}
        </View>
    
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