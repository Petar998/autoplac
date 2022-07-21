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
        borderColor: '#000080',
        borderWidth: 2
    },
    action: {
        flexDirection: 'row'
    }
});