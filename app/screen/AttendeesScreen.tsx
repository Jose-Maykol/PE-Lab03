import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList, Button } from "react-native";

import DropDownPicker from "react-native-dropdown-picker";

import { globalStyles } from "./globalStyles";

const conferences = [
  {
    id: 0,
    name: "Apple Conference XVI",
    date: "2023-09-20",
    location: "San Francisco, CA",
    description: "Annual Apple developer conference",
    attendees: [
      {
        fullname: "John Smith",
        email: "john@example.com",
        register_date: "2023-08-15",
      },
      {
        fullname: "Alice Johnson",
        email: "alice@example.com",
        register_date: "2023-08-18",
      },
    ],
  },
  {
    id: 1,
    name: "CodeWave IX",
    date: "2023-10-05",
    location: "New York City, NY",
    description: "CodeWave developer conference",
    attendees: [
      {
        fullname: "Sarah Brown",
        email: "sarah@example.com",
        register_date: "2023-09-10",
      },
      {
        fullname: "David Lee",
        email: "david@example.com",
        register_date: "2023-09-12",
      },
    ],
  },
  {
    id: 2,
    name: "AppCon X",
    date: "2023-11-15",
    location: "Los Angeles, CA",
    description: "Annual AppCon conference",
    attendees: [
      {
        fullname: "Emily Wilson",
        email: "emily@example.com",
        register_date: "2023-10-20",
      },
      {
        fullname: "Michael Davis",
        email: "michael@example.com",
        register_date: "2023-10-22",
      },
    ],
  },
  {
    id: 3,
    name: "MobileTech XIII",
    date: "2023-12-03",
    location: "San Jose, CA",
    description: "MobileTech developer summit",
    attendees: [
      {
        fullname: "Olivia Martinez",
        email: "olivia@example.com",
        register_date: "2023-11-05",
      },
      {
        fullname: "Daniel White",
        email: "daniel@example.com",
        register_date: "2023-11-07",
      },
    ],
  },
  {
    id: 4,
    name: "DevSync VII",
    date: "2024-01-18",
    location: "Chicago, IL",
    description: "DevSync developer conference",
    attendees: [
      {
        fullname: "Sophia Clark",
        email: "sophia@example.com",
        register_date: "2023-12-15",
      },
      {
        fullname: "Ethan Turner",
        email: "ethan@example.com",
        register_date: "2023-12-17",
      },
    ],
  },
  {
    id: 5,
    name: "AppTalk I",
    date: "2024-02-10",
    location: "Seattle, WA",
    description: "Inaugural AppTalk event",
    attendees: [
      {
        fullname: "Liam Harris",
        email: "liam@example.com",
        register_date: "2024-01-15",
      },
      {
        fullname: "Ava Robinson",
        email: "ava@example.com",
        register_date: "2024-01-17",
      },
    ],
  },
];

export default function AttendeesScreen() {
  const [open, setOpen] = useState(false);
  const [selectedConference, setSelectedConference] = useState(null);
  // TODO: Get Conferences from DB
  const [items, setItems] = useState([
    { label: "Apple Conference XVI", value: "0" },
    { label: "CodeWave IX", value: "1" },
    { label: "AppCon X", value: "2" },
    { label: "MobileTech XIII", value: "3" },
    { label: "DevSync VII", value: "4" },
    { label: "AppTalk I", value: "5" },
  ]);

  const [conference, setAttendees] = useState([]);

  const getAttendees = () => {
    if (!selectedConference) {
      return [];
    }

    const conference = conferences.find(
      (conf) => conf.id.toString() === selectedConference
    );
    return conference ? conference.attendees : [];
  };

  const onPressAttendees = () => {
    setAttendees(getAttendees());
  };

  return (
    <View style={attendeesStyles.container}>
      <Text style={globalStyles.title}>Conference Attendees</Text>
      <Text style={attendeesStyles.description}>
        Here you can list the conferences attendees
      </Text>

      <DropDownPicker
        open={open}
        value={selectedConference}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedConference}
        setItems={setItems}
        placeholder="Select a conference"
        showTickIcon={true}
        showArrowIcon={true}
      />

      <Text style={{ marginVertical: 8 }} />

      <Button
        onPress={onPressAttendees}
        title="List attendees"
        color="#17635A"
        accessibilityLabel="Learn more about this purple button"
      />

      <Text style={attendeesStyles.attendees_list}>
        {selectedConference ? `NAME attendees` : "Here will be the attendees"}
      </Text>

      {conference.length > 0 ? (
        <FlatList
          data={conference}
          renderItem={({ item }) => <Text>{item.fullname}</Text>}
          keyExtractor={(item) => item.fullname}
        />
      ) : (
        <Text>No attendees yet!</Text>
      )}
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
  button: {
    marginTop: 24,
  },
  attendees_list: {
    marginTop: 24,
    fontSize: 20,
  },
});
