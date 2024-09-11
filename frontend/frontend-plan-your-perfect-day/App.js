import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react"; // Import useEffect and useState for making the request and handling response
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [responseData, setResponseData] = useState(""); // State to hold the response

  useEffect(() => {
    // Function to make the GET request
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/test"); // Make the GET request to your endpoint
        const data = await response.text(); // Assuming the response is plain text
        setResponseData(data); // Set the response data to state
      } catch (error) {
        console.error("Error fetching data:", error);
        setResponseData("Failed to fetch data");
      }
    };

    fetchData(); // Call the function to fetch data
  }, []); // Empty dependency array to run once when the component mounts

  return (
    <View style={styles.container}>
      <Text>{responseData ? responseData : "Loading..."}</Text>{" "}
      {/* Display the fetched data */}
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
