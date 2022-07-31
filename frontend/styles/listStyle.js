import { StyleSheet } from "react-native";

export const listStyles = StyleSheet.create({
    content: {
        flex: 1,
        paddingBottom: 10
    },
    container: {
        padding: 10,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderColor: '#000000',
        borderWidth: 1,
        marginBottom: 10,
    },
    action: {
        flexDirection: 'row'
    }
})