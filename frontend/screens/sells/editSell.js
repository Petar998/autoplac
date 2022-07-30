import React, { useContext, useEffect } from 'react'
import { Alert, View } from 'react-native'
import SellForm from '../../components/forms/sellForm';
import Axios from 'axios';
import { UserContext } from '../../App';
import useAxios from '../../components/hooks/useAxios';

const EditSell = ({ navigation }) => {
    const user = useContext(UserContext);
    const [sell, fetchSell] = useAxios('', [], user.data.token, 'get');
    const [cars, fetchCars] = useAxios('', [], user.data.token, 'get');
    const [buyers, fetchBuyers] = useAxios('', [], user.data.token, 'get')
    const { id } = navigation.state.params;

    useEffect(() => {
        if (id) {
            fetchSell(`http://10.0.2.2:3333/sells/${id}`, [])
        }
        fetchCars('http://10.0.2.2:3333/cars', []);
        fetchBuyers('http://10.0.2.2:3333/buyers', []);
    }, [id, fetchSell, fetchCars, fetchBuyers])

    const onSubmit = async (data) => {
        try {
            await Axios.put(`http://10.0.2.2:3333/sells/${data._id}`,
                data,
                { withCredentials: false, headers: { Authorization: `Bearer ${user.data.token}` } });
            navigation.push('AllSells')
        } catch (error) {
            console.log('edit sell error ', error);
            Alert.alert('Greška', 'Problem sa izmenom prodaje.', [{ text: "OK" }]);
        }
    }

    return (
        <View>
            {sell && sell.data && sell.data.length !== 0 && cars?.data?.items && buyers?.data?.items &&
                <SellForm onSubmit={onSubmit} data={sell.data} cars={cars.data.items} buyers={buyers.data.items} />}
        </View>
    )
}

export default EditSell