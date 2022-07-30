import React, { useContext, useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View, Modal, Keyboard, TouchableWithoutFeedback, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import useAxios from '../../components/hooks/useAxios';
import { UserContext } from "../../App";
import { MaterialIcons } from '@expo/vector-icons';
import Axios from 'axios';
import { carStyles } from "../../styles/carStyle";
import ViewCar from "../../components/viewCar";
import { modalStyles } from "../../styles/modalStyle";
import { buttonStyles } from "../../styles/buttonStyles";

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
            Alert.alert('Greška', 'Problem sa učitavanjem vozila.', [{ text: "OK" }]);
        }
    }

    const deleteCar = async (id) => {
        try {
            await Axios.delete(`http://10.0.2.2:3333/cars/${id}`, { withCredentials: false, headers: { Authorization: `Bearer ${user.data.token}` } });
            Alert.alert('Poruka', 'Vozilo je obrisano.', [{ text: "OK" }]);
            refreshCarList();
        } catch (err) {
            Alert.alert('Greška', 'Problem sa brisanjem vozila.', [{ text: "OK" }]);
        }
    };

    const viewInformation = (data) => {
        setChosenCar(data);
        setOpenModal(true);
    }

    const showSoldCars = async () => {
        try {
            const filter = { sold: true };
            const response = await Axios.get(`http://10.0.2.2:3333/cars?filter=${JSON.stringify(filter)}`,
                { withCredentials: false, headers: { Authorization: `Bearer ${user.data.token}` } });
            if (response.data && response.data.items) {
                setCarList(response.data.items);
            }
        } catch (error) {
            Alert.alert('Greška', 'Problem sa učitavanjem vozila.', [{ text: "OK" }]);
        }
    }

    const showOnStockCars = async () => {
        try {
            const filter = { sold: false };
            const response = await Axios.get(`http://10.0.2.2:3333/cars?filter=${JSON.stringify(filter)}`,
                { withCredentials: false, headers: { Authorization: `Bearer ${user.data.token}` } });
            if (response.data && response.data.items) {
                setCarList(response.data.items);
            }
        } catch (error) {
            Alert.alert('Greška', 'Problem sa učitavanjem vozila.', [{ text: "OK" }]);
        }
    }

    const showAllCars = async () => {
        try {
            const filter = { sold: true };
            const response = await Axios.get('http://10.0.2.2:3333/cars',
                { withCredentials: false, headers: { Authorization: `Bearer ${user.data.token}` } });
            if (response.data && response.data.items) {
                setCarList(response.data.items);
            }
        } catch (error) {
            Alert.alert('Greška', 'Problem sa učitavanjem vozila.', [{ text: "OK" }]);
        }
    }

    return (
        <View style={carStyles.content}>
            <TouchableOpacity onPress={() => navigation.push('NewCar')}>
                <View style={buttonStyles.button}>
                    <Text style={buttonStyles.buttonText}>DODAJ</Text>
                    <AntDesign name="pluscircleo" size={18} />
                </View>
            </TouchableOpacity>
            <View style={carStyles.buttonContainer}>
                <TouchableOpacity onPress={showSoldCars}>
                    <View style={buttonStyles.buttonSold}>
                        <Text style={buttonStyles.buttonText}>Samo prodata</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={showOnStockCars}>
                    <View style={buttonStyles.buttonOnStock}>
                        <Text style={buttonStyles.buttonText}>Samo dostupna</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={showAllCars}>
                    <View style={buttonStyles.buttonAll}>
                        <Text style={buttonStyles.buttonText}>Prikaži sve</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView style={carStyles.container}>
                {carList.length !== 0 ? carList.map((car) =>
                    <View style={car.sold ? carStyles.cardSold : carStyles.card}>
                        {car.image && car.image.uri && <Image style={carStyles.carImage} key={car.image._id} source={{ uri: car.image.uri }} />}
                        <View key={car._id} style={carStyles.carData}>
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
                        </View>
                    </View>
                ) : <Text>NEMA PODATAKA</Text>}
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

export default AllCars;