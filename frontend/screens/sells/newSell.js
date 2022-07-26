import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'
import { UserContext } from '../../App';
import SellForm from '../../components/forms/sellForm';
import useAxios from '../../components/hooks/useAxios';
import Axios from 'axios';

const NewSell = ({ navigation }) => {
    const user = useContext(UserContext);
    const [cars, fetchCars] = useAxios('', [], user.data.token, 'get');
    const [buyers, fetchBuyers] = useAxios('', [], user.data.token, 'get')

    useEffect(() => {
        const filter = { sold: false }
        fetchCars(`http://10.0.2.2:3333/cars?filter=${JSON.stringify(filter)}`, []);
        fetchBuyers('http://10.0.2.2:3333/buyers', []);
    }, [fetchCars, fetchBuyers]);

    const onSubmit = async (data) => {
        try {
            await Axios.post('http://10.0.2.2:3333/sells',
                data,
                { withCredentials: false, headers: { Authorization: `Bearer ${user.data.token}` } });
            navigation.push('AllSells')
        } catch (error) {
            console.log('new sell error ', error);
            Alert.alert('Greška!', 'Problem sa dodavanjem podataka o prodaji.', [{ text: "OK" }]);
        }
    }

    return (
        <View>
            {cars && cars.data && cars.data.items && buyers?.data?.items &&
                <SellForm cars={cars.data.items} onSubmit={onSubmit} buyers={buyers.data.items} />}
        </View>
    )
}

export default NewSell