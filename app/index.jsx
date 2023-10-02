import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";

import AttendeesScreen from "./screen/AttendeesScreen";
import HomeScreen from "./screen/HomeScreen";
import RegisterScreen from "./screen/RegisterScreen";
import ConferencesScreen from "./screen/ConferencesScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Register") {
              iconName = focused ? "book" : "book-outline";
            } else if (route.name === "Attendees") {
              iconName = focused ? "list" : "list-outline";
            } else if (route.name === "Conferences") {
              iconName = focused ? "compass" : "compass-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#17635A",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Register" component={RegisterScreen} />
        <Tab.Screen name="Attendees" component={AttendeesScreen} />
        <Tab.Screen name="Conferences" component={ConferencesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const tabStyles = StyleSheet.create({
  tab_menu: {
    // backgroundColor: "#00B5A0"
  },
});
