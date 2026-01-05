// Dosya: src/screens/MyTicketsScreen.js
import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { BookingContext } from '../context/BookingContext'; // Veriyi buradan çekeceğiz
import { COLORS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function MyTicketsScreen() {
  const { myBookings } = useContext(BookingContext);

  const renderTicket = ({ item }) => (
    <View style={styles.ticketCard}>
      <View style={styles.headerRow}>
        <Text style={styles.airline}>{item.airline}</Text>
        <Text style={styles.pnr}>PNR: {item.pnr}</Text>
      </View>
      
      <View style={styles.routeRow}>
        <View>
          <Text style={styles.code}>{item.from}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Ionicons name="airplane" size={24} color={COLORS.primary} />
        <View>
          <Text style={styles.code}>{item.to}</Text>
          <Text style={styles.seat}>Koltuk: {item.seat}</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.date}>Tarih: {item.date}</Text>
        <Text style={styles.price}>{item.price} {item.currency}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biletlerim ({myBookings.length})</Text>
      
      {myBookings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={80} color={COLORS.gray} />
          <Text style={styles.emptyText}>Henüz biletin yok.</Text>
        </View>
      ) : (
        <FlatList
          data={myBookings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderTicket}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondary, padding: 20, paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.dark, marginBottom: 20 },
  ticketCard: { backgroundColor: COLORS.white, borderRadius: 15, padding: 20, marginBottom: 15, elevation: 3 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  airline: { fontWeight: 'bold', fontSize: 16, color: COLORS.dark },
  pnr: { color: COLORS.gray, fontSize: 14 },
  routeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  code: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary },
  time: { color: COLORS.gray },
  seat: { fontWeight: 'bold', color: COLORS.accent, marginTop: 5 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#f3f4f6', paddingTop: 10 },
  date: { color: COLORS.gray },
  price: { fontWeight: 'bold', color: COLORS.dark },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -50 },
  emptyText: { marginTop: 10, fontSize: 16, color: COLORS.gray }
});