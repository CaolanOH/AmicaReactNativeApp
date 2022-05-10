// React Import
import React from 'react';
// React Native Imports
import { StyleSheet,Text, View, TouchableOpacity, Alert } from 'react-native';
// Colors Imports
import colors from "../config/colors";
// Icon Imports
import { FontAwesome } from '@expo/vector-icons'; 
// React Navigation Imports
import {useRoute, useNavigation} from '@react-navigation/native';
import { logout } from '../store/user';
import { useDispatch, useSelector } from 'react-redux';
const Header = () => {
// getting current screen / route information
const screen = useRoute();
// React Navigation, navigation instance
const navigation = useNavigation(); 

const dispatch = useDispatch();
  return (
<View style={styles.header}>
    {screen.name === "JournalEntry" ? (
        <TouchableOpacity onPress={()=>navigation.navigate('JournalEntry')}>
        <FontAwesome name="arrow-left" size={24} color={colors.label} />
        </TouchableOpacity>
    ):(
        
        <TouchableOpacity onPress={() =>dispatch(logout())}>
        <FontAwesome name="cog" size={24} color={colors.label} />
        </TouchableOpacity>
        
    )}
    <View>
        <Text style={styles.headerText}>{screen.name}</Text>
    </View>
    <View>
        <TouchableOpacity style={styles.sosBtn} onPress={()=>Alert.alert("Emergency information","Emergency services : 112 or 999\nSemaritans : 116 123\nAware : 1800 80 48 48\nPieta House : 1800 247 247")}>
            <Text style={styles.sosText}>S.O.S</Text>
        </TouchableOpacity>
    </View>
</View>
    
  )
}
// Styles
const styles = StyleSheet.create({
    header:{
        width: "100%",
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.background,
    },
    headerText:{
        fontSize: 33,
        fontWeight: "600",
        color: colors.primary,
    
    },
    sosBtn:{
        alignItems: "center",
        justifyContent: "center",
        width: 47,
        height: 25,
        backgroundColor: colors.danger,
        borderRadius: 5
    },
    sosText: {
        fontSize: 12,
        color: "#ffff"
    },
  
})

export default Header