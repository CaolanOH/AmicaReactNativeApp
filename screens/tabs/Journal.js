import {useEffect, useState} from 'react'
import axios from 'axios';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import JournalList from '../../components/JournalList';
const Journal = () => {
  return (
    <SafeAreaView>
        <JournalList/>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({

});
export default Journal