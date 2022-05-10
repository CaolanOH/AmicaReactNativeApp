import {useEffect, useState} from 'react'
// Axios Import
import axios from 'axios';
// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
// React Native Imports
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
// Journal Model Component Import
import JournalModal from './modals/JournalModal';
import { getJournalList } from '../store/journalList.js';
// Colors Import
import colors from '../config/colors';
// Moment Import
import moment from 'moment';
const JournalList = ({ navigation }) => {
// Redux user state
const dispatch = useDispatch();
const user = useSelector((state) => state.user.value);
const journalList = useSelector((state) => state.journalList.value);
// useState for journal entries
//const [journalList, setJournalList] = useState(null)
// useEffect to receive journal entries
useEffect(() => {
axios.get('http://127.0.0.1:5000/users/journal',{
    headers:{ 'Authorization': `Bearer ${user.access_token}` }
})
.then(response => {
  dispatch(getJournalList({journals: response.data.journals}))
})
.catch(err => {
  console.log(`Error: ${err}`)
})
}, [])

  return (
  <View>
    <JournalModal />
    <FlatList 
    data={journalList}
    renderItem={({ item }) =>(
        <View  >

          <Text style={styles.date} >{moment(item.timestamp).format('dddd Do, MMMM')}</Text>
          <TouchableOpacity  onPress={() => navigation.navigate('JournalEntry', {entry:{id:item.id, user_id:item.user_id, timestamp: item.timestamp, journal_body:item.journal_body}})} >
         <View style={styles.box}>
             <Text style={styles.body}>{item.journal_body.substring(0, 45)+"..."}</Text>
             <Text style={styles.time}>{moment(item.timestamp).format('LT')}</Text>
         </View>
         </TouchableOpacity>
         </View>  
    )}
    />
  </View>
  )
}
// Styles
const styles = StyleSheet.create({
  box:{
    paddingHorizontal: 6,
    marginHorizontal:16,
    backgroundColor: colors.secondary,
    borderBottomColor: colors.label,
    borderBottomWidth: 1,
    
},
date:{
    marginHorizontal:16,
    marginTop:24,
    marginBottom: 8,
    fontSize: 14,
    color: colors.label
},
time:{
    marginVertical: 4,
    fontSize: 11,
    color: colors.label
},
body:{
    fontSize:16,
    marginTop:8,
    marginBottom:2
},
desciption:{
    fontSize:11,
    marginTop:8,
    
},
});

export default JournalList