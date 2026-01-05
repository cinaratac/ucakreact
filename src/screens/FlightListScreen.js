// Dosya: src/screens/FlightListScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { flightsData } from '../data'; // Veriyi bir üst klasörden çektik
import { COLORS } from '../constants/theme';

export default function FlightListScreen({ route, navigation }) {
  const { from, to } = route.params;

  const filteredFlights = flightsData.filter(
    (flight) => flight.from.includes(from) || flight.to.includes(to)
  );
  const displayFlights = filteredFlights.length > 0 ? filteredFlights : flightsData;

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.flightCard}
      // FlightListScreen.js içinde
onPress={() => navigation.navigate('SeatSelection', { flight: item })}
    >
      <View style={styles.flightHeader}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>{item.logo}</Text>
        </View>
        <Text style={styles.airlineName}>{item.airline}</Text>
        <Text style={styles.price}>{item.price} {item.currency}</Text>
      </View>

      <View style={styles.routeContainer}>
        <View>
          <Text style={styles.airportCode}>{item.from}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <View style={styles.durationContainer}>
          <Text style={styles.durationText}>------- ✈ -------</Text>
          <Text style={styles.durationLabel}>{item.duration}</Text>
        </View>
        <View>
          <Text style={styles.airportCode}>{item.to}</Text>
          <Text style={styles.timeText}>Varış</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.listContainer}>
      <Text style={styles.resultTitle}>{from} - {to} için sonuçlar</Text>
      <FlatList
        data={displayFlights}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: { flex: 1, padding: 20, backgroundColor: COLORS.secondary },
  resultTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: COLORS.dark },
  flightCard: { backgroundColor: COLORS.white, borderRadius: 12, padding: 15, marginBottom: 15, elevation: 2 },
  flightHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  logoContainer: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center' },
  logoText: { fontWeight: 'bold', color: COLORS.primary },
  airlineName: { flex: 1, marginLeft: 10, fontSize: 16, fontWeight: 'bold', color: COLORS.dark },
  price: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary },
  routeContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  airportCode: { fontSize: 20, fontWeight: 'bold', color: COLORS.dark },
  timeText: { color: COLORS.gray, fontSize: 14 },
  durationContainer: { alignItems: 'center' },
  durationText: { color: '#d1d5db', fontSize: 12 },
  durationLabel: { color: COLORS.gray, fontSize: 12, fontWeight: '500' },
});