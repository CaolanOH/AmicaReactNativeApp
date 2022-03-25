import {useEffect, useState} from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
const MoodList = () => {
    const user = useSelector((state) => state.user.value);
    const [moodList, setMoodList] = useState(null)
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/users/mood',{
            headers:{ 'Authorization': `Bearer ${user.access_token}` }
        })
              .then(response => {
                console.log(response.data.moods)
                setMoodList(response.data.moods)
              })
              .catch(err => {
              console.log(`Error: ${err}`)
            })
      }, [])
  return (
   <View>
       <FlatList 
       data={moodList}
       renderItem={({ item }) =>(
            <View>
                <Text>This is the Mood id : {item.id}</Text>
                <Text>This is the user_id :{item.user_id}</Text>
                <Text>This is the Mood : {item.moods}</Text>
                <Text>This is the description : {item.description}</Text>
                <Text>This is the timestamp : {item.timestamp}</Text>
            </View>
       )}
       />
   </View>
  )
}

export default MoodList