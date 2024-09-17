import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import WeekDaysFlatList from '../components/WeekDaysFlatList'
import HabitList from '../components/HabitList';
import { useEffect } from 'react';

const HabitsScreen = () => {

    const API_ROUTE = process.env.EXPO_PUBLIC_API_ROUTE;
    const PORT = process.env.EXPO_PUBLIC_API_PORT;
    const IP = process.env.EXPO_PUBLIC_IP;

    const [userId, setUserId] = useState("");

    const urlProfile = `${IP}:${PORT}${API_ROUTE}/users/myProfile`;
    const urlHabits = `${IP}:${PORT}${API_ROUTE}/users/${userId}/habits`;

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

    const [days, setDays] = useState([]);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch(`${urlProfile}`);
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

    return (
        <View style={styles.container}>
            <Header headerTitle='All Habits' />

            <WeekDaysFlatList days={days} setSelectedDays={setDays} daysOfWeek={daysOfWeek} />

            <HabitList checkable={false} urlHabits={urlHabits} userId={userId} days={days}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        gap: 20
    },
});

export default HabitsScreen