import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons'

const AllCars = ({ navigation }) => {

    return (
        <TouchableOpacity onPress={() => navigation.navigate('NewCar')}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>DODAJ</Text>
                <AntDesign name="pluscircleo" size={18} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 5,
        backgroundColor: '#B2B5B8',
        flexDirection: 'column',
        alignItems: 'center',
        width: '30%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    buttonText: {
        fontSize: 14
    }
})
export default AllCars;