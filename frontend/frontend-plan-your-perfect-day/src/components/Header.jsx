import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import ChartIcon from "../assets/ChartIcon";
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';

const Header = ({ headerTitle = "Default Header", navigation}) => {

    const API_ROUTE = process.env.EXPO_PUBLIC_API_ROUTE;
    const PORT = process.env.EXPO_PUBLIC_API_PORT;
    const IP = process.env.EXPO_PUBLIC_IP;

    const urlProfile = `${IP}:${PORT}${API_ROUTE}/users/myProfile`;

    const [statsData, setStatsData] = useState(null);
    const [userData, setUserData] = useState(null);

    // useEffect(() => {
    //     async function fetchUserData() {
    //         try {
    //             const response = await fetch(`${urlProfile}`);
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setUserId(data.data.user._id);
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchUserData();
    // }, []);

    const handleStatsNavigation = async () => {
        try {
            // Fetch both stats and user data in parallel
            const [statsResponse, userResponse] = await Promise.all([
                fetch(`${IP}:${PORT}${API_ROUTE}/stats/`),
                fetch(`${IP}:${PORT}${API_ROUTE}/users/myProfile`)
            ]);

            // Check if both requests succeeded
            if (statsResponse.ok && userResponse.ok) {
                const statsData = await statsResponse.json();
                const userData = await userResponse.json();

                // Set the fetched data in state
                setStatsData(statsData);
                setUserData(userData);

                // Navigate only after both data are ready
                navigation.navigate('Stats', {
                    statsData: statsData,
                    userData: userData,  // Pass userData to the Stats screen as well
                });
            } else {
                // Log errors if one or both of the requests failed
                if (!statsResponse.ok) {
                    console.log('Error fetching stats data');
                }
                if (!userResponse.ok) {
                    console.log('Error fetching user data');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };



    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <Text style={styles.headerTitle}>{ headerTitle }</Text>
            </View>
            <TouchableOpacity onPress={handleStatsNavigation} style={styles.statsButton} statsData={statsData}>
                <Text style={styles.statsButtonText}>My Stats</Text>
                <ChartIcon style={styles.chartIcon} />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 80,
        width: '90%',
    },

    headerTitle: {
        color: '#E9DCC9',
        fontSize: 30,
        left: 20
    },

    statsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E9DCC9',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        left: 30,
        marginRight: 10
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
});

export default Header