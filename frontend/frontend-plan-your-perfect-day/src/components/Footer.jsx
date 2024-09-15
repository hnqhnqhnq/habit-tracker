import { View, Text , StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'

import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'

export default function Footer() {
    return (
        <>
            <View style={styles.footer}>
                <View style={styles.footerItem}>
                    <TouchableOpacity>
                        <Foundation name="home" size={25} color="#E9DCC9" />
                    </TouchableOpacity>
                    <Text style={styles.footerText}>Today</Text>
                </View>

                <View style={styles.footerItem}>
                    <TouchableOpacity>
                        <Ionicons name="add-circle-outline" size={45} color="#E9DCC9" />
                    </TouchableOpacity>
                    <Text style={styles.footerText}>Create New</Text>
                </View>

                <View style={styles.footerItem}>
                    <TouchableOpacity>
                        <Feather name="book" size={25} color="#E9DCC9" />
                    </TouchableOpacity>
                    <Text style={styles.footerText}>Habits</Text>
                </View>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around', // This will evenly distribute space between the items
        alignItems: 'center', // Ensure the items are vertically centered
        paddingBottom: 30,
        width: '100%',
        left: 1.5
    },

    footerItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    footerText: {
        color: '#E9DCC9', // Light color for contrast with dark background
        fontSize: 16,
        marginTop: 8, // Adds some space between icon and text
    },
});