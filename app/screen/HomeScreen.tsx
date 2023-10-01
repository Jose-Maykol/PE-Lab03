import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { globalStyles } from "./globalStyles";

export default function HomeScreen({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Information about THE event</Text>
      {/* Sample code for navigation */}
      {/* <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      /> */}
    </View>
  );
}

const home_styles = StyleSheet.create({
  // Put your styles
  // title: {
  //   fontSize: 32,
  //   fontWeight: "bold",
  //   color: "#17635A",
  //   fontFamily: "sans-serif",
  //   textTransform: "uppercase",
  //   marginBottom: 32,
  // },
});
