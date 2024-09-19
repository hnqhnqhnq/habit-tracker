import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Haptics from 'expo-haptics';

const HabitList = ({ checkable = false, urlHabits = '', userId = '', days = [], navigation }) => {

    const [habitsData, setHabitsData] = useState(null);
    const [habitsHashMap, setHabitsHashMap] = useState({});

    const API_ROUTE = process.env.EXPO_PUBLIC_API_ROUTE;
    const PORT = process.env.EXPO_PUBLIC_API_PORT;
    const IP = process.env.EXPO_PUBLIC_IP;

    function buildHabitsUrl() {
        let parsableString = '?';
        days.forEach((day, index) => {
            let curr = `${day}=true`;
            if (index < days.length - 1) {
                curr += "&";
            }
            parsableString += curr;
        });
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

    useEffect(() => {
        const updatedHabitsHashMap = {};
        console.log(habitsData);
        if (habitsData && habitsData.data) {
            habitsData.data.habits.forEach(habit => {
                updatedHabitsHashMap[habit._id] = habit.checked;
            });
        }
        setHabitsHashMap(updatedHabitsHashMap);
    }, [habitsData]);

    useEffect(() => {
        console.log(habitsHashMap);
    }, [habitsHashMap])

    async function checkHabit(habitId) {
        try {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            const response = await fetch(`${IP}:${PORT}${API_ROUTE}/users/${userId}/habits/${habitId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    checked: !habitsHashMap[habitId],
                })
            });

            if (response.ok) {
                // Now update the habitsHashMap state to set the value of this habitId to true
                setHabitsHashMap(prevState => ({
                    ...prevState,
                    [habitId]: !habitsHashMap[habitId]  // Set the habitId to true
                }));
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(habitsHashMap);
    }, []);


    return (
        <>
            {habitsData && (
                <ScrollView contentContainerStyle={styles.habitsContainer}>
                    {
                        habitsData.data.habits.map(habit => (
                            <View key={habit._id} style={styles.habitAndCheckContainer}>
                                <TouchableOpacity onPress={() => {
                                    if (!checkable) {
                                        navigation.navigate('EditHabits', {
                                            habitName: habit.name, 
                                            habitDescription: habit.description, 
                                            habitDays: habit.days, 
                                            habitColor: habit.color, 
                                            habitId: habit._id, 
                                        });
                                    }
                                }} style={[styles.containerPerHabit, { backgroundColor: 'black', borderColor: habit.color, borderWidth: 2, }]}>

                                    <Text style={{
                                        color: habit.color,
                                        fontWeight: 'bold',
                                        left: 20,
                                        top: 5,
                                        textDecorationLine: habitsHashMap[habit._id] ? 'line-through' : 'none',
                                    }}>
                                        {habit.name}
                                    </Text>
                                    <Text style={{ color: 'grey', left: 20, top: 5 }}>
                                        {habit.description}
                                    </Text>
                                </TouchableOpacity>
                                {checkable === true ? (
                                    <TouchableOpacity
                                        onPress={() => checkHabit(habit._id)}
                                        style={[styles.checked,
                                        habitsHashMap[habit._id] ? styles.completed : styles.notCompleted
                                        ]}
                                    >
                                        <View
                                            style={{
                                                top: 12,
                                                alignItems: 'center',
                                            }}
                                        >
                                            {habitsHashMap[habit._id] ? (<Icon name="times" size={20} color="black" />) : (<Icon name="check" size={20} color='#84d921' />)}
                                        </View>
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
        borderColor: '#84d921',
        borderRadius: 15,
        borderWidth: 2,
        width: 50
    },

    habitAndCheckContainer: {
        flexDirection: 'row',
        gap: 20,
    },

    completed: {
        backgroundColor: '#84d921'
    },

    textCompleted: {
        textDecorationLine: 'line-through',
    }
});

export default HabitList