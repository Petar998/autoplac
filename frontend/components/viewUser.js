import React from 'react'
import { Text, View } from 'react-native'
import { modalStyles } from '../styles/modalStyle'

const ViewUser = ({ user }) => {
    return (
        <View>
            <View style={modalStyles.modalHeader}>
                <Text style={modalStyles.modalTitle}>Informacije o korisniku</Text>
            </View>
            <View style={modalStyles.modalContent}>
                <Text>Ime: {user.firstName}</Text>
                <Text>Prezime: {user.lastName}</Text>
                <Text>Email: {user.email}</Text>
                <Text>Uloga: {user.role === 'admin' ? 'Admin' : 'Korisnik'}</Text>
            </View>
        </View>
    )
}

export default ViewUser