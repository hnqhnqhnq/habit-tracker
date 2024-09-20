import { Text, SafeAreaView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HabitProgress from '../components/HabitProgress'
import { TouchableOpacity } from 'react-native'
import DateComponent from '../components/DateComponent'
import { Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { useAuth } from '../AuthContext'

const StatsScreen = ({ route }) => {

    const { signOut } = useAuth();

    const API_ROUTE = process.env.EXPO_PUBLIC_API_ROUTE;
    const PORT = process.env.EXPO_PUBLIC_API_PORT;
    const IP = process.env.EXPO_PUBLIC_IP;

    const { statsData, userData } = route.params;

    const [completedHabitsForToday, setCompletedHabitsForToday] = useState(0);
    const [totalHabitsForToday, setTotalHabitsForToday] = useState(0);
    const [percentageDoneForToday, setPercentageDoneForToday] = useState(0);
    const [userDailyStreak, setUserDailyStreak] = useState(0);
    const [userFirstName, setUserFirstName] = useState("");
    const [todayDate, setTodayDate] = useState(null);

    useEffect(() => {
        statsData.data.stats.forEach(stat => {
            setCompletedHabitsForToday(stat.completedHabits);
            setTotalHabitsForToday(stat.totalHabits);
            setTodayDate(stat.statDate);
        });
    }, [statsData]);

    useEffect(() => {
        console.log("DATE: " + todayDate);
    }, [todayDate]);

    function calculatePercentage() {
        return ((completedHabitsForToday / totalHabitsForToday) * 100);
    }

    useEffect(() => {
        setPercentageDoneForToday(calculatePercentage());
    }, [completedHabitsForToday, totalHabitsForToday]);

    useEffect(() => {
        if (userData) {
            setUserDailyStreak(userData.data.user.dailyStreak);
            setUserFirstName(userData.data.user.firstName);
        }
    }, [userData]);

    async function handleSignOut() {
        try {
            const response = await fetch(`${IP}:${PORT}${API_ROUTE}/users/signout`);
            signOut();
        } catch (err) {
            console.log(err);
        }
    }

    function navigateStatsHistory() {
        
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.statsTitle}>{userFirstName}'s Statistics</Text>
                <View style={styles.streakContainer}>
                    <Image
                        source={require('../assets/streakFire.gif')}
                        style={styles.gif}
                    />
                    <Text style={[styles.statsTitle, styles.statsDailyStreak]}>{userDailyStreak}</Text>
                </View>
            </View>

            <HabitProgress progressPercentage={percentageDoneForToday} totalHabitsForToday={totalHabitsForToday} completedHabitsForToday={completedHabitsForToday} />
            <DateComponent serverDate={todayDate} />

            <View style={{ flex: 1 }}></View>

            <View style={styles.footer}>
                <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
                    <Text style={styles.signOutButtonText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
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
        gap: 70
    },

    statsDailyStreak: {
        fontWeight: 'bold',
        fontStyle: 'italic',
    },

    streakContainer: {
        flexDirection: 'row',
    },

    gif: {
        width: 50,
        height: 50,
        bottom: 15
    },

    statsTitle: {
        color: '#E9DCC9',
        fontSize: 30
    },

    footer: {
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 30,
        flexDirection: 'row',  
        justifyContent: 'center',  
    },

    signOutButton: {
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: 8,      
        paddingHorizontal: 30,   
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        width: "40%",             
    },

    signOutButtonText: {
        color: 'red',
        fontSize: 16,           
    },
});

export default StatsScreen;
