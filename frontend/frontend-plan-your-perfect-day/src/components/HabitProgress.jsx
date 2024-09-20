import React from 'react';
import { View, Text } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';

const HabitProgress = ({ progressPercentage, totalHabitsForToday, completedHabitsForToday}) => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', top: 30}}>
            <CircularProgress
                size={150} 
                width={20}
                fill={progressPercentage}  
                tintColor='#84d921' 
                backgroundColor="grey" 
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
            }}>Habits completed for today</Text>
        </View>
    );
};

export default HabitProgress;