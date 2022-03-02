import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
const LoginScreen = ({ navigation }) => {
  return (
    <>
    <View style={styles.smiley}>
          <FontAwesome5 name="smile-beam" size={104} color="#333333" />
          <Text style={styles.amicaTextStyle}>Amica</Text>
          <Text>This is where the login form will be</Text>
        </View>
        <View>
        </View>
        
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <View style={styles.logInBtn}>
                  <Text style={styles.logInSignUpBtnText}>Log In</Text>
              </View>
          </TouchableOpacity></>
  )
}

const styles = StyleSheet.create({
    smiley: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    amicaTextStyle: {
      fontSize: 48,
      fontWeight: "600",
      fontStyle:"italic",
      color:"#333333"
    },
    logInBtn:{
      width: "100%",
      height: 70,
      backgroundColor: "#C0ECCC",
    },
    logInSignUpBtnText:{
        fontSize: 24,
        textAlign: 'center',
        fontWeight:"600",
        color:"#333333"
    },
    loginInput:{
        height: 60,
        padding: 8,
        fontSize: 16,
        margin: 12,
        borderWidth: 1,
        padding: 10 
    }
  
  });


export default LoginScreen