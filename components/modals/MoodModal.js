// Axios Import
import axios from 'axios'
// React Import
import { useState } from 'react';
// React Native Import
import { StyleSheet, Text, View,  TextInput, Modal, Pressable, FlatList, Button } from 'react-native';
// Colors Import
import colors from '../../config/colors';
// Redux Import
import { useSelector, useDispatch } from 'react-redux';
import { addMood } from '../../store/moodList.js';

const MoodModal = () => {
// Redux user state
const user = useSelector((state) => state.user.value);
const dispatch = useDispatch();


// useState to toggle mood modal visibility 
const [modalVisible, setModalVisible] = useState(false);
// moods array for the mood modal
const moods = ['happy','Sad','Excited', 'Nervous', 'Tired', 'Lonely', 'Proud']
// useState to set mood for submission to back end.
const [mood, setMood] = useState({})
// Handle form function
const handleFormInput = (field, value) => {
  setMood({ 
    ...mood,
    [field]: value
  })
}
// Submit form function
const submitForm = () => { 

  axios.post('http://127.0.0.1:5000/users/mood', mood, {
              headers: {
                "Authorization": `Bearer ${user.access_token}`
              }
            })
              .then(response => {
              // setModalVisible(!modalVisible)
              console.log(mood)
              dispatch(addMood(mood))
              setModalVisible(!modalVisible)
            })
              .catch(err => {
              console.log(err)
              })

  

}
  return (
<>
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Mood</Text>
             <FlatList 
             data ={moods}
             renderItem={({ item })=> (
               <View>
                <Button title={item} color={colors.primary} onPress={() => handleFormInput('mood', item)} onSubmitEditing={() => submitForm}/>
               </View>
             )}
             /> 
            <TextInput style={styles.input} onChangeText={(description)=> handleFormInput('description', description)} onSubmitEditing={() => submitForm} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={submitForm}
             
            >
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>
          </View>
        </View>
  </Modal>
  <Pressable
  style={styles.modalBtn}
    onPress={() => setModalVisible(true)}
  >
    <Text style={styles.modalBtnText}>Add Mood</Text>
  </Pressable>
</>
  )
}
// Styles
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
  
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth:0.5,
    borderColor: colors.label,
    padding: 8,
    alignItems: "center",
  },
  textStyle: {
    color: colors.background,
    textAlign: "center"
  },
  button: {
    borderRadius: 5,
    padding: 5,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  modalBtn:{
    marginTop:6,
    alignItems: "center",
    justifyContent: "center",
    width: 74,
    height: 25,
    borderWidth:0.5,
    borderColor: colors.primary,
    borderRadius: 5
  },
  modalBtnText:{
    fontSize:12,
    color: colors.primary
  },
  input:{
    backgroundColor: "#ffff",
        width: '90%',
        borderWidth:0.5,
        borderColor: colors.label,
        borderRadius: 5,
        padding:10
  }
});
export default MoodModal
