import React, { useContext, useEffect, useState } from 'react'
import { Alert, Keyboard, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { UserContext } from '../../App';
import useAxios from '../../components/hooks/useAxios';
import Axios from 'axios';
import { listStyles } from '../../styles/listStyle';
import { buttonStyles } from '../../styles/buttonStyles';
import { modalStyles } from '../../styles/modalStyle';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import ViewComplaint from '../../components/views/viewComplaint';

const AllComplaints = ({ navigation }) => {
    const user = useContext(UserContext);
    const [complaints, fetchComplaints] = useAxios('', [], user.data.token, 'get');
    const [complaintList, setComplaintList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [chosenComplaint, setChosenComplaint] = useState();

    useEffect(() => {
        fetchComplaints('http://10.0.2.2:3333/complaints', []);
        if (complaints && complaints.data && complaints.data.items) {
            setComplaintList(complaints.data.items);
        }
    }, [fetchComplaints, complaints]);

    const refreshcomplaintList = async () => {
        try {
            const response = await Axios.get('http://10.0.2.2:3333/complaints',
                { withCredentials: false, headers: { Authorization: `Bearer ${user.data.token}` } });
            if (response.data && response.data.items) {
                setComplaintList(response.data.items);
            }
        } catch (error) {
            Alert.alert('Greška', 'Problem sa učitavanjem reklamacija.', [{ text: "OK" }]);
        }
    }

    const deleteComplaint = async (id) => {
        try {
            await Axios.delete(`http://10.0.2.2:3333/complaints/${id}`, { withCredentials: false, headers: { Authorization: `Bearer ${user.data.token}` } });
            Alert.alert('Poruka', 'Reklamacija je obrisana.', [{ text: "OK" }]);
            refreshcomplaintList();
        } catch (err) {
            Alert.alert('Greška', 'Problem sa brisanjem reklamacije.', [{ text: "OK" }]);
        }
    };

    const viewInformation = (data) => {
        setChosenComplaint(data);
        setOpenModal(true);
    }

    return (
        <View style={listStyles.content}>
            <TouchableOpacity onPress={() => navigation.push('NewComplaint')}>
                <View style={buttonStyles.button}>
                    <Text style={buttonStyles.buttonText}>DODAJ</Text>
                    <AntDesign name="pluscircleo" size={18} />
                </View>
            </TouchableOpacity>
            <ScrollView style={listStyles.container}>
                {complaintList.length !== 0 ? complaintList.map((complaint) => <View key={complaint._id} style={complaint.rejected ?
                    { ...listStyles.card, ...styles.rejected } : listStyles.card}>
                    <View>
                        <Text>Vozilo: {complaint?.car?.brand} {complaint?.car?.model}</Text>
                        <Text>Kupac: {complaint.buyer.firstName} {complaint.buyer.lastName}</Text>
                        <Text>Datum reklamacije: {moment(complaint.complaintDate).format('DD.MM.YYYY')}</Text>
                        <Text>Status: {complaint.rejected ? 'Odbijeno' : 'Prihvaćeno'}</Text>
                    </View>
                    <View style={listStyles.action}>
                        <MaterialIcons name="mode-edit" size={20} onPress={() => navigation.push('EditComplaint', { id: complaint._id })} />
                        <MaterialIcons name="delete" size={20} onPress={() => deleteComplaint(complaint._id)} />
                        <MaterialIcons name='remove-red-eye' size={20} onPress={() => viewInformation(complaint)} />
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
                        <ViewComplaint complaint={chosenComplaint} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    rejected: {
        borderColor: '#ffc2b3'
    }
})

export default AllComplaints