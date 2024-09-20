import { TouchableOpacity, StyleSheet, Text } from "react-native"

export default function MyButton({ text, onPress = () => { } }) {
    return (
        <>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#E9DCC9',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '85%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        height: 60
    },

    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'normal',
    },
});