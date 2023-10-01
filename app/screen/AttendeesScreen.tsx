import React from "react";
import { Text, View } from "react-native";
import { globalStyles } from "./globalStyles";

export default function AttendeesScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>List of registered event attendees</Text>
    </View>
  );
}
