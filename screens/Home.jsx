import { View, Text, StyleSheet, StatusBar } from "react-native";
import React from "react";
import Task from "../components/Task";
import Loader from "../components/Loader";

const Home = () => {
  return (
    <View style={homeContainerStyle.homeContainer}>
      <Text style={homeContainerStyle.textViewHeading}>All Request</Text>
    </View>
  );
};
const homeContainerStyle = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#ffff",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  textViewHeading: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 25,
    marginBottom: 20,
    color: "#fff",
    backgroundColor: "#474747",
  },
});
export default Home;
