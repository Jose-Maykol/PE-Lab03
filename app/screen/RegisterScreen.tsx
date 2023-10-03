import React, { useEffect, useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";

import DateTimePicker from '@react-native-community/datetimepicker';
import { globalStyles } from "./globalStyles";
import { getCongresses, getParticipants, insertAttendance, insertParticipant } from "../database/database";
import DropDownPicker from "react-native-dropdown-picker";

export default function RegisterScreen() {
  const [open, setOpen] = useState(false);
  const [participantID, setParticipantID] = useState(null)
  const [selectedConference, setSelectedConference] = useState(null);
  const [congresses, setCongresses] = useState([]);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    getCongresses((results) => {
      console.log("Congresses:", congresses);
      setCongresses(results)
    });
  }, []);

  const onPress = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setEventDate(currentDate);
  };

  const handleRegister = async () => {
    console.log("Name:", name);
    console.log("Lastname:", lastname);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Event Date:", eventDate);
    console.log("Conference:", selectedConference);
    await insertParticipant(
      {
        name: name,
        last_name: lastname,
        email: email,
        phone_number: phone,
        event_date: eventDate.toString().split("T")[0],
      },
      (insertedId) => {
        console.log(`Participant created with id: ${insertedId}`);
        setParticipantID(insertedId)
      }
    );

    insertAttendance(participantID, selectedConference);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Register</Text>
      <TextInput
        style={styles.input}
        value={name}
        placeholder="Nombres:"
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={styles.input}
        value={lastname}
        placeholder="Apellidos:"
        onChangeText={(text) => setLastname(text)}
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        placeholder="Email:"
      />

      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={(text) => setPhone(text)}
        keyboardType="phone-pad"
        placeholder="Numero:"
      />

      <DropDownPicker
        style={styles.select}
        open={open}
        value={selectedConference}
        items={congresses}
        setOpen={setOpen}
        setValue={setSelectedConference}
        setItems={setCongresses}
        placeholder="Congreso"
        showTickIcon={true}
        showArrowIcon={true}
      />

      
      <TouchableOpacity style={styles.datePicker} onPress={onPress}>
        <Text>Fecha del evento</Text>
      </TouchableOpacity>

      {show && (<DateTimePicker
        value={eventDate}
        mode="date"

        onChange={onChange}
      />)}

      <View style={styles.button}>
        <Button title="Save" onPress={handleRegister} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },

  select: {
    backgroundColor: "transparent",
  },

  datePicker: {
    backgroundColor: 'transparent',
    marginTop: 24,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 32,
  },
  button: {
    marginTop: 24,
    width: "100%",
    borderRadius: 16,
    padding: 8,
  },
});
