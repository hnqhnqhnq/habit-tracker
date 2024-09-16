import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";

import MyButton from '../components/MyButton'

const daysOfWeek = ['All Days', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const colors = ['#F28B82', '#AECBFA', '#CCFF90', '#FFD700'];

export default function NewHabitScreen() {
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedColor, setSelectedColor] = useState("");

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    }

    const toggleDay = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(selectedDay => selectedDay !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const renderDayItem = ({ item }) => {
        const isSelected = selectedDays.includes(item);
        return (
            <TouchableOpacity
                style={[styles.dayItem, isSelected ? styles.daySelected : styles.dayUnselected]}
                onPress={() => toggleDay(item)}
            >
                <Text style={styles.dayText}>{item}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>New Habit</Text>

                <TextInput
                    style={styles.habitTitle}
                    placeholder="Type your new habit"
                    placeholderTextColor='grey'
                    autoCorrect={false}
                    keyboardType='default'
                    color="#E9DCC9"
                    selectionColor="#E9DCC9"
                />

                <TextInput
                    style={styles.habitDescription}
                    placeholder="Habit description"
                    placeholderTextColor='grey'
                    autoCorrect={false}
                    keyboardType='default'
                    color='#E9DCC9'
                    multiline={true}
                    selectionColor="#E9DCC9"
                />

                <Text style={styles.reminderText}>• Select a day for this habit</Text>

                {/* Horizontal FlatList for days of the week */}
                <View style={styles.flatListWrapper}>
                    <FlatList
                        data={daysOfWeek}
                        renderItem={renderDayItem}
                        keyExtractor={(item) => item}
                        horizontal={true}
                        contentContainerStyle={styles.daysList}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <Text style={styles.reminderText}>• Select label color</Text>

                <View style={styles.colorsContainer}>
                    {
                        colors.map((color) => (
                            <TouchableOpacity 
                                key={color}
                            
                                style={[
                                    {backgroundColor: color,
                                    width: 25, 
                                    height: 25, 
                                    borderRadius: 25}, 

                                    selectedColor === color && styles.selectedColorCircle,
                                ]}

                                onPress={() => handleColorSelect(color)}
                            >
                            </TouchableOpacity>
                        ))
                    }
                </View>

                <MyButton text='Create New Habit'></MyButton>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
        gap: 35,
    },
    title: {
        color: '#E9DCC9',
        fontSize: 30,
        marginBottom: 20,
    },
    habitTitle: {
        backgroundColor: 'black',
        padding: 20,
        width: '90%',
        fontSize: 18,
        borderRadius: 15,
        borderColor: '#E9DCC9',
        borderWidth: 1,
        color: '#E9DCC9',
    },
    habitDescription: {
        backgroundColor: 'black',
        padding: 20,
        width: '90%',
        height: 100,
        fontSize: 18,
        borderRadius: 15,
        borderColor: '#E9DCC9',
        borderWidth: 1,
        color: '#E9DCC9',
        textAlignVertical: 'top',
    },
    reminderText: {
        color: '#E9DCC9',
        fontSize: 20,
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    flatListWrapper: {
        width: '100%', 
    },
    daysList: {
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    dayItem: {
        marginHorizontal: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#E9DCC9',
        alignItems: 'center',
    },
    dayUnselected: {
        backgroundColor: 'black',
    },
    daySelected: {
        backgroundColor: 'grey',
    },
    dayText: {
        color: '#E9DCC9',
        fontSize: 16,
        width: 60
    },

    colorsContainer: {
        flexDirection: 'row', 
        alignSelf: 'flex-start',
        left: 15,
        gap: 20, 
    },

    selectedColorCircle: {
        borderWidth: 2,         
        borderColor: 'blue',     
    },
});
