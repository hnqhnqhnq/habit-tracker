import { View, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";

export default function SignupScreen() {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <TextInput style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="#F0EAD6"
                    autoCorrect={false}
                    keyboardType="email-address"
                    color="#E9DCC9">
                </TextInput>

                <TextInput style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="#F0EAD6"
                    autoCorrect={false}
                    keyboardType="email-address"
                    color="#E9DCC9">
                </TextInput>

                <TextInput style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#F0EAD6"
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    color="#E9DCC9">
                </TextInput>

                <TextInput style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="password"
                    placeholderTextColor="#E9DCC9"
                    selectionColor="#E9DCC9"
                ></TextInput>

                <TextInput style={styles.input}
                    placeholder="Repeat Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="password"
                    placeholderTextColor="#E9DCC9"
                    selectionColor="#E9DCC9"
                ></TextInput>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },

    input: {
        borderWidth: 2,
        width: 300,
        height: 40,
        borderColor: '#E9DCC9',
        borderRadius: 15,
        paddingLeft: 15,
        paddingRight: 15,
        paddingVertical: 10,
        color: '#E9DCC9',
    },

    button: {
        backgroundColor: '#E9DCC9',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },

    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});