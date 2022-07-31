import React, { useContext, useEffect } from 'react'
import { Alert, View } from 'react-native'
import { UserContext } from '../../App';
import ComplaintForm from '../../components/forms/complaintForm';
import Axios from 'axios';
import useAxios from '../../components/hooks/useAxios';

const NewComplaint = ({ navigation }) => {
    const user = useContext(UserContext);
    const [buyers, fetchBuyers] = useAxios('', [], user.data.token, 'get')

    useEffect(() => {
        fetchBuyers('http://10.0.2.2:3333/buyers', []);
    }, [fetchBuyers]);

    const onSubmit = async (data) => {
        try {
            await Axios.post('http://10.0.2.2:3333/complaints',
                data,
                { withCredentials: false, headers: { Authorization: `Bearer ${user.data.token}` } });
            navigation.push('AllComplaints')
        } catch (error) {
            console.log('new complaint error ', error);
            Alert.alert('Greška', 'Problem sa dodavanjem nove reklamacije.', [{ text: "OK" }]);
        }
    }
    return (
        <View>
            {buyers?.data?.items && <ComplaintForm onSubmit={onSubmit} buyers={buyers.data.items} />}
        </View>
    )
}

export default NewComplaint