import { useState } from "react";
import { TextInput, View, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard } from "react-native";


export default function LoginScreen({ navigation }) {
    const API_ROUTE = process.env.EXPO_PUBLIC_API_ROUTE;
    const PORT = process.env.EXPO_PUBLIC_API_PORT;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let isStartScreen = false;

    async function handleLogin() {
        try {
            const response = await fetch(`http://192.168.100.193:${PORT}${API_ROUTE}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            });

            if (response.ok) {
                const data = await response.json();
                let isLoggedInForFirstTime = data.data.user.habits.length == 0 ? true : false;
                console.log(isLoggedInForFirstTime);

                if (isLoggedInForFirstTime)
                    navigation.navigate('Start');
                else navigation.navigate('Home');

            }

        } catch (error) {
            console.log("error");
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
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
                    }}>
                </TextInput>

                <TouchableOpacity style={styles.button}
                    onPress={handleLogin}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={{ color: "#E9DCC9" }}
                        onPress={() => {
                            navigation.navigate('Signup')
                        }}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        backgroundColor: '#000',
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