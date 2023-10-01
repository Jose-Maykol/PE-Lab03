import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";

import DatePicker from "react-native-datepicker";

export default function RegisterScreen() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleRegister = () => {
    console.log("Fullname:", fullname);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Event Date:", eventDate);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#00B5A0",
      }}
    >
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        value={fullname}
        placeholder="Fullname:"
        onChangeText={(text) => setFullname(text)}
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
        placeholder="Phone:"
      />

      <DatePicker
        // style={styles.datePicker}
        date={eventDate}
        mode="date"
        placeholder="Select date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        onDateChange={(date) => setEventDate(date)}
      />

      <View style={styles.button}>
        <Button title="Save" onPress={handleRegister} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#17635A",
    fontFamily: "sans-serif",
    textTransform: "uppercase",
    marginBottom: 32,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
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
    width: "60%",
    borderRadius: 16,
    padding: 8
  },
});
