// Dosya: src/screens/SeatSelectionScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { COLORS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function SeatSelectionScreen({ route, navigation }) {
  const { flight } = route.params;
  const [selectedSeat, setSelectedSeat] = useState(null);

  // 6 Sıralı, 4 Koltuklu (A,B - Koridor - C,D) Mock Data
  // 'taken': Dolu, 'free': Boş
  const ROWS = [
    { id: 1, seats: [{ lbl: '1A', status: 'taken' }, { lbl: '1B', status: 'taken' }, { lbl: '1C', status: 'free' }, { lbl: '1D', status: 'free' }] },
    { id: 2, seats: [{ lbl: '2A', status: 'free' }, { lbl: '2B', status: 'free' }, { lbl: '2C', status: 'taken' }, { lbl: '2D', status: 'taken' }] },
    { id: 3, seats: [{ lbl: '3A', status: 'free' }, { lbl: '3B', status: 'free' }, { lbl: '3C', status: 'free' }, { lbl: '3D', status: 'free' }] },
    { id: 4, seats: [{ lbl: '4A', status: 'taken' }, { lbl: '4B', status: 'free' }, { lbl: '4C', status: 'free' }, { lbl: '4D', status: 'taken' }] },
    { id: 5, seats: [{ lbl: '5A', status: 'free' }, { lbl: '5B', status: 'free' }, { lbl: '5C', status: 'free' }, { lbl: '5D', status: 'free' }] },
    { id: 6, seats: [{ lbl: '6A', status: 'free' }, { lbl: '6B', status: 'taken' }, { lbl: '6C', status: 'taken' }, { lbl: '6D', status: 'free' }] },
  ];

  const handleSeatPress = (seat) => {
    if (seat.status === 'taken') return;
    setSelectedSeat(seat.lbl);
  };

  const handleConfirm = () => {
    if (!selectedSeat) {
      Alert.alert('Uyarı', 'Lütfen bir koltuk seçiniz.');
      return;
    }
    // Seçilen koltuk bilgisini de ekleyerek Detay sayfasına gidiyoruz
    navigation.navigate('TicketDetail', { flight: flight, seat: selectedSeat });
  };

  const renderSeat = (seat) => {
    const isSelected = selectedSeat === seat.lbl;
    const isTaken = seat.status === 'taken';

    let backgroundColor = COLORS.white;
    let borderColor = '#e5e7eb';
    let iconColor = '#d1d5db';

    if (isTaken) {
      backgroundColor = '#e5e7eb'; // Gri (Dolu)
      iconColor = '#9ca3af';
    } else if (isSelected) {
      backgroundColor = COLORS.accent; // Turuncu (Seçili)
      borderColor = COLORS.accent;
      iconColor = COLORS.white;
    } else {
      borderColor = COLORS.primary; // Mavi çerçeve (Boş)
      iconColor = COLORS.primary;
    }

    return (
      <TouchableOpacity
        key={seat.lbl}
        disabled={isTaken}
        onPress={() => handleSeatPress(seat)}
        style={[styles.seatBox, { backgroundColor, borderColor }]}
      >
        <Ionicons name="person" size={20} color={iconColor} />
        <Text style={[styles.seatText, isSelected && { color: COLORS.white }]}>{seat.lbl}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{flight.from} ➔ {flight.to}</Text>
        <Text style={styles.subTitle}>Koltuk Seçimi</Text>
      </View>

      {/* Uçak Gövdesi */}
      <ScrollView contentContainerStyle={styles.planeContainer}>
        <View style={styles.cockpit} />
        
        {ROWS.map((row) => (
          <View key={row.id} style={styles.rowContainer}>
            {/* Sol Taraf (A, B) */}
            <View style={styles.seatSide}>
              {renderSeat(row.seats[0])}
              {renderSeat(row.seats[1])}
            </View>

            {/* Koridor */}
            <Text style={styles.rowNumber}>{row.id}</Text>

            {/* Sağ Taraf (C, D) */}
            <View style={styles.seatSide}>
              {renderSeat(row.seats[2])}
              {renderSeat(row.seats[3])}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Alt Bilgi ve Buton */}
      <View style={styles.footer}>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: '#e5e7eb' }]} />
            <Text style={styles.legendText}>Dolu</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { borderColor: COLORS.primary, borderWidth: 2 }]} />
            <Text style={styles.legendText}>Boş</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: COLORS.accent }]} />
            <Text style={styles.legendText}>Seçili</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>
            {selectedSeat ? `Koltuk ${selectedSeat} ile Devam Et` : 'Koltuk Seçiniz'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondary },
  header: { padding: 20, backgroundColor: COLORS.primary, paddingBottom: 30, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingTop: 50 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.white, textAlign: 'center' },
  subTitle: { fontSize: 14, color: '#e0e7ff', textAlign: 'center', marginTop: 5 },
  planeContainer: { alignItems: 'center', paddingVertical: 20 },
  cockpit: { width: 0, height: 0, borderLeftWidth: 40, borderRightWidth: 40, borderBottomWidth: 50, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#d1d5db', marginBottom: 20, borderRadius: 30 },
  rowContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  seatSide: { flexDirection: 'row' },
  rowNumber: { width: 30, textAlign: 'center', fontWeight: 'bold', color: COLORS.gray, fontSize: 16 },
  seatBox: { width: 45, height: 45, marginHorizontal: 4, borderRadius: 8, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  seatText: { fontSize: 10, marginTop: 2, fontWeight: 'bold', color: COLORS.dark },
  footer: { padding: 20, backgroundColor: COLORS.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, elevation: 10 },
  legendContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 16, height: 16, borderRadius: 8, marginRight: 8 },
  legendText: { color: COLORS.gray },
  button: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
});