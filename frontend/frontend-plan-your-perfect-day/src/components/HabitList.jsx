import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';

const HabitList = ({ checkable = false, urlHabits = '', userId = '', days = [] }) => {

    const API_ROUTE = process.env.EXPO_PUBLIC_API_ROUTE;
    const PORT = process.env.EXPO_PUBLIC_API_PORT;
    const IP = process.env.EXPO_PUBLIC_IP;

    const [habitsData, setHabitsData] = useState(null);

    function buildHabitsUrl() {
        let parsableString = '?';
        days.forEach((day, index) => {
            let curr = `${day}=true`;
            if (index < days.length - 1) {
                curr += "&";
            }
            parsableString += curr;
        });

        // Instead of modifying `urlHabits`, return the new URL
        return urlHabits + parsableString;
    }


    useFocusEffect(
        useCallback(() => {
            if (userId) {
                async function fetchAllHabits() {
                    try {
                        const finalUrl = buildHabitsUrl();
                        console.log(finalUrl)
                        const response = await fetch(`${finalUrl}`);
                        if (response.ok) {
                            const data = await response.json();
                            setHabitsData(data);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }

                buildHabitsUrl();
                fetchAllHabits();
            }
        }, [userId, days])
    );

    return (
        <>
            {habitsData && (
                <ScrollView contentContainerStyle={styles.habitsContainer}>
                    {
                        habitsData.data.habits.map(habit => (
                            <View key={habit._id} style={styles.habitAndCheckContainer}>
                                <TouchableOpacity style={[styles.containerPerHabit, { backgroundColor: 'black', borderColor: habit.color, borderWidth: 2, }]}>

                                    <Text style={{
                                        color: habit.color,
                                        fontWeight: 'bold',
                                        left: 20,
                                        top: 5,
                                    }}>
                                        {habit.name}
                                    </Text>
                                    <Text style={{ color: 'grey', left: 20, top: 5 }}>
                                        {habit.description}
                                    </Text>
                                </TouchableOpacity>
                                {checkable === true ? (
                                    <TouchableOpacity style={styles.checked}>
                                    </TouchableOpacity>) : <></>
                                }
                            </View>
                        ))
                    }
                </ScrollView>
            )}
        </>
    );
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
    },

    checked: {
        backgroundColor: 'black',
        borderColor: 'green',
        borderRadius: 15,
        borderWidth: 2,
        width: 50
    },

    habitAndCheckContainer: {
        flexDirection: 'row',
        gap: 20,
    }
});

export default HabitList