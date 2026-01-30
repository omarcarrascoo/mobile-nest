import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/theme';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilter = ({ categories, activeCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <View style={styles.categoriesContainer}>
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ paddingHorizontal: 24, gap: 10 }}
        >
            {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                    <TouchableOpacity 
                        key={cat} 
                        onPress={() => onSelectCategory(cat)}
                        style={[styles.catPill, isActive && styles.catPillActive]}
                    >
                        <Text style={[styles.catText, isActive && styles.catTextActive]}>{cat}</Text>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    marginBottom: 24,
    height: 38,
  },
  catPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  catPillActive: {
    backgroundColor: COLORS.background.base,
  },
  catText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.secondary,
  },
  catTextActive: {
    color: '#FFF',
  },
});