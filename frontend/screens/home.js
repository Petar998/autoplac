import React, { useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { UserContext } from "../App";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';


const Home = () => {
    const user = useContext(UserContext);

    const logOut = async () => {
        await AsyncStorage.clear();
        user.setLoggedIn(false);
    }
    return (
        <View style={styles.homeContent}>
            <Text style={styles.homeText}>Dobro došli, {user?.data?.firstName} {user?.data?.lastName}</Text>
            <TouchableOpacity onPress={logOut}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Odjavi se</Text>
                    <MaterialIcons name="logout" size={20} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    homeContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        padding: 5,
        backgroundColor: '#B2B5B8',
        flexDirection: 'row',
    },
    buttonText: {
        marginRight: 5
    },
    homeText: {
        fontSize: 16
    }
})
export default Home;