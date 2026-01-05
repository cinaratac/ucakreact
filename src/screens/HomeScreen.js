// Dosya: src/screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme'; // Renkleri buradan çektik

export default function HomeScreen({ navigation }) {
  const [fromCity, setFromCity] = useState('IST');
  const [toCity, setToCity] = useState('');

  const handleSearch = () => {
    if (!fromCity || !toCity) {
      Alert.alert('Hata', 'Lütfen kalkış ve varış noktalarını giriniz.');
      return;
    }
    navigation.navigate('FlightList', { from: fromCity, to: toCity });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nereye uçmak istersin?</Text>
        <Text style={styles.headerSubtitle}>Dünyayı keşfetmeye başla.</Text>
      </View>

      <View style={styles.searchCard}>
        <Text style={styles.inputLabel}>Nereden</Text>
        <TextInput
          style={styles.input}
          placeholder="Örn: IST"
          value={fromCity}
          onChangeText={(text) => setFromCity(text.toUpperCase())}
        />

        <Text style={styles.inputLabel}>Nereye</Text>
        <TextInput
          style={styles.input}
          placeholder="Örn: NYC, LHR"
          value={toCity}
          onChangeText={(text) => setToCity(text.toUpperCase())}
        />

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Uçuş Ara</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondary },
  header: { padding: 20, backgroundColor: COLORS.primary, paddingBottom: 40, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, paddingTop: 60 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: COLORS.white },
  headerSubtitle: { color: '#e0e7ff', fontSize: 16, marginTop: 5 },
  searchCard: { backgroundColor: COLORS.white, marginHorizontal: 20, marginTop: -30, borderRadius: 15, padding: 20, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  inputLabel: { color: COLORS.gray, marginBottom: 5, marginTop: 10, fontSize: 14 },
  input: { borderBottomWidth: 1, borderBottomColor: '#e5e7eb', paddingVertical: 10, fontSize: 18, color: COLORS.dark, fontWeight: '600' },
  searchButton: { backgroundColor: COLORS.accent, paddingVertical: 15, borderRadius: 10, marginTop: 25, alignItems: 'center' },
  searchButtonText: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
});