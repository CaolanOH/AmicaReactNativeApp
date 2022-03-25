import {useState} from 'react'
import axios from 'axios'
import { StyleSheet, View, Text,TextInput, TouchableOpacity } from 'react-native';
// React redux
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/user';
// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// colors
import colors from '../config/colors';

const Login = () => {
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
     // useState for login form
    const [form, setForm] = useState({email:"mohche@test.com", password:"secret"})
    
const getData = async (name) => {
  try {
    const value = await AsyncStorage.getItem(`${name}`)
    if(value !== null) {
      console.log(value)
    }
  } catch(e) {
    // error reading value
  }
}
    // save data to local storage
    const storeData = async (name,value) => {
      try {
        await AsyncStorage.setItem(`${name}`, value)
        const value = await getData(name)
        console.log(name)
      } catch (e) {
        // saving error
      }
    }

    // Handle form function
    const handleFormInput = (field, value) => {
        setForm({ 
          ...form,
          [field]: value
        })
      }
      // Submit form function
      const submitForm = async () => { 
          axios.post('http://127.0.0.1:5000/users/login', {
            email: form.email,
            password: form.password
          })
            .then(response => {
              const name= "token"
              storeData(name, response.data.access_token)
              dispatch(login({name: response.data.username, email: response.data.email, access_token: response.data.access_token, auth:true}))

          })
          .catch(err => {
            console.log(err)
          })
        }
      


  return (
      <>
        <Text style={styles.emailLabel} >Email :</Text>
        <TextInput 
        name="email" 
        style={styles.input} 
        keyboardType="default"
        onChangeText={(email) => handleFormInput('email', email)}
        onSubmitEditing={submitForm}
        />
        <Text style={styles.passwordLabel} >Password :</Text>
        <TextInput 
        name="password" 
        style={styles.input} 
        secureTextEntry={true}
        keyboardType="default"
        onChangeText={(password) => handleFormInput('password', password)}
        onSubmitEditing={submitForm}
        />
        <View/>
        <TouchableOpacity style={styles.logInBtn} onPress={submitForm} >
            <Text style={styles.logInBtnText}>LOGIN</Text>
        </TouchableOpacity>

        <View style={styles.signUpView}>
        <Text style={styles.memberText}>Not a member?</Text><TouchableOpacity><Text style={styles.signUptext} >Sign Up Here</Text></TouchableOpacity>
        </View>
</>
  )
}

const styles = StyleSheet.create({
      logInBtn:{
        justifyContent:"center",
        width: "90%",
        height: 64,
        backgroundColor: colors.primary,
        borderRadius: 5,
        marginTop: 40,
        marginLeft: 20
      },
      logInBtnText:{
          fontSize: 20,
          paddingVertical: 18,
          textAlign: 'center',
          fontWeight:"600",
          color:"#ffff"
      },
      inputContainer:{
        alignItems:"center",
      },
      emailLabel: {
        color: colors.label,
        alignContent:"flex-start",
        paddingTop:24,
        marginLeft: 20
      },
      passwordLabel: {
        color: colors.label,
        alignContent:"flex-start",
        marginLeft: 20
      },
      input:{
        backgroundColor: "#ffff",
        width: '90%',
        borderWidth:0.5,
        borderColor: colors.label,
        borderRadius: 5,
        padding:10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20
      },
      signUpView:{
        flexDirection: "row", 
        justifyContent: "flex-end",
        marginTop:56
      },
      memberText:{
        fontSize: 14,
        color: colors.font
      },
      signUptext:{
        fontSize: 14,
        color: colors.primary,
        textDecorationLine: "underline",
        paddingRight: 20,
        paddingLeft: 5
        
      }
});

export default Login