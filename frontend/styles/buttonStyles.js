import { StyleSheet } from "react-native";

export const buttonStyles = StyleSheet.create({
    button: {
        padding: 5,
        backgroundColor: '#B2B5B8',
        flexDirection: 'column',
        alignItems: 'center',
        width: '30%',
        marginLeft: 'auto',
        marginRight: 'auto',

    },
    buttonText: {
        fontSize: 14
    },
    buttonSold: {
        backgroundColor: '#ffc2b3',
        padding: 5,
    },
    buttonOnStock: {
        backgroundColor: '#e6e6e6',
        padding: 5,
    },
    buttonAll: {
        padding: 5,
        backgroundColor: '#B2B5B8',
    },
    activeButtonText: {
        color: '#2196F3',
        fontSize: 14,
    }
})