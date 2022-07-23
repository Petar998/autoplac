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
    }
});