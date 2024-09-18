import { View, StyleSheet, Text } from "react-native";
import ChartIcon from "../assets/ChartIcon";
import { TouchableOpacity } from "react-native";
import Header from "../components/Header";
import HabitList from "../components/HabitList";
import { useState } from "react";
import { useEffect } from "react";

export default function HomeScreen({ navigation }) {
  const API_ROUTE = process.env.EXPO_PUBLIC_API_ROUTE;
  const PORT = process.env.EXPO_PUBLIC_API_PORT;
  const IP = process.env.EXPO_PUBLIC_IP;

  const [userId, setUserId] = useState("");

  const [days, setDays] = useState([]);

  const urlProfile = `${IP}:${PORT}${API_ROUTE}/users/myProfile`;
  const urlHabits = `${IP}:${PORT}${API_ROUTE}/users/${userId}/todaysHabits`;

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`${urlProfile}`);
        if (response.ok) {
          const data = await response.json();
          setUserId(data.data.user._id);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserData();
  }, []);

  async function handleSignOut() {
    try {
      const response = await fetch(`${IP}:${PORT}${API_ROUTE}/users/signout`);
      navigation.navigate("Login");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Header headerTitle=' Current Habits ' />

      <View style={styles.content}>
        <HabitList
          checkable={true}
          urlHabits={urlHabits}
          userId={userId}
          days={days}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 80,
    width: "90%",
  },

  headerTitle: {
    color: "#E9DCC9",
    fontSize: 30,
  },

  statsButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E9DCC9",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    left: 30,
  },

  statsButtonText: {
    color: "#000",
    fontSize: 12,
    marginRight: 5,
  },

  chartIcon: {
    width: 12,
    height: 12,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 30,
    width: "100%",
    left: 1.5,
  },

  footerItem: {
    justifyContent: "center",
    alignItems: "center",
  },

  footerText: {
    color: "#E9DCC9",
    fontSize: 16,
    marginTop: 8,
  },
});
