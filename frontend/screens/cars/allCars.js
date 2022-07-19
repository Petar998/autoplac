import React, { useContext, useEffect, useState } from "react";
import { Alert, DevSettings, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import useAxios from '../../components/hooks/useAxios';
import { UserContext } from "../../App";
import { MaterialIcons } from '@expo/vector-icons';
import Axios from 'axios';

const AllCars = ({ navigation }) => {
    const user = useContext(UserContext);
    const [cars, fetchCars] = useAxios('', [], user.data.token, 'get');

    useEffect(() => {
        fetchCars('http://10.0.2.2:3333/cars', []);
    }, [fetchCars]);

    const deleteCar = async (id) => {
        try {
            await Axios.delete(`http://10.0.2.2:3333/cars/${id}`, { withCredentials: false, headers: { Authorization: `Bearer ${user.data.token}` } });
            navigation.push('AllCars')
            Alert.alert('Poruka!', 'Vozilo je obrisano.', [{ text: "OK" }]);
        } catch (err) {
            Alert.alert('Greška!', 'Problem sa brisanjem vozila.', [{ text: "OK" }]);
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('NewCar')}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>DODAJ</Text>
                    <AntDesign name="pluscircleo" size={18} />
                </View>
            </TouchableOpacity>
            <View>
                {cars && cars.data && cars.data.items && cars.data.items.map((car) => <View key={car._id}>
                    <Text>{car.brand} {car.model}</Text>
                    <MaterialIcons name="mode-edit" size={20} onPress={() => navigation.navigate('EditCar')} />
                    <MaterialIcons name="delete" size={20} onPress={() => deleteCar(car._id)} />
                </View>)}
            </View>
        </View>
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