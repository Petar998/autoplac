import moment from 'moment'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { modalStyles } from '../styles/modalStyle'

const ViewSell = ({ sell }) => {
    return (
        <View>
            <View style={modalStyles.modalHeader}>
                <Text style={modalStyles.modalTitle}>Informacije o prodaji</Text>
            </View>
            <View style={modalStyles.modalContent}>
                <Text>Vozilo: {sell.car.brand} {sell.car.model}</Text>
                <Text style={styles.buyerHeader}>Podaci o kupcu:</Text>
                <Text>Ime i prezime: {sell.buyer.firstName} {sell.buyer.lastName}</Text>
                <Text>Adresa: {sell.buyer.street} {sell.buyer.streetNumber}, {sell.buyer.postalCode} {sell.buyer.place}</Text>
                <Text>Kontakt telefon: {sell.buyer.phone}</Text>
                <Text>Datum prodaje: {moment(sell.sellDate).format('DD.MM.YYYY')}</Text>
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
export default ViewSell;