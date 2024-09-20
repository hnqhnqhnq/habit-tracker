import { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Alert } from "react-native";

export default function SignupScreen({ navigation }) {

    const API_ROUTE = process.env.EXPO_PUBLIC_API_ROUTE;
    const PORT = process.env.EXPO_PUBLIC_API_PORT;
    const IP = process.env.EXPO_PUBLIC_IP;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const showAlert = (message) => {
        Alert.alert(
            "Incomplete Form",
            message, 
            [
                { text: "OK", onPress: () => {}}
            ]
        );
    };

    async function handleSignUp() {
        try {
            const response = await fetch(`${IP}:${PORT}${API_ROUTE}/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    passwordConfirm: passwordConfirm
                })
            });
            if (response.ok) {
                navigation.navigate('Login');
            } else {
                const data = await response.json();
                showAlert(data.message);
            }
        } catch(error) {
            console.log(error);
        }
    }

    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <TextInput style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="#F0EAD6"
                    autoCorrect={false}
                    keyboardType="default"
                    color="#E9DCC9"
                    value={firstName}
                    onChangeText={(text) => {
                        setFirstName(text);
                    }}>
                </TextInput>

                <TextInput style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="#F0EAD6"
                    autoCorrect={false}
                    keyboardType="email-address"
                    color="#E9DCC9"
                    value={lastName}
                    onChangeText={(text) => {
                        setLastName(text);
                    }}>
                </TextInput>

                <TextInput style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#F0EAD6"
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    color="#E9DCC9"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                    }}>
                </TextInput>

                <TextInput style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="password"
                    placeholderTextColor="#E9DCC9"
                    selectionColor="#E9DCC9"
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                    }}
                ></TextInput>

                <TextInput style={styles.input}
                    placeholder="Repeat Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="password"
                    placeholderTextColor="#E9DCC9"
                    selectionColor="#E9DCC9"
                    value={passwordConfirm}
                    onChangeText={(text) => {
                        setPasswordConfirm(text);
                    }}
                ></TextInput>

                <TouchableOpacity style={styles.button}
                    onPress={handleSignUp}>
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