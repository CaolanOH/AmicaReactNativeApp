import {useEffect, useState} from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
const JournalList = () => {
    const user = useSelector((state) => state.user.value);
    const [journalList, setJournalList] = useState(null)
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/users/journal',{
            headers:{ 'Authorization': `Bearer ${user.access_token}` }
        })
              .then(response => {
                console.log(response.data.journals)
                setJournalList(response.data.journals)
              })
              .catch(err => {
              console.log(`Error: ${err}`)
            })
      }, [])
  return (
    <View>
    <FlatList 
    data={journalList}
    renderItem={({ item }) =>(
         <View>
             <Text>This is the journal id : {item.id}</Text>
             <Text>This is the user_id ; {item.user_id}</Text>
             <Text>This is the journal body : {item.journal_body}</Text>
             <Text>This is the timestamp : {item.timestamp}</Text>
         </View>
    )}
    />
</View>
  )
}

export default JournalList