import { View, StyleSheet, Text } from "react-native";
import ChartIcon from "../assets/ChartIcon";
import { TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation }) {
    const API_ROUTE = process.env.EXPO_PUBLIC_API_ROUTE;
    const PORT = process.env.EXPO_PUBLIC_API_PORT;
    const IP = process.env.EXPO_PUBLIC_IP;

    async function handleSignOut() {
        try {
            const response = await fetch(`${IP}:${PORT}${API_ROUTE}/users/signout`);
            navigation.navigate('Login');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerTitle}>Current Habits</Text>
                </View>
                <TouchableOpacity style={styles.statsButton}>
                    <Text style={styles.statsButtonText}>My Stats</Text>
                    <ChartIcon style={styles.chartIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {/* Additional content for your screen goes here */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 80,
        width: '90%',
    },

    headerTitle: {
        color: '#E9DCC9',
        fontSize: 30,
    },

    statsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E9DCC9', 
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        left: 30,
    },

    statsButtonText: {
        color: '#000',
        fontSize: 12,
        marginRight: 5, 
    },

    chartIcon: {
        width: 12,
        height: 12,
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center', 
        paddingBottom: 30,
        width: '100%',
        left: 1.5
    },

    footerItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    footerText: {
        color: '#E9DCC9', 
        fontSize: 16,
        marginTop: 8, 
    },
});