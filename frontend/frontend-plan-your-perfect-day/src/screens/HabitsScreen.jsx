import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const HabitsScreen = () => {
    return (
        <SafeAreaView style = {styles.container}>
            <Text style={{color: 'white'}}>HabitsScreen</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'black', 
    }, 
    
});

export default HabitsScreen