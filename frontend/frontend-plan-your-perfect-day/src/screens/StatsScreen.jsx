import { Text, SafeAreaView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HabitProgress from '../components/HabitProgress'

import { StyleSheet } from 'react-native'

const StatsScreen = ({ route }) => {

    const { statsData, userData } = route.params;

    const [completedHabitsForToday, setCompletedHabitsForToday] = useState(0);
    const [totalHabitsForToday, setTotalHabitsForToday] = useState(0);
    const [percentageDoneForToday, setPercentageDoneForToday] = useState(0);
    const [userDailyStreak, setUserDailyStreak] = useState(0);
    const [userFirstName, setUserFirstName] = useState("");

    useEffect(() => {
        statsData.data.stats.forEach(stat => {
            console.log(stat);
            setCompletedHabitsForToday(stat.completedHabits);
            setTotalHabitsForToday(stat.totalHabits);
        });

    }, [statsData]);

    function calculatePercentage() {
        return ((completedHabitsForToday / totalHabitsForToday) * 100);
    }

    useEffect(() => {
        console.log("total habits for this user: " + totalHabitsForToday);
        console.log("completed habits for this user: " + completedHabitsForToday);

        setPercentageDoneForToday(calculatePercentage());
    }, [completedHabitsForToday, totalHabitsForToday]);

    useEffect(() => {
        if (userData) {
            setUserDailyStreak(userData.data.user.dailyStreak);
            setUserFirstName(userData.data.user.firstName);
        }
    }, [userData]);

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.headerContainer}>
                <Text style={styles.statsTitle}>{userFirstName}'s Statistics</Text>
                <Text style={[styles.statsTitle, styles.statsDailyStreak]}>{userDailyStreak}</Text>
            </View>

            <HabitProgress progressPercentage={percentageDoneForToday} totalHabitsForToday={totalHabitsForToday} completedHabitsForToday={completedHabitsForToday}/>

            {/* <View style={styles.content}></View> */}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'black', 
        alignItems: 'center', 
        gap: 30
    }, 

    headerContainer: {
        top: 20, 
        flexDirection: 'row', 
        gap: 100
    }, 

    statsDailyStreak: {
        fontWeight: 'bold', 
        fontStyle: 'italic', 
    }, 

    statsTitle: {
        color: '#E9DCC9',
        fontSize: 30
    }, 

    content: {
        flex: 1
    }, 

    footer: {

    }
});

export default StatsScreen