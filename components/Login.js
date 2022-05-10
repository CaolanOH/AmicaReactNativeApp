import {useState} from 'react'
import axios from 'axios'
import { StyleSheet, View, Text,TextInput, TouchableOpacity } from 'react-native';
// React redux
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/user';
// colors
import colors from '../config/colors';
const Login = ({setIsRegistered}) => {
// Redux user state
const user = useSelector((state) => state.user.value);
// Redux dispatch
const dispatch = useDispatch();
 // useState for login form
//  email:"mohche@test.com", password:"secret"
const [form, setForm] = useState({email:"mohche@test.com",password:"secret"})
// useState for validation errors
const [errors, setErrors] = useState({})
// Form Validation Function. Returns variable isValid  
// as true or false depending on whether the form data 
// passes the validation rules.
const validate = () =>{
  const err = {}
  let isValid = true;
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
  } 
  setErrors(err);
  return isValid      
}
// Handle form function
const handleFormInput = (field, value) => {
    setForm({ 
      ...form,
      [field]: value
  })
}
// Submit form function
const submitForm = () => {
  console.log(form) 
  const isValid = validate(form)
  if(isValid){
    axios.post('http://127.0.0.1:5000/users/login', {
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
        <Text style={errors.email? styles.emailLabelError: styles.emailLabel} >{errors.email ? errors.email: "Email :"}</Text>
        <TextInput 
        name="email"
        autoCapitalize = 'none' 
        style={errors.email? styles.inputError:styles.input} 
        keyboardType="default"
        onChangeText={(email) => handleFormInput('email', email)}
        onSubmitEditing={submitForm}
        />
        <Text style={errors.password ? styles.passwordLabelError:styles.passwordLabel} >{errors.password ? errors.password:"Password :"}</Text>
        <TextInput 
        name="password" 
        autoCapitalize = 'none'
        style={errors.password ? styles.inputError:styles.input} 
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
        <Text style={styles.memberText}>Don't have an account?</Text><TouchableOpacity onPress={()=>setIsRegistered(false)}><Text style={styles.signUptext} >Sign Up Here</Text></TouchableOpacity>
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
        marginTop: 10,
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