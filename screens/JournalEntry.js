import React from 'react'
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import colors from '../config/colors';
import moment from 'moment';
const JournalEntry = () => {
// getting the journal entry passed in through the React Navigation screen params
const screen = useRoute();
const entry = screen.params.entry;
  return (
    <SafeAreaView>
        <View style={styles.container}>
            <Text style={styles.date}>{moment(entry.timestamp).format('dddd Do, MMMM')}</Text>
            <Text style={styles.time}>{moment(entry.timestamp).format('LT')}</Text>
            <Text style={styles.body}>{entry.journal_body}</Text>
        </View>
    </SafeAreaView>
  )
}
// Styles
const styles = StyleSheet.create({
  container:{
    paddingTop: 20,
    paddingHorizontal: 16
  },
  date:{
    fontSize:23,
    color: colors.font
  },
  time:{
    marginTop:8,
    fontSize: 12,
    color: colors.label
  },
  body:{
    marginTop:12,
    fontSize:16,
    color: colors.font
  }
});
export default JournalEntry

