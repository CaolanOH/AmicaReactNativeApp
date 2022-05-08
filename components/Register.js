import {useState} from 'react'
import axios from 'axios'
import { StyleSheet, View, Text,TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/user';
import colors from '../config/colors';
const Register = ({setIsRegistered}) => {
// useState for register form
const [form, setForm] = useState({})
// useState for validation errors
const [errors, setErrors] = useState({})
// Redux user dispatch
const dispatch = useDispatch();
// Handle form function
const handleFormInput = (field, value) => {
  setForm({ 
    ...form,
    [field]: value
  })
}
// Form Validation Function. Returns variable isValid 
// as true or false depending on whether the form data 
// passes the validation rules.
const validate = () =>{
  const err = {}
  let isValid = true;
  if(!form.username){
      err.username = "Username required"
      isValid = false;
  }
  if(!form.email){
      err.email = "Email required"
      isValid = false;
  }
  if (!/\S+@\S+\.\S+/.test(form.email)) {
      err.email = "Email address is invalid";
      isValid = false;
  }
  if (!form.password) {
      err.password = 'Password is required';
      isValid = false;
  } else if (form.password.length < 6) {
      err.password = 'Password needs to be 8 characters or more';
      isValid = false;
  }
  if (!form.password02) {
      err.password02 = 'Password is required';
      isValid = false;
  } else if (form.password02 !== form.password) {
      err.password2 = 'Passwords do not match';
      isValid = false;
  }
  setErrors(err);
  return isValid      
}
// Submit form function
const submitForm = () => { 
    const isValid = validate(form)
    if (isValid){
    axios.post('http://127.0.0.1:5000/users/register', {
      username: form.username,
      email: form.email,
      password: form.password
    })
      .then(response => {
        dispatch(login({name: response.data.username, email: response.data.email, access_token: response.data.access_token, auth:true}))
    })
    .catch(err => {
      console.log(err)
    })
  }
}
  return (
<>
        <Text style={errors.username ? styles.emailLabelError: styles.emailLabel} >{errors.username ? errors.username:"Username :"}</Text>
        <TextInput 
        name="username" 
        style={errors.username ? styles.inputError:styles.input} 
        keyboardType="default"
        onChangeText={(username) => handleFormInput('username', username)}
        onSubmitEditing={submitForm}
        />
       <Text style={errors.email ? styles.passwordLabelError: styles.passwordLabel} >{errors.email ? errors.email:"Email :"}</Text>
        <TextInput 
        name="email" 
        style={errors.email ? styles.inputError:styles.input} 
        keyboardType="default"
        onChangeText={(email) => handleFormInput('email', email)}
        onSubmitEditing={submitForm}
        />
        <Text style={errors.password ? styles.passwordLabelError: styles.passwordLabel} >{errors.password ? errors.password:"Password :"}</Text>
        <TextInput 
        name="password" 
        style={errors.password ? styles.inputError:styles.input} 
        secureTextEntry={true}
        keyboardType="default"
        onChangeText={(password) => handleFormInput('password', password)}
        onSubmitEditing={submitForm}
        />
        <Text style={errors.password02 ? styles.passwordLabelError: styles.passwordLabel} >{errors.password02 ? errors.password02:"Confirm Password :"}</Text>
        <TextInput 
        name="password02" 
        style={errors.password02 ? styles.inputError:styles.input} 
        secureTextEntry={true}
        keyboardType="default"
        onChangeText={(password02) => handleFormInput('password02', password02)}
        onSubmitEditing={submitForm}
        />
         <TouchableOpacity style={styles.logInBtn} onPress={submitForm} >
            <Text style={styles.logInBtnText}>REGISTER</Text>
        </TouchableOpacity>

        <View style={styles.signUpView}>
        <Text style={styles.memberText}>Already have an account?</Text><TouchableOpacity onPress={()=>setIsRegistered(true)}><Text style={styles.signUptext} >Login Here</Text></TouchableOpacity>
        </View>
</>
  )
}
// Styles
 const styles = StyleSheet.create({
    logInBtn:{
        justifyContent:"center",
        width: "90%",
    
        backgroundColor: colors.primary,
        borderRadius: 5,
        marginTop: 20,
        marginLeft: 20
      },
      logInBtnText:{
          fontSize: 20,
          paddingVertical: 16,
          textAlign: 'center',
          fontWeight:"600",
          color:"#ffff"
      },
      emailLabel: {
        color: colors.label,
        alignContent:"flex-start",
        paddingTop:24,
        marginLeft: 20
      },
      emailLabelError: {
        color: colors.danger,
        alignContent:"flex-start",
        paddingTop:24,
        marginLeft: 20
      },
      passwordLabel: {
        color: colors.label,
        alignContent:"flex-start",
        marginLeft: 20
      },
      passwordLabelError: {
        color: colors.danger,
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
        marginTop: 3,
        marginBottom: 10,
        marginLeft: 20
      },
      inputError:{
        backgroundColor: "#ffff",
        width: '90%',
        borderWidth:0.5,
        borderColor: colors.danger,
        borderRadius: 5,
        padding:10,
        marginTop: 3,
        marginBottom: 10,
        marginLeft: 20
      },
      signUpView:{
        flexDirection: "row", 
        justifyContent: "flex-end",
        marginTop:24
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

 })
export default Register