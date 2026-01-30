import React from 'react';
import { View, ScrollView, StatusBar, StyleSheet, Alert } from 'react-native';
import { COLORS } from '@/constants/theme';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

// Imports locales
import { AmenityDetail } from '@/types/amenity';
import { DetailHero } from '@/components/amenities/detail/DetailHero';
import { DetailInfo } from '@/components/amenities/detail/DetailInfo';
import { StickyFooter } from '@/components/amenities/detail/StickyFooter';

// MOCK DATA ACTUALIZADO
const MOCK_DETAIL: AmenityDetail = {
  id: '1',
  title: 'Alberca Infinita',
  image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop',
  description: 'Relájate en nuestra alberca infinita con vistas panorámicas de la ciudad. Ideal para nadar por las mañanas.',
  location: 'Roof Garden • Torre A',
  rating: 4.9,
  reviews: 128,
  status: 'available',
  nextSlot: '14:00', // Informativo
  availableSlots: ['14:00', '15:30', '17:00', '18:30', '20:00'], // <--- Datos para el selector
  capacity: 10,
  features: [
    { icon: 'wifi', label: 'Wi-Fi Alta Vel.' },
    { icon: 'sun', label: 'Camastros' },
    { icon: 'droplet', label: 'Regaderas' },
    { icon: 'sunset', label: 'Vista Panorámica' },
    { icon: 'coffee', label: 'Bar de Jugos' },
    { icon: 'shield', label: 'Seguridad' },
  ],
  rules: [
    'Uso obligatorio de traje de baño',
    'No se permiten alimentos de vidrio',
    'Reserva máxima de 2 horas',
    'Ducha obligatoria antes de entrar'
  ]
};

export default function AmenityDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const handleBack = () => {
    router.back(); 
  };

  // Ahora recibe el horario seleccionado
  const handleReserve = (slot: string) => {
    console.log(`Reservando turno: ${slot}`);
    Alert.alert("Reserva Iniciada", `Turno seleccionado: ${slot}`);
    // Aquí navegarías a la confirmación
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <DetailHero 
            image={MOCK_DETAIL.image} 
            onBack={handleBack} 
        />
        <DetailInfo data={MOCK_DETAIL} />
      </ScrollView>

      <StickyFooter 
        status={MOCK_DETAIL.status} 
        availableSlots={MOCK_DETAIL.availableSlots} // Pasamos la lista
        onReserve={handleReserve}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.ui.white, // O '#FFFFFF'
  },
  scrollContent: {
    // Aumentamos el paddingBottom para compensar el footer más alto (botones + horarios)
    paddingBottom: 180, 
  },
});