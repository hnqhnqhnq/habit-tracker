import { Button, View, StyleSheet, Text } from "react-native";
import ArrowSvg from "../assets/ArrowSvg"
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ChartIcon from "../assets/ChartIcon";
import { TouchableOpacity } from "react-native";

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
            <View style = {styles.header}>
                <View style={styles.textHeaderCurrentHabit}>
                    <Text style={styles.textCurrentHabit}>Current Habits</Text>
                </View>
                <TouchableOpacity style={styles.textHeaderMyStats}>
                    <Text style = {styles.textMyStats}>My Stats</Text>
                    <ChartIcon style={{width: 12, height: 12}}/>
                </TouchableOpacity>
            </View>

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
    }, 

    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        top: 90,
        gap: 50
    }, 

    textCurrentHabit: {
        color: '#E9DCC9',
        fontSize: 28,
    },

    textMyStats: {
        color: '#000',
        fontSize: 12
    },

    textHeaderCurrentHabit: {
        
    },

    textHeaderMyStats: {
        flexDirection: "row",
        gap: 5,
        backgroundColor: "#E9DCC9",
        borderRadius: 10,
        height: 28, 
        width: 100, 
        justifyContent: 'center',
        alignItems: 'center',
        top: 3
    },
});