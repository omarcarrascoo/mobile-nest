import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  Switch
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { COLORS } from '@/constants/theme';
import { UserProfile } from '@/types/user';

// Importación de Componentes
import ProfileHeader from '@/components/profile/ProfileHeader';
import SectionHeader from '@/components/ui/FormHeader';
import LeaseInfo from '@/components/profile/LeaseInfo';
import DocumentsList from '@/components/profile/DocumentList';

// --- MOCK DATA CON TIPADO ---
const MOCK_USER: UserProfile = {
  id: 'uuid-123',
  fullName: 'Alejandra Martínez',
  unitNumber: 'Penthouse B-42',
  email: 'ale.martinez@gmail.com',
  phone: '+52 55 1234 5678',
  status: 'ACTIVE',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80',
  stats: {
    balanceOwed: 0,
    delinquencyRate: 0,
    lastPaymentDate: '2023-12-05',
  },
  lease: {
    startDate: '01 Ene 2023',
    endDate: '01 Ene 2024',
    rentAmount: '$18,500.00',
    securityDeposit: '$18,500.00',
    daysLeft: 120,
  },
  contacts: [
    { id: '1', name: 'Roberto Martínez', relation: 'Padre', phone: '+52 55 9876 5432' },
    { id: '2', name: 'Lucía Méndez', relation: 'Cónyuge', phone: '+52 55 1111 2222' },
  ],
  documents: [
    { id: '1', type: 'LEASE', name: 'Contrato 2023.pdf', size: '2.4 MB' },
    { id: '2', type: 'ID', name: 'Identificación INE.jpg', size: '1.1 MB' },
  ]
};

// Pequeño componente local utilitario
interface InfoRowProps {
    icon: keyof typeof Feather.glyphMap;
    label: string;
    value: string;
}

const InfoRow = ({ icon, label, value }: InfoRowProps) => (
    <View style={styles.infoRow}>
        <View style={styles.infoIconBox}>
            <Feather name={icon} size={18} color={COLORS.text.label} />
        </View>
        <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    </View>
);

export default function UserProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background.base} />

      {/* 1. Header del Perfil */}
      <ProfileHeader user={MOCK_USER} />

      <View style={styles.sheetContainer}>
        <ScrollView 
            contentContainerStyle={styles.scrollContent} 
            showsVerticalScrollIndicator={false}
        >
            {/* 2. Información de Contacto */}
            <View style={styles.card}>
                <SectionHeader title="Mis Datos" icon="user" action="Editar" onActionPress={() => {}} />
                
                <InfoRow icon="mail" label="Correo Electrónico" value={MOCK_USER.email} />
                <View style={styles.separator} />
                <InfoRow icon="smartphone" label="Teléfono Móvil" value={MOCK_USER.phone} />
            </View>

            {/* 3. Contrato */}
            <LeaseInfo lease={MOCK_USER.lease} />

            {/* 4. Documentos */}
            <DocumentsList documents={MOCK_USER.documents} />

            {/* 5. Contactos de Emergencia */}
            <View style={styles.card}>
                <SectionHeader title="Emergencia" icon="shield" action="+ Agregar" />
                {MOCK_USER.contacts.map((contact, index) => (
                    <View key={contact.id}>
                        <View style={styles.contactRow}>
                            <View style={styles.avatarPlaceholder}>
                                <Text style={styles.avatarInitials}>{contact.name.charAt(0)}</Text>
                            </View>
                            <View style={styles.contactInfo}>
                                <Text style={styles.contactName}>{contact.name}</Text>
                                <Text style={styles.contactRelation}>{contact.relation} • {contact.phone}</Text>
                            </View>
                            <TouchableOpacity style={styles.editIconBtn}>
                                <Feather name="edit-2" size={16} color={COLORS.text.secondary} />
                            </TouchableOpacity>
                        </View>
                        {index < MOCK_USER.contacts.length - 1 && <View style={styles.separator} />}
                    </View>
                ))}
            </View>

            {/* 6. Preferencias */}
            <View style={styles.card}>
                 <View style={styles.rowBetween}>
                    <View style={{flexDirection:'row', alignItems:'center', gap: 12}}>
                        <View style={[styles.infoIconBox, { backgroundColor: '#f1f5f9' }]}>
                             <Feather name="bell" size={18} color={COLORS.text.primary} />
                        </View>
                        <Text style={styles.infoValue}>Notificaciones</Text>
                    </View>
                    <Switch 
                        trackColor={{ false: "#cbd5e1", true: COLORS.brand.teal }}
                        thumbColor={"#fff"}
                        onValueChange={setNotificationsEnabled}
                        value={notificationsEnabled}
                    />
                 </View>
            </View>

            <TouchableOpacity style={styles.logoutBtn}>
                <Text style={styles.logoutText}>Cerrar Sesión</Text>
            </TouchableOpacity>
            
            <Text style={styles.versionText}>v2.4.0 • Build 1502</Text>

        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background.base },
  sheetContainer: {
    flex: 1,
    backgroundColor: COLORS.light.backgroundSecondary,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24,
    overflow: 'hidden',
  },
  scrollContent: { padding: 24, paddingBottom: 60 },
  card: {
    backgroundColor: COLORS.light.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2,
    borderWidth: 1, borderColor: COLORS.light.border,
  },
  // Info Row Styles
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  infoIconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.light.backgroundSecondary, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 12, color: COLORS.text.label, marginBottom: 2 },
  infoValue: { fontSize: 15, color: COLORS.text.primary, fontWeight: '500' },
  separator: { height: 1, backgroundColor: COLORS.light.border, marginVertical: 12, marginLeft: 56 },
  // Contact Row Styles
  contactRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4 },
  avatarPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#e0f2fe', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarInitials: { color: '#0369a1', fontWeight: '700', fontSize: 16 },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 15, fontWeight: '600', color: COLORS.text.primary },
  contactRelation: { fontSize: 13, color: COLORS.text.secondary },
  editIconBtn: { padding: 8 },
  // Misc
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logoutBtn: { marginTop: 12, padding: 16, borderRadius: 16, backgroundColor: '#fee2e2', alignItems: 'center' },
  logoutText: { color: '#991b1b', fontWeight: '600', fontSize: 15 },
  versionText: { textAlign: 'center', color: COLORS.text.label, fontSize: 12, marginTop: 24 }
});