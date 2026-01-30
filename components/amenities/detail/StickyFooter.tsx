import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/theme';

interface StickyFooterProps {
  status: 'available' | 'busy' | 'maintenance';
  availableSlots: string[];
  onReserve: (slot: string) => void;
}

export const StickyFooter = ({ status, availableSlots, onReserve }: StickyFooterProps) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Seleccionar automáticamente el primer horario si hay disponibilidad
  useEffect(() => {
    if (status === 'available' && availableSlots.length > 0) {
      setSelectedSlot(availableSlots[0]);
    }
  }, [availableSlots, status]);

  const handlePress = () => {
    if (selectedSlot) onReserve(selectedSlot);
  };

  return (
    <View style={styles.wrapper}>
      {/* SECCIÓN: Selector de Horarios (Solo si está disponible) */}
      {status === 'available' && (
        <View style={styles.slotsContainer}>
          <Text style={styles.slotsTitle}>Horarios hoy</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.slotsScroll}
          >
            {availableSlots.map((slot, index) => {
              const isSelected = selectedSlot === slot;
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.slotChip, isSelected && styles.slotChipSelected]}
                  onPress={() => setSelectedSlot(slot)}
                >
                  <Text style={[styles.slotText, isSelected && styles.slotTextSelected]}>
                    {slot}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}

      {/* SECCIÓN: Acción Principal */}
      <View style={styles.actionContainer}>
        <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>Horario elegido</Text>
            <Text style={styles.infoValue}>
              {status === 'available' ? (selectedSlot || '--:--') : 'No disponible'}
            </Text>
        </View>

        <TouchableOpacity 
            style={[
              styles.reserveBtn, 
              (status !== 'available' || !selectedSlot) && styles.disabledBtn
            ]} 
            onPress={handlePress}
            disabled={status !== 'available' || !selectedSlot}
        >
            <Text style={styles.btnText}>
                {status === 'available' ? 'Reservar' : 'Notificarme'}
            </Text>
        </TouchableOpacity>
      </View>
      
      {/* Fondo seguro para iPhone X+ */}
      <SafeAreaView edges={['bottom']} style={{ backgroundColor: '#FFF' }} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 20,
    zIndex: 100,
  },
  // Slots Styles
  slotsContainer: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  slotsTitle: {
    paddingHorizontal: 24,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text.secondary, // Asegúrate de tener este color o usa '#64748b'
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  slotsScroll: {
    paddingHorizontal: 24,
    gap: 10, // Espacio entre chips
  },
  slotChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  slotChipSelected: {
    backgroundColor: '#E0F2FE', // Color muy claro (Brand Light)
    borderColor: COLORS.brand.tealDark, // Borde activo
  },
  slotText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  slotTextSelected: {
    color: COLORS.brand.tealDark,
    fontWeight: '700',
  },
  // Action Bar Styles
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  infoCol: {
    justifyContent: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text.primary,
    letterSpacing: -0.5,
  },
  reserveBtn: {
    backgroundColor: COLORS.brand.tealDark,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: COLORS.brand.tealDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledBtn: {
    backgroundColor: '#cbd5e1',
    shadowOpacity: 0,
    elevation: 0,
  },
  btnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});