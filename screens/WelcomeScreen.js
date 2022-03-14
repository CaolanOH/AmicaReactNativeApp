import {useState, useEffect } from 'react'
// axios for api requests
import axios from 'axios'
import { SafeAreaView, TextInput, StyleSheet, Text, View,TouchableOpacity,StatusBar, Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
// React redux useDispatch hook login action from redux
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/user';
// colors
import colors from "../config/colors"

const WelcomeScreen = (props) => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  // useState for login form
  const [form, setForm] = useState({email:"mohche@test.com", password:"secret"})
  // Handling user email
  const handleFormInput = (field, value) => {
    setForm({ 
      ...form,
      [field]: value
    })
    console.log(form)
  }
  // const handleEmailChange = email =>{
  //     setForm({ 
  //       ... form,
  //       email: email
  //     })
  //     console.log(form)
  // }  
  // //Handling User Password
  // const handlePasswordChange = password =>{
  //     setForm({ 
  //       ... form,
  //       password
  //     })
  //     console.log(form)
  // }  
  console.log(user)
  // Submitting user information to axios post request
  const submitForm = () => { 
    console.log(`You just submitted heres the email: ${form.email} and heres the password ${form.password}`)

      axios.post('http://127.0.0.1:5000/users/login', {
        email: form.email,
        password: form.password
      })
        .then(response => {
          console.log({
            "username":response.data.username,
            "email":response.data.email,
            "access_token":response.data.access_token
          })
          // props.onAuthenticated(true, response.data.auth_token)
          dispatch(login({name:response.data.username, email:form.email, access_token:response.data.access_token, auth:true}))
         
      })
      .catch(err => {
        console.log(err)
        // console.log(err.response)
      })
    }
  return (
        <>
        <SafeAreaView style={styles.container}>
          {/* Aica text and emoji */}
          <View style={styles.smiley}>
                <FontAwesome5 name="smile-beam" size={104} color="#333333" />
                <Text style={styles.amicaTextStyle}>Amica</Text>
          </View>
          {/* Email label */}
          <View>
            <Text style={styles.inputLabel} >Email :</Text>
          </View>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <TextInput 
              name="email" 
              style={styles.input} 
              keyboardType="default"
              onChangeText={(email) => handleFormInput('email', email)}
              onSubmitEditing={submitForm}
              />
          </View>
          {/* Password label */}
          <View>
            <Text style={styles.inputLabel} >Password :</Text>
          </View>
          {/* Password Input */}
          <View style={styles.inputContainer}>
            <TextInput 
              name="password" 
              style={styles.input} 
              secureTextEntry={true}
              keyboardType="default"
              onChangeText={(password) => handleFormInput('password', password)}
              onSubmitEditing={submitForm}
            />
              </View>
              {/* Login button */}
              <View style={{flex:3}}>
              <TouchableOpacity style={{alignItems:"center"}}>
                <View style={styles.logInBtn}>
                  <Text onPress={submitForm} style={styles.logInBtnText}>LOGIN</Text>
                </View>
              </TouchableOpacity>
              </View>
              {/* Sign Up button */}
              <View style={{flex:1}}>
              <View style={{ flexDirection: "row", justifyContent: "flex-end"}}>
                <Text style={styles.memberText}>Not a member?</Text><TouchableOpacity><Text style={styles.signUptext} >Sign Up Here</Text></TouchableOpacity>
              </View>
              </View>
          </SafeAreaView>
        </>
  )
}

const styles = StyleSheet.create({
  red:{
    backgroundColor: "red"
  },
   container: {
     flex: 1,
     backgroundColor: colors.background,
     paddingTop: Platform.OS ==="android" ? StatusBar.currentHeight: 0,
   },
    smiley: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center'
    },
    amicaTextStyle: {
      fontSize: 48,
      fontWeight: "600",
      fontStyle:"italic",
      color: colors.font
    },
    logInBtn:{
      width: "90%",
      height: 64,
      backgroundColor: colors.primary,
      borderRadius: 5,
      marginTop: 60
    },
    logInBtnText:{
        fontSize: 24,
        paddingVertical: 18,
        textAlign: 'center',
        fontWeight:"600",
        color:"#ffff"
    },
    inputContainer:{
      alignItems:"center",
    },
    inputLabel: {
      color: colors.font,
      alignContent:"flex-start",
      marginLeft: 20,
    },
    input:{
      backgroundColor: "#ffff",
      width: '90%',
      borderRadius: 5,
      padding:10,
      marginTop: 10,
      marginBottom: 10,
      justifyContent: "space-around",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    memberText:{
      fontSize: 14,
      color: colors.font
    },
    signUptext:{
      fontSize: 14,
      color: colors.primary,
      textDecorationLine: "underline",
      paddingRight: 10,
      paddingLeft: 5
      
    }
    
  });

export default WelcomeScreen