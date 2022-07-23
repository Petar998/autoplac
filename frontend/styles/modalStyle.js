import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
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
})