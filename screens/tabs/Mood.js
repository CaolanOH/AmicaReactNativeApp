import React from 'react'
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import MoodChart from '../../components/MoodChart';
import MoodList from '../../components/MoodList';
import MoodModal from '../../components/modals/MoodModal';
import colors from '../../config/colors';
const Moodlogger = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      {/* <MoodModal /> */}
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
    marginHorizontal:16,
    marginTop:20
   }
});
export default Moodlogger