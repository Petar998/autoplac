import React, { useContext, useEffect } from 'react'
import { Alert, View } from 'react-native';
import Axios from 'axios';
import { UserContext } from '../../App';
import UserForm from '../../components/forms/userForm';
import useAxios from '../../components/hooks/useAxios';

const EditUser = ({ navigation }) => {
    const user = useContext(UserContext);
    const [singleUser, fetchUser] = useAxios('', [], user.data.token, 'get');
    const { id } = navigation.state.params;

    useEffect(() => {
        if (id) {
            fetchUser(`http://10.0.2.2:3333/users/${id}`, [])
        }
    }, [id, fetchUser])

    const onSubmit = async (data) => {
        try {
            console.log('here')
            if (
                (data.newPassword !== '' && data.confirmPassword !== '' && data.newPassword !== data.confirmPassword)
            ) {
                Alert.alert('Greška!', 'Nova šifra mora biti potvrđena.', [{ text: "OK" }]);
            } else {
                if (!data.newPassword && !data.confirmPassword) {
                    delete data.newPassword;
                    delete data.confirmPassword;
                }
                await Axios.put(`http://10.0.2.2:3333/users/${data._id}`,
                    data,
                    { withCredentials: false, headers: { Authorization: `Bearer ${user.data.token}` } });
                navigation.push('AllUsers')
            }
        } catch (error) {
            console.log('edit user error ', error);
            Alert.alert('Greška!', 'Problem sa izmenom korisnika.', [{ text: "OK" }]);
        }
    }

    return (
        <View>
            {singleUser && singleUser.data && singleUser.data.length !== 0 && <UserForm onSubmit={onSubmit} data={singleUser.data} />}
        </View>
    )
}

export default EditUser