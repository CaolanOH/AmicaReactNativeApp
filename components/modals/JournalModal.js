// Axios Import
import axios from 'axios';
// React Native Import
import { StyleSheet, Text, View,  TextInput, Modal, Pressable } from 'react-native';
// React Import
import { useState } from 'react';
// Colors Import
import colors from '../../config/colors';
// Redux Import
import { useSelector, useDispatch } from 'react-redux';
import { addJournal } from '../../store/journalList.js';
const JournalModal = () => {
// useState to toggle modal visibility 
const [modalVisible, setModalVisible] = useState(false);
// useState to for journal entries
const [journal, setJournal] = useState({})
// Redux user state
const user = useSelector((state) => state.user.value);
const dispatch = useDispatch();
// Handle form function
const handleFormInput = (field, value) => {
  setJournal({ 
    ...journal,
    [field]: value
  })
}
// Submit form function
const submitForm = () => { 
       
  axios.post('http://127.0.0.1:5000/users/journal', journal, {
     headers: {
      "Authorization": `Bearer ${user.access_token}`
    }
    })
    .then(response => {
      dispatch(addJournal(journal))
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
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Add a journal entry</Text>
              <TextInput  style={styles.input} multiline numberOfLines={4} onChangeText={(journal_body)=> handleFormInput('journal_body', journal_body)} onSubmitEditing={() => submitForm} />
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
      <Text style={styles.modalBtnText}>Add Journal</Text>
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
export default JournalModal