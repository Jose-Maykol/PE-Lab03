import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';

export default function Main() {
  const [nombresApellidos, setNombresApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaEvento, setFechaEvento] = useState('');

  const handleRegistrar = () => {
    
    console.log('Nombres y Apellidos:', nombresApellidos);
    console.log('Correo Electrónico:', email);
    console.log('Número Telefónico:', telefono);
    console.log('Fecha del Evento:', fechaEvento);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombres y Apellidos:</Text>
      <TextInput
        style={styles.input}
        value={nombresApellidos}
        onChangeText={(text) => setNombresApellidos(text)}
      />

      <Text style={styles.label}>Correo Electrónico:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Número Telefónico:</Text>
      <TextInput
        style={styles.input}
        value={telefono}
        onChangeText={(text) => setTelefono(text)}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Fecha del Evento:</Text>
      <DatePicker
        style={styles.datePicker}
        date={fechaEvento}
        mode="date"
        placeholder="Seleccionar Fecha"
        format="YYYY-MM-DD"
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        onDateChange={(date) => setFechaEvento(date)}
      />

      <Button title="Registrar" onPress={handleRegistrar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
