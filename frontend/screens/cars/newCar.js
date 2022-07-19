import React, { useContext } from "react";
import CarForm from "../../components/forms/carForm";
import Axios from 'axios';
import { UserContext } from "../../App";
import { Alert } from "react-native";

const NewCar = ({ navigation }) => {
    const user = useContext(UserContext);
    const onSubmit = async (data) => {
        try {
            await Axios.post('http://10.0.2.2:3333/cars',
                data,
                { withCredentials: false, headers: { Authorization: `Bearer ${user.data.token}` } });
            navigation.goBack()
        } catch (error) {
            console.log('new car error ', error);
            Alert.alert('Greška!', 'Problem sa dodavanjem novog vozila.', [{ text: "OK" }]);
        }
    }

    return (
        <CarForm isNew={true} onSubmit={onSubmit} />
    )
}
export default NewCar;