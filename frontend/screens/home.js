import React, { useContext } from "react";
import { Button, Text, View, DevSettings } from "react-native";
import { UserContext } from "../App";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {
    const user = useContext(UserContext);

    const logOut = async () => {
        await AsyncStorage.clear();
        user.setLoggedIn(false);
    }
    return (
        <View>
            <Text>DOBRO DOŠLI {user?.data?.firstName} {user?.data?.lastName}</Text>
            <Button title='Log out' onPress={logOut} />
        </View>
    )
}
export default Home;