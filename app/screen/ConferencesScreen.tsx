import React, { useState } from "react";
import { Text, TextInput, View, FlatList, Button, Alert, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { globalStyles } from "./globalStyles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getCongressesByParticipant, removeAttendanceToCongress } from "../database/database";



export default function ConferencesScreen() {

  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');


  const handleRemoveConference = (id, participantID, congressID) => {
    setData(data.filter((item) => item.id !== id));
    removeAttendanceToCongress(participantID, congressID, (response) => {
      console.log(response);
    });
  }

  const handleCancelRegistration = (id, conferenceTitle, participantID, congressID) => {
    Alert.alert('Cancelar Registro', `Estas seguro de cancelar tu registro al congreso "${conferenceTitle}"?`,
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: () => handleRemoveConference(id, participantID, congressID),
          style: 'destructive'
        }
      ]
    );
  }

  const handleSearchCongresses = async () => {
    await getCongressesByParticipant(searchValue, (response) => {
      console.log(response);
      setData(response);
    });
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>consult conferences</Text>
      <Text style={styles.subTitle}>Here you can check your conference registrations</Text>

      <View style={styles.searchContainer} >
        <TextInput
          style={styles.input}
          value={searchValue}
          placeholder="Input lastname or email"
          onChangeText={(text) => setSearchValue(text)}
        />
        <TouchableOpacity style={styles.iconContainer} onPress={() => {
          handleSearchCongresses();
        }}>
          <Ionicons name="search" size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.subTitle}>Aqui veras tus congresos: </Text>

      {data.length > 0 ? <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardInfoContainer}>
              <Text style={styles.infoTitle}>{item.congress_name}</Text>
              <Text style={styles.infoDescription} numberOfLines={1} ellipsizeMode="tail">{item.description}</Text>
              <View style={styles.dateContainer}>
                <Ionicons name="calendar" size={30} color="blue" />
                <Text style={styles.date}>{item.start_date}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleCancelRegistration(item.id, item.congress_name, item.id, item.participant_id)}>
              <Ionicons name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
      /> : searchValue ? <Text>No hay congresos registrados</Text>
        : null}
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    padding: 32,
  },
  subTitle: {
    fontSize: 19,
    textAlign: "center",
    marginBottom: 32,
    color: "#555",
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'space-between'
  },
  input: {
    width: screenWidth * 0.70,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    justifyContent: 'space-between',
  },
  cardInfoContainer: {
    width: screenWidth * 0.65,
    paddingRight: 10,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5
  },
  infoDescription: {
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