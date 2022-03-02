import React from 'react';
import { StyleSheet,Text, View, TouchableOpacity } from 'react-native';
import colors from "../config/colors";
import { Feather } from '@expo/vector-icons'; 
import Position from 'react-native/Libraries/Components/Touchable/Position';

const Header = () => {
  return (
    
    <View style={styles.header}>
        <Feather name="settings" size={24} color="black" />
        <View>
            <Text style={styles.headerText}>Amica</Text>
        </View>
            <TouchableOpacity style={styles.sosBtn}>
                <Text style={styles.sosText}>S.O.S</Text>
            </TouchableOpacity>
    </View>
    
  )
}

const styles = StyleSheet.create({
    header:{
        width: "100%",
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: colors.background,
    },
    headerText:{
        fontSize: 24,
        fontWeight: "600",
        fontStyle: "italic",
        color: colors.font,
    
    },
    sosBtn:{
        alignItems: "center",
        justifyContent: "center",
        width: 74,
        height: 25,
        backgroundColor: colors.danger,
        borderRadius: 15
    },
    sosText: {
        fontSize: 14,
        color: "#ffff"
    },
    icon:{
        position: "absolute",
        left: 16
    }
})

export default Header