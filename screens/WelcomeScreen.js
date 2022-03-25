import { StyleSheet, Text, View,StatusBar, Platform,ImageBackground } from 'react-native';
// Components
import Login from '../components/Login'
// colors
import colors from "../config/colors"


const WelcomeScreen = (props) => {

  return (
       <>
         <ImageBackground
         style={styles.container} 
          source={require("../assets/WelcomeImg.jpg")}
         >
        <Text style={styles.amica}>Amica.</Text>
        <View style={{height:'50%', width:'100%',borderRadius:15, backgroundColor:'white', }}>
        <Login/>
        </View> 
         </ImageBackground>
        </>
  )
}

const styles = StyleSheet.create({
  img:{
    flex:2,
  },
   container: {
     flex: 1,
     justifyContent: 'flex-end',
     paddingTop: Platform.OS ==="android" ? StatusBar.currentHeight: 0,
     alignItems:'center'
   },
   amica:{
    fontSize: 40,
    fontWeight: "600",
    letterSpacing: 1,
    color: colors.primary,
    position: "absolute",
    top:150,
   }
  });

export default WelcomeScreen