
import {useEffect, useState} from 'react'
// Axios Import
import axios from 'axios';
// Redux Import
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import MoodChart from '../../components/MoodChart';
import MoodList from '../../components/MoodList';
import MoodModal from '../../components/modals/MoodModal';
import colors from '../../config/colors';
const Moodlogger = () => {
  const [moodList, setMoodList] = useState(null)
  // Redux user state
//const user = useSelector((state) => state.user.value);
  // useeffect to get moods
// useEffect(() => {
//   axios.get('http://127.0.0.1:5000/users/mood',{
//       headers:{ 'Authorization': `Bearer ${user.access_token}` }
//   })
//   .then(response => {
//       setMoodList(response.data.moods)
//   })
//   .catch(err => {
//       console.log(`Error: ${err}`)
//       })
//   }, [moodList])
  return (
    <SafeAreaView style={{flex:1}}>
      <MoodModal />
      <View style={styles.graphContainer}>
        <MoodChart />
      </View>
        <MoodList/>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1
  },
   graphContainer:{
    // borderWidth:1,
    // borderRadius:5,
    // borderColor: colors.label,
    marginHorizontal:20,
    marginTop:20
   }
});
export default Moodlogger