import React from 'react';
import { StyleSheet,Text, View, TouchableOpacity } from 'react-native';
import colors from "../config/colors";
import { FontAwesome } from '@expo/vector-icons'; 
import Position from 'react-native/Libraries/Components/Touchable/Position';
import {useRoute} from '@react-navigation/native';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
const Header = () => {
    const screen = useRoute(); 
  return (
    
    <View style={styles.header}>
       <FontAwesome name="cog" size={24} color={colors.label} />
        <View>
            <Text style={styles.headerText}>{screen.name}</Text>
        </View>
        <View>
            <TouchableOpacity style={styles.sosBtn}>
                <Text style={styles.sosText}>S.O.S</Text>
            </TouchableOpacity>
            </View>
    </View>
    
  )
}

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