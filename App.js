// Dosya: App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // İkonları buradan çekiyoruz
import SeatSelectionScreen from './src/screens/SeatSelectionScreen';
// Ekranlar
import HomeScreen from './src/screens/HomeScreen';
import FlightListScreen from './src/screens/FlightListScreen';
import TicketDetailScreen from './src/screens/TicketDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen'; // Yeni eklediğimiz ekran
import MyTicketsScreen from './src/screens/MyTicketsScreen';
// Renkler
import { COLORS } from './src/constants/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- 1. ARAMA İÇİN STACK NAVİGASYONU (İÇ AKIŞ) ---
// Kullanıcı "Ara" sekmesindeyken sayfalar arası geçişi bu yönetir.
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="Search" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="FlightList" 
        component={FlightListScreen} 
        options={{ title: 'Uçuşlar' }}
      />
      <Stack.Screen 
        name="TicketDetail" 
        component={TicketDetailScreen} 
        options={{ title: 'Bilet Detayı' }}
      />
      <Stack.Screen 
  name="SeatSelection" 
  component={SeatSelectionScreen} 
  options={{ title: 'Koltuk Seçimi', headerBackTitleVisible: false }} 
/>
    </Stack.Navigator>
  );
}

// --- 2. ANA TAB NAVİGASYONU (DIŞ İSKELET) ---
export default function App() {
  return (
    <BookingProvider>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, // Tab'ların kendi header'ı olmasın
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarStyle: { 
            paddingBottom: 5, 
            height: 60,
            borderTopWidth: 0,
            elevation: 10, // Android gölge
            shadowColor: '#000', // iOS gölge
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          // İkon Ayarları
          tabBarIcon: ({ focused, color, size }) => {
  let iconName;

  if (route.name === 'Ana Sayfa') {
    iconName = focused ? 'airplane' : 'airplane-outline';
  } else if (route.name === 'Biletlerim') { // YENİ
    iconName = focused ? 'ticket' : 'ticket-outline';
  } else if (route.name === 'Profil') {
    iconName = focused ? 'person' : 'person-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
},
        })}
      >
        <Tab.Screen name="Ana Sayfa" component={HomeStack} />
        <Tab.Screen name="Biletlerim" component={MyTicketsScreen} />
        <Tab.Screen name="Profil" component={ProfileScreen} />
        
      </Tab.Navigator>
    </NavigationContainer>
    </BookingProvider>
  );
}