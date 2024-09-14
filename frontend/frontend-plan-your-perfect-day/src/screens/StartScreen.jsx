import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import MyButton from "../components/MyButton"
import SvgComponent from "../assets/SvgComponent"

export default function StartScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <SvgComponent style={styles.svg} width="175" height="175" fill="red"></SvgComponent>
                <Text style={styles.textHeader}>Practice & Track!</Text>
                <Text style={styles.textSubtitle}>Track your progress and keep going</Text>
            </View>
            <View style={styles.buttonContainer}>
                <MyButton text="Get Started!" onPress={() => {navigation.navigate('Home')}}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },

    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 130
    },

    svg: {
        marginBottom: 30
    },

    textHeader: {
        color: "#E9DCC9",
        fontSize: 24, //18
        marginBottom: 10,
    },

    textSubtitle: {
        color: "#E9DCC9",
        fontSize: 18,
        marginBottom: 10,
        fontWeight: '100',
        width: 175,
        textAlign: 'center'
    },

    buttonContainer: {
        position: 'absolute',
        bottom: 80,
        width: '100%',
        alignItems: 'center',
    },
});
