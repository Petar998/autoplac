import React, { useContext, useEffect, useState } from 'react'
import { Alert, Keyboard, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { UserContext } from '../../App';
import useAxios from '../../components/hooks/useAxios';
import { userStyles } from '../../styles/userStyle';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Axios from 'axios';
import ViewUser from '../../components/viewUser';

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
            Alert.alert('Greška!', 'Problem sa učitavanjem korisnika', [{ text: "OK" }]);
        }
    }


    const deleteUser = async (id) => {
        try {
            if (id !== user.data.id) {
                await Axios.delete(`http://10.0.2.2:3333/users/${id}`, { withCredentials: false, headers: { Authorization: `Bearer ${user.data.token}` } });
                Alert.alert('Poruka!', 'Korisnik je obrisan.', [{ text: "OK" }]);
                refreshUserList();
            } else {
                Alert.alert('Greška!', 'Ne možete obrisati ovog korisnika.', [{ text: "OK" }]);
            }
        } catch (err) {
            Alert.alert('Greška!', 'Problem sa brisanjem korisnika.', [{ text: "OK" }]);
        }
    };

    const viewInformation = (data) => {
        setChosenUser(data);
        setOpenModal(true);
    }

    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('NewUser')}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>DODAJ</Text>
                    <AntDesign name="pluscircleo" size={18} />
                </View>
            </TouchableOpacity>
            <ScrollView style={userStyles.constainer}>
                {userList.length !== 0 ? userList.map((user) => <View key={user._id} style={userStyles.card}>
                    <View>
                        <Text>Ime i prezime: {user.firstName} {user.lastName}</Text>
                        <Text>Uloga: {user.role === 'admin' ? 'Admin' : 'Korisnik'}</Text>
                    </View>
                    <View style={userStyles.action}>
                        <MaterialIcons name="mode-edit" size={20} onPress={() => navigation.navigate('EditUser', { id: user._id })} />
                        <MaterialIcons name="delete" size={20} onPress={() => deleteUser(user._id)} />
                        <MaterialIcons name='remove-red-eye' size={20} onPress={() => viewInformation(user)} />
                    </View>
                </View>) : <Text>NEMA PODATAKA</Text>}
            </ScrollView>
            <Modal visible={openModal} animationType='slide'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <View style={userStyles.xIcon}>
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

const styles = StyleSheet.create({
    button: {
        padding: 5,
        backgroundColor: '#B2B5B8',
        flexDirection: 'column',
        alignItems: 'center',
        width: '30%',
        marginLeft: 'auto',
        marginRight: 'auto',

    },
    buttonText: {
        fontSize: 14
    }
})

export default allUsers;