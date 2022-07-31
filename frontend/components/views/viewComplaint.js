import moment from 'moment'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { modalStyles } from '../../styles/modalStyle'

const ViewComplaint = ({ complaint }) => {
    return (
        <View>
            <View style={modalStyles.modalHeader}>
                <Text style={modalStyles.modalTitle}>Informacije o reklamaciji</Text>
            </View>
            <View style={modalStyles.modalContent}>
                <Text>Vozilo: {complaint.car.brand} {complaint.car.model}</Text>
                <Text style={styles.buyerHeader}>Podaci o kupcu:</Text>
                <Text>Ime i prezime: {complaint.buyer.firstName} {complaint.buyer.lastName}</Text>
                <Text>Adresa: {complaint.buyer.street} {complaint.buyer.streetNumber}, {complaint.buyer.postalCode} {complaint.buyer.place}</Text>
                <Text style={modalStyles.lastBuyerData}>Kontakt telefon: {complaint.buyer.phone}</Text>
                <Text>Datum reklamacije: {moment(complaint.complaintDate).format('DD.MM.YYYY')}</Text>
                <Text>Opis reklamacije: {complaint.description}</Text>
                <Text>Status: {complaint.rejected ? 'Odbijeno' : 'Prihvaćeno'}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buyerHeader: {
        marginVertical: 5,
        fontSize: 16
    }
})
export default ViewComplaint;