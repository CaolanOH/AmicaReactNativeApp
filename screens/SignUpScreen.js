import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
const SignUpScreen = ({ navigation }) => {
  return (
    <><View style={styles.smiley}>
    <FontAwesome5 name="smile-beam" size={104} color="#333333" />
    <Text style={styles.amicaTextStyle}>Amica</Text>
    <Text >This is where the sign up form will be</Text>
    </View>
    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <View style={styles.signUpBtn}>
            <Text style={styles.logInSignUpBtnText}>Sign Up</Text>
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
    signUpBtn:{
      width: "100%",
      height: 70,
      backgroundColor: "#A5C8E4"
    },
    logInSignUpBtnText:{
        fontSize: 24,
        textAlign: 'center',
        fontWeight:"600",
        color:"#333333"
    },
  
  });

export default SignUpScreen