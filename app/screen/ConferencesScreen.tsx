import React, { useState } from "react";
import { Text, View, FlatList, Button, Alert, StyleSheet, Dimensions } from "react-native";
import { globalStyles } from "./globalStyles";
import Ionicons from "react-native-vector-icons/Ionicons";

const data = [
  {
    id: '1',
    title: 'Congreso de Tecnología 2023',
    description: 'Un congreso sobre las últimas tendencias en tecnología.',
    date: '10 de Noviembre, 2023',
    cost: '$100'
  },
  {
    id: '2',
    title: 'Congreso de Tecnología 2024',
    description: 'Un congreso sobre las últimas tendencias en tecnología.',
    date: '10 de Noviembre, 2024',
    cost: '$100'
  },
  {
    id: '3',
    title: 'Congreso de Tecnología 2025',
    description: 'Un congreso sobre las últimas tendencias en tecnología.',
    date: '10 de Noviembre, 2025',
    cost: '$100'
  },
  {
    id: '4',
    title: 'Congreso de Tecnología 2026',
    description: 'Un congreso sobre las últimas tendencias en tecnología.',
    date: '10 de Noviembre, 2026',
    cost: '$100'
  },
  {
    id: '5',
    title: 'Congreso de Tecnología 2027',
    description: 'Un congreso sobre las últimas tendencias en tecnología.',
    date: '10 de Noviembre, 2027',
    cost: '$100'
  },
];

export default function ConferencesScreen({ navigation }) {

  const [conferencesData, setConferencesData] = useState(data);

  const handleRemoveConference = (id) => {
    setConferencesData(conferencesData.filter((item) => item.id !== id));
  }

  const handleCancelRegistration = (id, conferenceTitle) => {
    Alert.alert('Cancelar Registro', `Estas seguro de cancelar tu registro al congreso "${conferenceTitle}"?`,
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: () => handleRemoveConference(id),
          style: 'destructive'
        }
      ]
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Mis Congresos</Text>
      <Text style={styles.title}>Aqui se muestran los congresos en los que has registrado. Puedes cancelar tu inscripción en cualquier congreso.</Text>
      <FlatList
        data={conferencesData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">{item.description}</Text>
              <View style={styles.dateContainer}>
                <Ionicons name="calendar" size={20} color="red" />
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Cancelar inscripción" onPress={() => handleCancelRegistration(item.id, item.title)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
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
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  infoContainer: {
    width: screenWidth * 0.57,
    paddingRight: 10,
  },
  buttonContainer: {
    width: screenWidth * 0.27,
    fontSize: 10,
    flexWrap: 'wrap'
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5
  },
  description: {
    fontSize: 13,
    marginBottom: 5,
    flexShrink: 1
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginBottom: 5
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
});