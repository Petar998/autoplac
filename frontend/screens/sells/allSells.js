import React, { useContext, useEffect, useState } from 'react'
import { Alert, Keyboard, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { UserContext } from '../../App';
import useAxios from '../../components/hooks/useAxios';
import Axios from 'axios';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { listStyles } from '../../styles/listStyle';
import { buttonStyles } from '../../styles/buttonStyles';
import { modalStyles } from '../../styles/modalStyle';

const AllSells = ({ navigation }) => {
    const user = useContext(UserContext);
    const [sells, fetchSells] = useAxios('', [], user.data.token, 'get');
    const [sellList, setSellList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [chosenSell, setChosenSell] = useState();

    useEffect(() => {
        fetchSells('http://10.0.2.2:3333/sells', []);
        if (sells && sells.data && sells.data.items) {
            setSellList(sells.data.items);
        }
    }, [fetchSells, sells]);

    const refreshSellList = async () => {
        try {
            const response = await Axios.get('http://10.0.2.2:3333/sells',
                { withCredentials: false, headers: { Authorization: `Bearer ${user.data.token}` } });
            if (response.data && response.data.items) {
                setSellList(response.data.items);
            }
        } catch (error) {
            Alert.alert('Greška!', 'Problem sa učitavanjem prodaja', [{ text: "OK" }]);
        }
    }

    const deleteSell = async (id) => {
        try {
            await Axios.delete(`http://10.0.2.2:3333/sells/${id}`, { withCredentials: false, headers: { Authorization: `Bearer ${user.data.token}` } });
            Alert.alert('Poruka!', 'Prodaja je obrisana.', [{ text: "OK" }]);
            refreshSellList();
        } catch (err) {
            Alert.alert('Greška!', 'Problem sa brisanjem prodaje.', [{ text: "OK" }]);
        }
    };

    const viewInformation = (data) => {
        setChosenSell(data);
        setOpenModal(true);
    }

    return (
        <View>
            <TouchableOpacity onPress={() => navigation.push('NewSell')}>
                <View style={buttonStyles.button}>
                    <Text style={buttonStyles.buttonText}>DODAJ</Text>
                    <AntDesign name="pluscircleo" size={18} />
                </View>
            </TouchableOpacity>
            <ScrollView style={listStyles.constainer}>
                {sellList.length !== 0 ? sellList.map((sell) => <View key={sell._id} style={sellStyles.card}>
                    <View>
                    </View>
                    <View style={listStyles.action}>
                        <MaterialIcons name="mode-edit" size={20} onPress={() => navigation.push('EditSell', { id: sell._id })} />
                        <MaterialIcons name="delete" size={20} onPress={() => deleteSell(sell._id)} />
                        <MaterialIcons name='remove-red-eye' size={20} onPress={() => viewInformation(sell)} />
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
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>

    )
}

export default AllSells