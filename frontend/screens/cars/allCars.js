import React, { useContext, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Keyboard, TouchableWithoutFeedback } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import useAxios from '../../components/hooks/useAxios';
import { UserContext } from "../../App";
import { MaterialIcons } from '@expo/vector-icons';
import Axios from 'axios';
import { carStyles } from "../../styles/carStyle";
import ViewCar from "../../components/viewCar";
import { modalStyles } from "../../styles/modalStyle";

const AllCars = ({ navigation }) => {
    const user = useContext(UserContext);
    const [cars, fetchCars] = useAxios('', [], user.data.token, 'get');
    const [carList, setCarList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [chosenCar, setChosenCar] = useState();

    useEffect(() => {
        fetchCars('http://10.0.2.2:3333/cars', []);
        if (cars && cars.data && cars.data.items) {
            setCarList(cars.data.items);
        }
    }, [fetchCars, cars]);


    const refreshCarList = async () => {
        try {
            const response = await Axios.get('http://10.0.2.2:3333/cars',
                { withCredentials: false, headers: { Authorization: `Bearer ${user.data.token}` } });
            if (response.data && response.data.items) {
                setCarList(response.data.items);
            }
        } catch (error) {
            Alert.alert('Greška!', 'Problem sa učitavanjem vozila', [{ text: "OK" }]);
        }
    }

    const deleteCar = async (id) => {
        try {
            await Axios.delete(`http://10.0.2.2:3333/cars/${id}`, { withCredentials: false, headers: { Authorization: `Bearer ${user.data.token}` } });
            Alert.alert('Poruka!', 'Vozilo je obrisano.', [{ text: "OK" }]);
            refreshCarList();
        } catch (err) {
            Alert.alert('Greška!', 'Problem sa brisanjem vozila.', [{ text: "OK" }]);
        }
    };

    const viewInformation = (data) => {
        setChosenCar(data);
        setOpenModal(true);
    }

    return (
        <View>
            <TouchableOpacity onPress={() => navigation.push('NewCar')}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>DODAJ</Text>
                    <AntDesign name="pluscircleo" size={18} />
                </View>
            </TouchableOpacity>
            <ScrollView style={carStyles.constainer}>
                {carList.length !== 0 ? carList.map((car) => <View key={car._id} style={carStyles.card}>
                    <View>
                        <Text>Šifra vozila: {car.code}</Text>
                        <Text>{car.brand} {car.model}</Text>
                        <Text>{parseFloat(car.price).toFixed(2)} €</Text>
                        <Text>{car.year}</Text>
                    </View>
                    <View style={carStyles.action}>
                        <MaterialIcons name="mode-edit" size={20} onPress={() => navigation.push('EditCar', { id: car._id })} />
                        <MaterialIcons name="delete" size={20} onPress={() => deleteCar(car._id)} />
                        <MaterialIcons name='remove-red-eye' size={20} onPress={() => viewInformation(car)} />
                    </View>
                </View>) : <Text>NEMA PODATAKA</Text>}
            </ScrollView>
            <Modal visible={openModal} animationType='slide'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <View style={modalStyles.xIcon}>
                            <MaterialIcons
                                name='close'
                                size={24}
                                onPress={() => setOpenModal(false)}
                            />
                        </View>
                        <ViewCar car={chosenCar} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
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