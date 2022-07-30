import { StyleSheet } from "react-native";

export const carStyles = StyleSheet.create({
    constainer: {
        padding: 10,
    },
    card: {
        borderColor: '#000000',
        borderWidth: 2,
        marginBottom: 10,
        backgroundColor: '#e6e6e6',
        padding: 10,
    },
    cardSold: {
        borderColor: '#000000',
        borderWidth: 2,
        marginBottom: 10,
        backgroundColor: '#ffc2b3',
        padding: 10,
    },
    carData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    action: {
        flexDirection: 'row'
    },
    carImage: {
        width: '100%',
        height: 150,
        marginBottom: 5
    },
});