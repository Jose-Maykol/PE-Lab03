import React from "react";
import { Text, View } from "react-native";
import { globalStyles } from "./globalStyles";

export default function ConferencesScreen({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>My Conferences</Text>
    </View>
  );
}
