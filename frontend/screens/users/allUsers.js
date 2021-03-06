import React, { useContext, useEffect, useState } from 'react'
import { Alert, Keyboard, Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { UserContext } from '../../App';
import useAxios from '../../components/hooks/useAxios';
import { listStyles } from '../../styles/listStyle';
import { MaterialIcons } from '@expo/vector-icons';
import Axios from 'axios';
import ViewUser from '../../components/views/viewUser';
import { modalStyles } from '../../styles/modalStyle';
import { buttonStyles } from '../../styles/buttonStyles';

const allUsers = ({ navigation }) => {
    const user = useContext(UserContext);
    const [users, fetchUsers] = useAxios('', [], user.data.token, 'get');
    const [userList, setUserList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [chosenUser, setChosenUser] = useState();

    useEffect(() => {
        fetchUsers('http://10.0.2.2:3333/users', []);
        if (users && users.data && users.data.items) {
            setUserList(users.data.items);
        }
    }, [fetchUsers, users]);

    const refreshUserList = async () => {
        try {
            const response = await Axios.get('http://10.0.2.2:3333/users',
                { withCredentials: false, headers: { Authorization: `Bearer ${user.data.token}` } });
            if (response.data && response.data.items) {
                setUserList(response.data.items);
            }
        } catch (error) {
            Alert.alert('Greška', 'Problem sa učitavanjem korisnika.', [{ text: "OK" }]);
        }
    }

    const deleteUser = async (id) => {
        try {
            if (id !== user.data.id) {
                await Axios.delete(`http://10.0.2.2:3333/users/${id}`, { withCredentials: false, headers: { Authorization: `Bearer ${user.data.token}` } });
                Alert.alert('Poruka', 'Korisnik je obrisan.', [{ text: "OK" }]);
                refreshUserList();
            } else {
                Alert.alert('Greška', 'Ne možete obrisati ovog korisnika.', [{ text: "OK" }]);
            }
        } catch (err) {
            Alert.alert('Greška', 'Problem sa brisanjem korisnika.', [{ text: "OK" }]);
        }
    };

    const viewInformation = (data) => {
        setChosenUser(data);
        setOpenModal(true);
    }

    return (
        <View style={listStyles.content}>
            <TouchableOpacity onPress={() => navigation.push('NewUser')}>
                <View style={buttonStyles.button}>
                    <Text style={buttonStyles.buttonText}>DODAJ</Text>
                    <MaterialIcons name="person-add" size={18} />
                </View>
            </TouchableOpacity>
            <ScrollView style={listStyles.container}>
                {userList.length !== 0 ? userList.map((user) => <View key={user._id} style={listStyles.card}>
                    <View>
                        <Text>Ime i prezime: {user.firstName} {user.lastName}</Text>
                        <Text>Uloga: {user.role === 'admin' ? 'Admin' : 'Korisnik'}</Text>
                    </View>
                    <View style={listStyles.action}>
                        <MaterialIcons name="mode-edit" size={20} onPress={() => navigation.push('EditUser', { id: user._id })} />
                        <MaterialIcons name="delete" size={20} onPress={() => deleteUser(user._id)} />
                        <MaterialIcons name='remove-red-eye' size={20} onPress={() => viewInformation(user)} />
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
                        <ViewUser user={chosenUser} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}

export default allUsers;