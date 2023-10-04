import React, { useEffect, useState } from "react";
import { Text, View, Button, StyleSheet, FlatList, Dimensions } from "react-native";
import { globalStyles } from "./globalStyles";
import { getAllCongresses } from "../database/database";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function HomeScreen({ navigation }) {

  const [congresses, setCongresses] = useState([]);
  useEffect(() => {
    getAllCongresses((results) => {
      console.log("Congresses:", congresses);
      setCongresses(results)
    });
  }, []);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Information about THE event</Text>
      <Text style={styles.subTitle}>Here you can check the information about the event</Text>
      {congresses.length > 0 ? <FlatList
        data={congresses}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardInfoContainer}>
              <Text style={styles.infoTitle}>{item.congress_name}</Text>
              <Text style={styles.infoDescription} numberOfLines={3} ellipsizeMode="tail">{item.description}</Text>
              <View style={styles.dateContainer}>
                <Ionicons name="calendar" size={30} color="#007BFF" />
                <Text style={styles.date}>{item.start_date}</Text>
              </View>
            </View>
          </View>
        )}
      /> : congresses ? <Text>No hay congresos</Text>
      : null}
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 19,
    textAlign: "center",
    marginBottom: 32,
    color: "#555",
  },
  container: {
    padding: 32,
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
    width: screenWidth * 0.9,
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
