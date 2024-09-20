import React from 'react';
import { Text, View } from 'react-native';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
};

const DateComponent = ({ serverDate }) => {
    return (
        <View>
            <Text style={{
                color: '#E9DCC9',
                fontSize: 20,
                top: 20,
                fontStyle: 'italic',
                fontWeight: 'bold'
            }}>{formatDate(serverDate)}</Text>
        </View>
    );
};

export default DateComponent;
