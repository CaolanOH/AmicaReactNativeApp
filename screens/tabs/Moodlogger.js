import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
const Moodlogger = () => {
  return (
    <View style={styles.smiley}>
    <FontAwesome5 name="smile-beam" size={104} color="#333333" />
    <Text style={styles.amicaTextStyle}>Amica</Text>
    <Text>This will be the moodlogger tab that will have mood information on it</Text>
  </View>
  )
}


const styles = StyleSheet.create({
    smiley: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    amicaTextStyle: {
      fontSize: 48,
      fontWeight: "600",
      fontStyle:"italic",
      color:"#333333"
    }
});
export default Moodlogger