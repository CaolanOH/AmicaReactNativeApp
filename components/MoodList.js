import {useEffect, useState} from 'react'
// Axios Import
import axios from 'axios';
// Redux Import
import { useDispatch, useSelector } from 'react-redux';
// React Native Imports
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
// Colors Import
import colors from '../config/colors';
// Moment Import
import moment from 'moment';
import { addMood, getMoodList } from '../store/moodList.js';


const MoodList = ({ moods }) => {
// Redux user state
const dispatch = useDispatch();
const user = useSelector((state) => state.user.value);
const moodList = useSelector((state) => state.moodList.value);

// useState for moods
// const [moodList, setMoodList] = useState(null)


// // useeffect to get moods
 useEffect(() => {
    axios.get('http://127.0.0.1:5000/users/mood',{
        headers:{ 'Authorization': `Bearer ${user.access_token}` }
    })
    .then(response => {
      dispatch(getMoodList({moods: response.data.moods}))

      console.log(state.value);
    })
    .catch(err => {
        console.log(`Error: ${err}`)
        })

    
 }, [])

return (
   <View>
       <FlatList  
       data={moodList}
       keyExtractor={(moodList, index) => index.toString()}
       renderItem={({ item }) =>(
           <View>
               <Text style={styles.date}>{moment(item.timestamp).format('dddd Do, MMMM')}</Text>
            <View style={styles.box}>
                <Text style={styles.mood}>{item.moods}</Text>
                <Text>{item.description}</Text>
                <Text style={styles.time}>{moment(item.timestamp).format('LT')}</Text>
            </View>
        </View>
       )}
       />
   </View>
  )
}
// Styles
const styles = StyleSheet.create({
    box:{
        paddingHorizontal:4,
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
        marginVertical: 8,
        fontSize: 11,
        color: colors.label
    },
    mood:{
        fontSize:16,
        marginTop:8,
        marginBottom:4
    },
    desciption:{
        fontSize:11,
        marginTop:8,
        
    },
  
});

export default MoodList