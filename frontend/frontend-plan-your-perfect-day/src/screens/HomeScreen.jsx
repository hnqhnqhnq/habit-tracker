import { Button, View, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
    const API_ROUTE = process.env.EXPO_PUBLIC_API_ROUTE;
    const PORT = process.env.EXPO_PUBLIC_API_PORT;

    async function handleSignOut() {
        try {
            const response = await fetch(`http://192.168.100.193:${PORT}${API_ROUTE}/users/signout`);
            navigation.navigate('Login');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.container}>
            <Button title="Sign Out"
                onPress={handleSignOut}>
                Sign Out
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000', 
    }
});