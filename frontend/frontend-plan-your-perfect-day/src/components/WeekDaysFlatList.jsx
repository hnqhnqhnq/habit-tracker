import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native'

const WeekDaysFlatList = ({ days , setSelectedDays, daysOfWeek }) => {

    const toggleDay = (day) => {
        if (days.includes(day)) {
            setSelectedDays(
                days.filter((selectedDay) => selectedDay !== day)
            );
        } else {
            if (day === "All Days") {
                setSelectedDays(["All Days"]);
            } else if (days.length === 1 && days[0] === "All Days") {
                setSelectedDays([day]);
            } else {
                setSelectedDays([...days, day]);
            }
        }
    };

    const renderDayItem = ({ item }) => {
        const isSelected = days.includes(item);
        return (
            <TouchableOpacity
                style={[
                    styles.dayItem,
                    isSelected ? styles.daySelected : styles.dayUnselected,
                ]}
                onPress={() => toggleDay(item)}
            >
                <Text style={styles.dayText}>{item}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.flatListWrapper}>
            <FlatList
                data={daysOfWeek}
                renderItem={renderDayItem}
                keyExtractor={(item) => item}
                horizontal={true}
                contentContainerStyle={styles.daysList}
                showsHorizontalScrollIndicator={false}
                value={days}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    flatListWrapper: {
        width: "100%",
        marginBottom: 0,
    },
    daysList: {
        paddingHorizontal: 10,
        justifyContent: "center",
    },
    dayItem: {
        marginHorizontal: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#E9DCC9",
        alignItems: "center",
    },
    dayUnselected: {
        backgroundColor: "black",
    },
    daySelected: {
        backgroundColor: "grey",
    },
    dayText: {
        color: "#E9DCC9",
        fontSize: 16,
        width: 90,
        textAlign: "center",
    },
});

export default WeekDaysFlatList