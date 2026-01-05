import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons'; 

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Ionicons name="person" size={60} color={COLORS.primary} />
      </View>
      <Text style={styles.name}>Misafir Kullanıcı</Text>
      <Text style={styles.email}>misafir@flightapp.com</Text>
      
      <View style={styles.menuItem}>
        <Ionicons name="settings-outline" size={24} color={COLORS.dark} />
        <Text style={styles.menuText}>Ayarlar</Text>
      </View>
      <View style={styles.menuItem}>
        <Ionicons name="card-outline" size={24} color={COLORS.dark} />
        <Text style={styles.menuText}>Ödeme Yöntemleri</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondary, padding: 20, alignItems: 'center', paddingTop: 50 },
  avatarContainer: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', marginBottom: 20, elevation: 5 },
  name: { fontSize: 22, fontWeight: 'bold', color: COLORS.dark },
  email: { fontSize: 16, color: COLORS.gray, marginBottom: 40 },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, width: '100%', padding: 20, borderRadius: 15, marginBottom: 15, elevation: 2 },
  menuText: { fontSize: 18, color: COLORS.dark, marginLeft: 15, fontWeight: '600' }
});