import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import { useRouter } from 'expo-router';

interface DashboardHeaderProps {
  avatarUrl: string;
  onMenuPress: () => void;
  onAvatarPress?: () => void;
}

export const DashboardHeader = ({ avatarUrl, onMenuPress, onAvatarPress }: DashboardHeaderProps) => {
  const router = useRouter();
  const handleAvatarPress = () => {
    if (onAvatarPress) {
      onAvatarPress();
    }
    else {
      router.push(`/profile/${'123134125'}`); // Navegar al perfil del usuario
    }
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.avatarContainer} onPress={handleAvatarPress}>
         <Image source={{ uri: avatarUrl }} style={styles.avatar} />
         <View style={styles.onlineBadge} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.glassBtn} onPress={onMenuPress}>
         <Feather name="bell" size={20} color={COLORS.text.title} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: COLORS.background.dark,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.brand.emerald,
    borderWidth: 2,
    borderColor: COLORS.background.base,
  },
  glassBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: COLORS.ui.glass,
    alignItems: 'center',
    justifyContent: 'center',
  },
});