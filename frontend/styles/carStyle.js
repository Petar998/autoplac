import { StyleSheet } from "react-native";

export const carStyles = StyleSheet.create({
    constainer: {
        padding: 10,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderColor: '#000000',
        borderWidth: 2,
        marginBottom: 10,
        backgroundColor: '#e6e6e6'
    },
    action: {
        flexDirection: 'row'
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    modalTitle: {
        fontSize: 20,
        color: '#B2B5B8'
    },
    modalContent: {
        padding: 15
    },
    xIcon: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end'
    }
});