import React, { useContext, useEffect } from "react";
import CarForm from "../../components/forms/carForm";
import Axios from 'axios';
import { UserContext } from "../../App";
import { Alert, View } from "react-native";
import useAxios from '../../components/hooks/useAxios';

const EditCar = ({ navigation }) => {
    const user = useContext(UserContext);
    const [car, fetchCar] = useAxios('', [], user.data.token, 'get');
    const { id } = navigation.state.params;

    useEffect(() => {
        if (id) {
            fetchCar(`http://10.0.2.2:3333/cars/${id}`, [])
        }
    }, [id, fetchCar])

    const onSubmit = async (data) => {
        try {
            await Axios.put(`http://10.0.2.2:3333/cars/${data._id}`,
                data,
                { withCredentials: false, headers: { Authorization: `Bearer ${user.data.token}` } });
            navigation.push('AllCars')
        } catch (error) {
            console.log('edit car error ', error);
            Alert.alert('Greška', 'Problem sa izmenom vozila.', [{ text: "OK" }]);
        }
    }

    return (
        <View>
            {car && car.data && car.data.length !== 0 && <CarForm onSubmit={onSubmit} data={car.data} />}
        </View>
    )
}
export default EditCar;