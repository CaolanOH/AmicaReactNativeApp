import {useEffect, useState} from 'react'
import axios from 'axios';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import JournalList from '../../components/JournalList';
const Journal = ({ navigation }) => {
  return (
    <SafeAreaView>
        <JournalList navigation={navigation}/>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({

});
export default Journal