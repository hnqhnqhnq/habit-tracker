import React, { createContext, useEffect, useState, useContext} from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { Text } from 'react-native';
// for navigation purposes 
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screens for auth 
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import StartScreen from "./src/screens/StartScreen";

// screens for main app
import AppScreen from "./src/screens/AppScreen";
import HabitsScreen from "./src/screens/HabitsScreen";
import HomeScreen from "./src/screens/HomeScreen";
import NewHabitScreen from "./src/screens/NewHabitScreen";
import EditHabitScreen from "./src/screens/EditHabitScreen";
import HabitList from "./src/components/HabitList";
import StatsScreen from "./src/screens/StatsScreen";

import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const habitsStack = createStackNavigator();
const homeStack = createStackNavigator();

function HomeStack() {
  return (
    <homeStack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <homeStack.Screen name="Home" component={HomeScreen}/>
      <homeStack.Screen name="Stats" component={StatsScreen}/>
    </homeStack.Navigator>
  );
}

function HabitsStack() {
  return (
    <habitsStack.Navigator initialRouteName="Habits" screenOptions={{headerShown: false}}> 
      <habitsStack.Screen name="Habits" component={HabitsScreen} />
      <habitsStack.Screen name="EditHabits" component={EditHabitScreen} />
      <habitsStack.Screen name="HabitList" component={HabitList} />
      <habitsStack.Screen name="Stats" component={StatsScreen}/>
    </habitsStack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, 
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Start" component={StartScreen} />
    </Stack.Navigator>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hide the header
        tabBarStyle: stylesTabNav.tabBar,  // Apply custom styles for the tab bar
        tabBarShowLabel: true,      // Show labels for each tab
        tabBarActiveTintColor: '#E9DCC9', // Active icon/text color
        tabBarInactiveTintColor: '#8e8e93', // Inactive icon/text color
      }}
    >
      <Tab.Screen 
        name="Today" 
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" color={color} size={25} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={[stylesTabNav.tabLabel, { color }]} >Today</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Add" 
        component={NewHabitScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" color={color} size={40} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={[stylesTabNav.tabLabel, { color }]} >Create New</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="HabitsScreen" 
        component={HabitsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="book" color={color} size={25} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={[stylesTabNav.tabLabel, { color }]} >Habits</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);  
  const API_ROUTE = process.env.EXPO_PUBLIC_API_ROUTE;
  const PORT = process.env.EXPO_PUBLIC_API_PORT;
  const IP = process.env.EXPO_PUBLIC_IP;

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        let response = await fetch(`${IP}:${PORT}${API_ROUTE}/users/isLoggedin`, {
          method: 'GET', 
          credentials: 'include',
        });
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); 
      }
    }
    checkAuthStatus();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }


  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <Stack.Screen name="App" component={AppTabs} />
          ) : (
            <Stack.Screen name="Auth" component={AuthStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const stylesTabNav = StyleSheet.create({
  tabBar: {
    backgroundColor: 'black', // Make the background transparent
    borderTopWidth: 0,              // Remove the white line (border) at the top of the tab bar
    paddingBottom: 20,              // Padding to adjust the icons and text
    paddingTop: 5,
    height: 90,                     // Increase height for larger icons
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 16,
    marginTop: 8,
  },
});

