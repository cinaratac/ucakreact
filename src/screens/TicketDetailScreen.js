
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
import { BookingContext } from '../context/BookingContext';

export default function TicketDetailScreen({ route, navigation }) {
 const { flight, seat } = route.params;
 const { addBooking } = useContext(BookingContext);
  const handleBooking = () => {
   
    addBooking(flight, seat);

   
    Alert.alert(
      "Harika!",
      "Biletiniz başarıyla oluşturuldu.",
      [
        { 
          text: "Biletlerime Git", 
         
          onPress: () => navigation.navigate('MyTickets')
        }
      ]
    );
  }

  return (
    <View style={styles.detailContainer}>
      <View style={styles.ticketCard}>
        <Text style={styles.ticketTitle}>Uçuş Özeti</Text>
        <View style={styles.ticketRow}>
          <Text style={styles.ticketLabel}>Havayolu:</Text>
          <Text style={styles.ticketValue}>{flight.airline}</Text>
        </View>
        <View style={styles.ticketRow}>
          <Text style={styles.ticketLabel}>Tarih:</Text>
          <Text style={styles.ticketValue}>{flight.date}</Text>
        </View>
        <View style={styles.ticketRow}>
          <Text style={styles.ticketLabel}>Kalkış:</Text>
          <Text style={styles.ticketValue}>{flight.time} ({flight.from})</Text>
        </View>
        <View style={styles.ticketRow}>
  <Text style={styles.ticketLabel}>Koltuk No:</Text>
  <Text style={[styles.ticketValue, { color: COLORS.accent }]}>{seat || 'Rastgele'}</Text>
</View>
        <View style={styles.ticketRow}>
          <Text style={styles.ticketLabel}>Süre:</Text>
          <Text style={styles.ticketValue}>{flight.duration}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Toplam Tutar:</Text>
          <Text style={styles.totalPrice}>{flight.price} {flight.currency}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookButtonText}>Rezervasyonu Tamamla</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  detailContainer: { flex: 1, padding: 20, backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center' },
  ticketCard: { backgroundColor: COLORS.white, padding: 25, borderRadius: 20, elevation: 3, width: '100%' },
  ticketTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: COLORS.dark },
  ticketRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  ticketLabel: { fontSize: 16, color: COLORS.gray },
  ticketValue: { fontSize: 16, fontWeight: 'bold', color: COLORS.dark },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 15 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: COLORS.dark },
  totalPrice: { fontSize: 24, fontWeight: 'bold', color: COLORS.accent },
  bookButton: { backgroundColor: COLORS.primary, paddingVertical: 18, borderRadius: 15, marginTop: 30, alignItems: 'center', width: '100%', shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 },
  bookButtonText: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
});