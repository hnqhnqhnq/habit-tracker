import { View, Text } from 'react-native'
import React from 'react'
import ChartIcon from "../assets/ChartIcon";
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Header = ({ headerTitle = "Default Header"}) => {
    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <Text style={styles.headerTitle}>{ headerTitle }</Text>
            </View>
            <TouchableOpacity style={styles.statsButton}>
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