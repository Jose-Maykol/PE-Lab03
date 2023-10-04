import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList, Button } from "react-native";

import DropDownPicker from "react-native-dropdown-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

import { globalStyles } from "./globalStyles";

// TODO: Get data from DB
const congresses = [
  {
    id: 0,
    congress_name: "Apple Conference XVI",
    description: "Annual Apple developer conference",
    start_date: "2023-09-20",
    end_date: "2023-09-20",
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
    congress_name: "CodeWave IX",
    description: "CodeWave developer conference",
    start_date: "2023-10-05",
    end_date: "2023-10-05",
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
    congress_name: "AppCon X",
    description: "Annual AppCon conference",
    start_date: "2023-11-15",
    end_date: "2023-11-15",
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
    congress_name: "MobileTech XIII",
    description: "MobileTech developer summit",
    start_date: "2023-12-03",
    end_date: "2023-12-03",
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
    congress_name: "DevSync VII",
    description: "DevSync developer conference",
    start_date: "2024-01-18",
    end_date: "2024-01-18",
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
    congress_name: "AppTalk I",
    description: "Inaugural AppTalk event",
    start_date: "2024-02-10",
    end_date: "2024-02-10",
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
  const [selectedCongress, setSelectedCongress] = useState(null);
  // TODO: Get Conferences from DB
  const [items, setItems] = useState([
    { label: "Apple Conference XVI", value: "0" },
    { label: "CodeWave IX", value: "1" },
    { label: "AppCon X", value: "2" },
    { label: "MobileTech XIII", value: "3" },
    { label: "DevSync VII", value: "4" },
    { label: "AppTalk I", value: "5" },
  ]);

  const [attendees, setAttendees] = useState([]);
  const [congressName, setCongressName] = useState("");

  const getAttendees = () => {
    if (!selectedCongress) {
      return [];
    }

    const congress = congresses.find(
      (conf) => conf.id.toString() === selectedCongress
    );

    setCongressName(congress.congress_name);

    return congress ? congress.attendees : [];
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
        value={selectedCongress}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedCongress}
        setItems={setItems}
        placeholder="Select a conference"
        showTickIcon={true}
        showArrowIcon={true}
      />

      <Text style={{ marginVertical: 12 }} />

      <Button
        onPress={onPressAttendees}
        title="Check attendees"
        color="#007BFF"
        accessibilityLabel="Learn more about this purple button"
      />

      <Text style={attendeesStyles.attendees_list}>
        {congressName
          ? `${congressName} - Attendees`
          : "Here will be the attendees"}
      </Text>

      {attendees.length > 0 ? (
        <FlatList
          data={attendees}
          renderItem={({ item }) => (
            <View style={attendeesStyles.card}>
              <View style={attendeesStyles.attendeeContainer}>
                <Ionicons name="person" size={24} color="#007BFF" />
                <View style={attendeesStyles.attendee}>
                  <Text style={attendeesStyles.fullname}>{item.fullname}</Text>
                  <Text style={attendeesStyles.email}>{item.email}</Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.fullname}
        />
      ) : congressName ? (
        <Text>No attendees yet!</Text>
      ) : null}
    </View>
  );
}

const attendeesStyles = StyleSheet.create({
  container: {
    padding: 32,
  },
  description: {
    fontSize: 19,
    textAlign: "center",
    marginBottom: 32,
    color: "#555",
  },
  button: {
    marginTop: 24,
  },
  attendees_list: {
    marginTop: 36,
    fontSize: 24,
    marginBottom: 24,
    color: "#007BFF",
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "italic",
  },

  card: {
    backgroundColor: "#fff",
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  attendeeContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginBottom: 5,
    flex: 1,
  },
  attendee: {
    flexDirection: "column",
    marginLeft: 16,
    gap: 5,
    flex: 1,
    justifyContent: "center",
  },
  fullname: {
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "bold",
  },
  email: {
    color: "#888",
    fontSize: 16,
  },
});
