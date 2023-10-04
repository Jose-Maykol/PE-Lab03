import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Button } from "react-native";

import DropDownPicker from "react-native-dropdown-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

import { globalStyles } from "./globalStyles";
import { getCongresses, getParticipantsByCongress } from "../database/database";

export default function AttendeesScreen() {
  const [open, setOpen] = useState(false);
  const [selectedCongress, setSelectedCongress] = useState(null);
  const [congresses, setCongresses] = useState([]);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    getCongresses((results) => {
      console.log("Congresses:", congresses);
      setCongresses(results);
    });
  }, []);

  const handleCongressSelection = async (selectedCongressId) => {
    getParticipantsByCongress(selectedCongressId, (participants) => {
      // Hacer algo con los asistentes, como mostrarlos en tu interfaz
      console.log("Congress Attendees:", participants);
      setAttendees(participants);
    });
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
        items={congresses}
        setOpen={setOpen}
        setValue={setSelectedCongress}
        setItems={setCongresses}
        placeholder="Select a conference"
        showTickIcon={true}
        showArrowIcon={true}
      />

      <Text style={{ marginVertical: 12 }} />

      <Button
        onPress={() => handleCongressSelection(selectedCongress)}
        title="Check attendees"
        color="#007BFF"
        accessibilityLabel="Learn more about this purple button"
      />

      <Text style={attendeesStyles.attendees_list}>
        {attendees.length > 0
          ? `List of Attendees`
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
                  <Text style={attendeesStyles.fullname}>{item.name} {item.last_name}</Text>
                  <Text style={attendeesStyles.email}>{item.email}</Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : attendees.length == 0 ? (
        <Text style={{textAlign: "center"}}>No attendees yet!</Text>
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
