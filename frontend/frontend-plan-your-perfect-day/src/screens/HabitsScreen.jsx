import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import Header from '../components/Header'
import WeekDaysFlatList from '../components/WeekDaysFlatList'
import { useFocusEffect } from '@react-navigation/native'; // Import the hook
import { ScrollView } from 'react-native-gesture-handler';


const API_ROUTE = process.env.EXPO_PUBLIC_API_ROUTE;
const PORT = process.env.EXPO_PUBLIC_API_PORT;
const IP = process.env.EXPO_PUBLIC_IP;

const HabitsScreen = () => {

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

    const [days, setDays] = useState([])

    const [userId, setUserId] = useState("");

    const [habitsData, setHabitsData] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
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

        fetchUserData();
    }, []);

    // Fetch habits data when userId is available
    useFocusEffect(
        useCallback(() => {
            if (userId) {
                async function fetchAllHabits() {
                    try {
                        const response = await fetch(`${IP}:${PORT}${API_ROUTE}/users/${userId}/habits`);
                        if (response.ok) {
                            const data = await response.json();
                            setHabitsData(data);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }

                fetchAllHabits();
            }
        }, [userId])
    );

    return (
        <View style={styles.container}>
            <Header headerTitle='All Habits' />

            <WeekDaysFlatList days={days} setSelectedDays={setDays} daysOfWeek={daysOfWeek} />

            {habitsData && (
                <ScrollView contentContainerStyle={styles.habitsContainer}>
                    {
                        habitsData.data.habits.map(habit => (
                            <TouchableOpacity style={[styles.containerPerHabit, { backgroundColor: 'black', borderColor: habit.color, borderWidth: 2}]} key={habit._id}>
                                
                                <Text style={{
                                    color: habit.color, 
                                    fontWeight: 'bold',
                                    left: 20, 
                                    top: 5,
                                }}>
                                    {habit.name}
                                </Text>
                                <Text style={{ color: 'grey', left: 20, top: 5}}>
                                    {habit.description}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        gap: 20
    },

    habitsContainer: {
        alignItems: 'flex-start',
        marginLeft: 15, 
        gap: 20, 
        marginTop: 0, 
        flexGrow: 1, 
        justifyContent: 'flex-start',
    },

    containerPerHabit: {
        borderRadius: 15,
        width: "75%",
        height: 50,
        justifyContent: 'flex-start', 
        alignItems: 'flex-start'
    }
});

export default HabitsScreen