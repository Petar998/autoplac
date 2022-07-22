import React from 'react'
import { Text, View } from 'react-native'
import { carStyles } from '../styles/carStyle'

const ViewCar = ({ car }) => {
    return (
        <View>
            <View style={carStyles.modalHeader}>
                <Text style={carStyles.modalTitle}>Informacije o vozilu</Text>
            </View>
            <View style={carStyles.modalContent}>
                <Text>Šifra vozila: {car.code}</Text>
                <Text>Marka: {car.brand}</Text>
                <Text>Model: {car.model}</Text>
                <Text>Godište: {car.year}</Text>
                <Text>Kilometraža: {car.mileage} km</Text>
                <Text>Karoserija: {car.body}</Text>
                <Text>Gorivo: {car.fuel}</Text>
                <Text>Broj sedišta: {car.seat} </Text>
                <Text>Kubikaža: {car.cubicMeasure} cm³</Text>
                <Text>Cena: {parseFloat(car.price).toFixed(2)} €</Text>
                <Text>Boja: {car.color} </Text>
                <Text>Zemlja uvoza: {car.importCountry}</Text>
                <Text>Prodat: {car.sold ? 'Da' : 'Ne'}</Text>
            </View>
        </View>
    )
}

export default ViewCar