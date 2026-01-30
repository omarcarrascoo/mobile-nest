import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme'; // Assuming your theme file is here
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

interface DetailHeroProps {
  image: string;
  onBack: () => void;
  onShare?: () => void;
  onFavorite?: () => void;
}

const { height } = Dimensions.get('window');

export const DetailHero = ({ image, onBack, onShare, onFavorite }: DetailHeroProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} contentFit="cover" transition={300} />
      
      {/* Gradient for text contrast on top buttons */}
      <LinearGradient
        colors={['rgba(0,0,0,0.4)', 'transparent']}
        style={styles.gradient}
      />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.headerRow}>
            <TouchableOpacity style={styles.roundBtn} onPress={onBack}>
                <Feather name="arrow-left" size={20} color="#000" />
            </TouchableOpacity>

            <View style={styles.rightBtns}>
                <TouchableOpacity style={styles.roundBtn} onPress={onShare}>
                    <Feather name="share" size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.roundBtn} onPress={onFavorite}>
                    <Feather name="heart" size={20} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.35, // 35% of screen height
    width: '100%',
    position: 'relative',
    backgroundColor: COLORS.background.dark,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  rightBtns: {
    flexDirection: 'row',
    gap: 12,
  },
  roundBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    // Airbnb style shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});