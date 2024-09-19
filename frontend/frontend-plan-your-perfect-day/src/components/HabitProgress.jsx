import React from 'react';
import { View, Text } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';


const HabitProgress = ({ progressPercentage, totalHabitsForToday, completedHabitsForToday}) => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', top: 30}}>
            <CircularProgress
                size={150} // The size of the progress ring
                width={20} // Width of the ring
                fill={progressPercentage}  // This represents 60% filled (i.e., 6/10 habits)
                tintColor='#84d921' // Color of the filled section
                backgroundColor="grey" // Color of the unfilled section
            />
            <Text style={{
                color: '#E9DCC9', 
                fontSize: 24, 
                position: 'absolute', 
                bottom: 95, 
                fontWeight: 'bold'
            }}>{completedHabitsForToday}/{totalHabitsForToday}</Text>
            <Text style={{
                marginTop: 10, 
                color: '#E9DCC9',
                fontSize: 20, 
                top: 10, 
            }}>Habits marked as complete</Text>
        </View>
    );
};

export default HabitProgress;