import React, { useContext } from 'react'
import { Alert, Text, View } from 'react-native'
import { UserContext } from '../../App';
import Axios from 'axios';
import UserForm from '../../components/forms/userForm';

const NewUser = ({ navigation }) => {

    const user = useContext(UserContext);

    const onSubmit = async (data) => {
        try {
            await Axios.post('http://10.0.2.2:3333/users',
                data,
                { withCredentials: false, headers: { Authorization: `Bearer ${user.data.token}` } });
            navigation.push('AllUsers')
        } catch (error) {
            console.log('new user error ', error);
            Alert.alert('Greška!', 'Problem sa dodavanjem novog korisnika.', [{ text: "OK" }]);
        }
    }
    return (
        <View>
            <UserForm onSubmit={onSubmit} />
        </View>
    )
}

export default NewUser;