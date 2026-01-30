import React, { useState } from 'react';
import { View, ScrollView, StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // <--- 1. IMPORTAR ROUTER
import { COLORS } from '@/constants/theme';

// Importamos los componentes
import { AmenityCard, AmenityItem } from '@/components/amenities/AmenityCard';
import { CategoryFilter } from '@/components/ui/CategoryTabs';
import { HeroSearch } from '@/components/ui/SearchBar';
import { DashboardHeader } from '@/components/ui/DashboardHeader';

// MOCK DATA
const CATEGORIES = ['Todos', 'Wellness', 'Deportes', 'Social', 'Coworking'];
const AMENITIES: AmenityItem[] = [
  {
    id: '1',
    title: 'Alberca Infinita',
    location: 'Roof Garden • Torre A',
    status: 'available',
    nextSlot: '14:00',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Gimnasio Smart',
    location: 'Planta Baja',
    status: 'busy',
    nextSlot: '16:30',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Cancha de Pádel',
    location: 'Zona Deportiva',
    status: 'available',
    nextSlot: 'Ahora',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1626248590666-65714df35d25?q=80&w=1502&auto=format&fit=crop',
  },
];

export default function UnifiedAmenitiesScreen() {
  const router = useRouter(); // <--- 2. INICIALIZAR ROUTER
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchText, setSearchText] = useState('');

  // Función para navegar
  const handleNavigation = (id: string) => {
    // Esto asume que crearás el archivo en app/amenity/[id].tsx
    router.push(`../amenity/${id}`); 
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background.base} />

      {/* --- SECCIÓN SUPERIOR (DARK) --- */}
      <View style={styles.topSection}>
        <SafeAreaView>
          <DashboardHeader 
            avatarUrl="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            onMenuPress={() => console.log('Open Menu')}
          />
          
          <HeroSearch 
            title={`Explora tus\nEspacios`}
            searchValue={searchText}
            onSearchChange={setSearchText}
          />
        </SafeAreaView>
      </View>

      {/* --- SECCIÓN INFERIOR (LIGHT SHEET) --- */}
      <View style={styles.bottomSheet}>
         <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
         >
            <CategoryFilter 
                categories={CATEGORIES}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
            />

            <View style={styles.listContainer}>
                {AMENITIES.map((item) => (
                    <AmenityCard 
                        key={item.id} 
                        item={item} 
                        // <--- 3. USAR LA NAVEGACIÓN
                        onPress={() => handleNavigation(item.id)}
                    />
                ))}
            </View>

         </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.base,
  },
  topSection: {
    backgroundColor: COLORS.background.base,
    paddingBottom: 24, 
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: COLORS.ui.lightSheet,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 40,
  },
  listContainer: {
    paddingHorizontal: 24,
    gap: 24,
  },
});