import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import DropDownPicker from "react-native-dropdown-picker";

import { globalStyles } from "./globalStyles";

export default function AttendeesScreen() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  // TODO: Get Conferences from DB
  const [items, setItems] = useState([
    { label: "Apple Conference XVI", value: "apple-xvi" },
    { label: "CodeWave IX", value: "codewave-ix" },
    { label: "AppCon X", value: "appcon-x" },
    { label: "MobileTech XIII", value: "mobiletech-xiii" },
    { label: "DevSync VII", value: "devsync-vii" },
    { label: "AppTalk I", value: "apptalk-i" },
    { label: "MobiXpo XII", value: "mobixpo-xii" },
  ]);

  return (
    <View style={attendeesStyles.container}>
      <Text style={globalStyles.title}>Conference Attendees</Text>
      <Text style={attendeesStyles.description}>
        Here you can list the conferences attendees
      </Text>

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />

      <Text style={attendeesStyles.attendees_list}>
        {value ? value : "Here will be the attendees"}
      </Text>
    </View>
  );
}

const attendeesStyles = StyleSheet.create({
  container: {
    padding: 32,
  },
  description: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 24,
  },
  attendees_list: {
    marginTop: 24,
    fontSize:20
  },
});
