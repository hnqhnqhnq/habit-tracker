import {
    View,
    Text,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import WeekDaysFlatList from "../components/WeekDaysFlatList";

import MyButton from "../components/MyButton";

const daysOfWeek = [
    "All Days",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const colors = ["#F28B82", "#AECBFA", "#CCFF90", "#FFD700"];

const API_ROUTE = process.env.EXPO_PUBLIC_API_ROUTE;
const PORT = process.env.EXPO_PUBLIC_API_PORT;
const IP = process.env.EXPO_PUBLIC_IP;

export default function EditHabitScreen({ route, navigation }) {

    const { habitName, habitDescription, habitDays, habitColor, habitId } = route.params;

    const [days, setSelectedDays] = useState([]);
    const [color, setSelectedColor] = useState("");
    const [name, setName] = useState('');
    const [description, setDescription] = useState("");

    useEffect(() => {
        console.log(habitName);
        console.log(habitDescription);
        console.log(habitColor);
        console.log(habitDays);
        console.log(habitId);
    }, [])


    const [userId, setUserId] = useState("");

    async function getUserId() {
        try {
            const response = await fetch(`${IP}:${PORT}${API_ROUTE}/users/myProfile`);
            if (response.ok) {
                const data = await response.json();
                setUserId(data.data.user._id);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserId();
    }, []);

    async function handlePatchRequest() {
        if (!userId) {
            console.log('User Id not available');
            return;
        }

        try {
            const response = await fetch(`${IP}:${PORT}${API_ROUTE}/users/${userId}/habits/${habitId}`, {
                method: "PATCH", 
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({
                    name: name, 
                    description: description, 
                    days: days, 
                    color: color, 
                })
            });

            if (response.ok) {
                navigation.navigate('Habits');
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Edit Selected Habit</Text>
                <Text style={styles.reminderText}>• Describe your habit</Text>

                <TextInput
                    style={styles.habitTitle}
                    placeholder='Type your new habit'
                    placeholderTextColor='grey'
                    autoCorrect={false}
                    keyboardType='default'
                    color='#E9DCC9'
                    selectionColor='#E9DCC9'
                    defaultValue= {habitName}
                    onChangeText={(text) => setName(text)}
                />

                <TextInput
                    style={styles.habitDescription}
                    placeholder='Habit description'
                    placeholderTextColor='grey'
                    autoCorrect={false}
                    keyboardType='default'
                    color='#E9DCC9'
                    multiline={true}
                    selectionColor='#E9DCC9'
                    defaultValue={habitDescription}
                    onChangeText={(desc) => setDescription(desc)}
                />

                <Text style={styles.reminderText}>• Select day(s) for this habit</Text>

                <WeekDaysFlatList days={days} setSelectedDays={setSelectedDays} daysOfWeek={daysOfWeek} />

                <Text style={styles.reminderText}>• Select label color</Text>

                <View style={styles.colorsContainer}>
                    {colors.map((currColor) => (
                        <TouchableOpacity
                            key={currColor}
                            style={[
                                {
                                    backgroundColor: currColor,
                                    width: 25,
                                    height: 25,
                                    borderRadius: 25,
                                },

                                (color === currColor && styles.selectedColorCircle)
                            ]}
                            onPress={() => handleColorSelect(currColor)}
                        ></TouchableOpacity>
                    ))}
                </View>

                <MyButton text='Edit This Habit' onPress={handlePatchRequest}></MyButton>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        paddingHorizontal: 10,
        justifyContent: "flex-start",
        gap: 10,
    },
    title: {
        color: "#E9DCC9",
        fontSize: 30,
        marginTop: 10,
        marginBottom: 30,
    },
    habitTitle: {
        backgroundColor: "black",
        padding: 20,
        width: "90%",
        fontSize: 18,
        borderRadius: 15,
        borderColor: "#E9DCC9",
        borderWidth: 1,
        color: "#E9DCC9",
        marginBottom: 15,
    },
    habitDescription: {
        backgroundColor: "black",
        padding: 20,
        width: "90%",
        height: 100,
        fontSize: 18,
        borderRadius: 15,
        borderColor: "#E9DCC9",
        borderWidth: 1,
        color: "#E9DCC9",
        textAlignVertical: "top",
    },
    reminderText: {
        color: "#E9DCC9",
        fontSize: 20,
        alignSelf: "flex-start",
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 30
    },

    colorsContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
        paddingLeft: 10,
        gap: 20,
        marginBottom: 30,
        marginLeft: 15
    },

    selectedColorCircle: {
        borderWidth: 2,
        borderColor: "blue",
    },
});