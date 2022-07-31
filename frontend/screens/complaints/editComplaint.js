import React, { useContext, useEffect } from 'react'
import { Alert, View } from 'react-native'
import { UserContext } from '../../App';
import useAxios from '../../components/hooks/useAxios';
import Axios from 'axios';
import ComplaintForm from '../../components/forms/complaintForm';

const EditComplaint = ({ navigation }) => {
    const user = useContext(UserContext);
    const [buyers, fetchBuyers] = useAxios('', [], user.data.token, 'get')
    const [complaint, fetchCompliant] = useAxios('', [], user.data.token, 'get')
    const { id } = navigation.state.params;

    useEffect(() => {
        if (id) {
            fetchCompliant(`http://10.0.2.2:3333/complaints/${id}`, [])
        }
        fetchBuyers('http://10.0.2.2:3333/buyers', []);
    }, [id, fetchCompliant, fetchBuyers]);

    const onSubmit = async (data) => {
        try {
            await Axios.put(`http://10.0.2.2:3333/complaints/${data._id}`,
                data,
                { withCredentials: false, headers: { Authorization: `Bearer ${user.data.token}` } });
            navigation.push('AllComplaints')
        } catch (error) {
            console.log('edit complaint error ', error);
            Alert.alert('Greška', 'Problem sa izmenom reklamacije.', [{ text: "OK" }]);
        }
    }

    return (
        <View>
            {complaint && complaint.data && complaint.data.length !== 0 &&
                buyers?.data?.items && <ComplaintForm onSubmit={onSubmit} buyers={buyers.data.items} data={complaint.data} />}
        </View>
    )
}

export default EditComplaint