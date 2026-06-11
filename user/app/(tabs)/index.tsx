import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/api';

const { width } = Dimensions.get('window');

type Destination = {
  id: number;
  name: string;
  location: string;
  category: string;
  rating: number;
  image: string;
  description: string;
};

const MOCK_DESTINATIONS: Destination[] = [
  {
    id: 1,
    name: 'Pantai Mutun',
    location: 'Lampung',
    category: 'Pantai & Bahari',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: 'Pantai pasir putih tenang berlatar pulau-pulau kecil di Teluk Lampung, sangat cocok untuk rekreasi keluarga.',
  },
  {
    id: 2,
    name: 'Pulau Pahawang',
    location: 'Pesawaran',
    category: 'Pantai & Bahari',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    description: 'Surga snorkeling tersembunyi dengan terumbu karang warna-warni yang indah dan penangkaran ikan badut alami.',
  },
  {
    id: 3,
    name: 'Bukit Sakura',
    location: 'Bandar Lampung',
    category: 'Lain-lain',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    description: 'Taman rekreasi perbukitan bertema Jepang dengan pemandangan lanskap kota Bandar Lampung yang menakjubkan.',
  },
];

export default function HomeScreen() {
  const [tours, setTours] = useState<Destination[]>([]);
  const [categories, setCategories] = useState<string[]>(['Semua']);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchToursAndCategories = async () => {
    try {
      // 1. Fetch categories
      const catRes = await axios.get(`${API_BASE_URL}/category`);
      if (catRes.data && catRes.data.length > 0) {
        const catNames = catRes.data.map((c: any) => c.name);
        setCategories(['Semua', ...catNames]);
      } else {
        setCategories(['Semua', 'Candi & Sejarah', 'Pantai & Bahari', 'Gunung & Alam', 'Seni & Kuliner Nusantara', 'Lain-lain']);
      }

      // 2. Fetch tours
      const tourRes = await axios.get(`${API_BASE_URL}/tour`);
      if (tourRes.data && tourRes.data.length > 0) {
        const dbTours = tourRes.data.map((t: any) => {
          let desc = t.description;
          let loc = 'Indonesia';
          let rat = 4.8;
          try {
            if (t.description.trim().startsWith('{')) {
              const parsed = JSON.parse(t.description);
              desc = parsed.description || t.description;
              loc = parsed.location || 'Indonesia';
              rat = parsed.rating || 4.8;
            }
          } catch (e) {}

          return {
            id: t.id,
            name: t.name,
            location: loc,
            category: t.category?.name || 'Lain-lain',
            rating: rat,
            image: t.image,
            description: desc,
          };
        });
        setTours(dbTours);
      } else {
        setTours(MOCK_DESTINATIONS);
      }
    } catch (error) {
      console.log('Failed to fetch from live Postgres DB, using mock fallback:', error.message);
      // Fallback
      setCategories(['Semua', 'Candi & Sejarah', 'Pantai & Bahari', 'Gunung & Alam', 'Seni & Kuliner Nusantara', 'Lain-lain']);
      setTours(MOCK_DESTINATIONS);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchToursAndCategories();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchToursAndCategories();
  };

  // Filter logic
  const filteredTours = tours.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#070A13" />
      
      {/* HEADER SECTION */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.welcomeText}>Halo, Explorer! 👋</Text>
            <Text style={styles.logoText}>GoTour<Text style={styles.dotText}>.</Text></Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
        
        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Cari destinasi impianmu..."
            placeholderTextColor="#64748B"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#06B6D4" />
        }
      >
        {/* BANNER PROMO */}
        <View style={styles.banner}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=1000&q=80' }}
            style={styles.bannerImage}
          />
          <View style={styles.bannerOverlay}>
            <View style={styles.promoTag}>
              <Text style={styles.promoTagText}>Rekomendasi Pekan Ini</Text>
            </View>
            <Text style={styles.bannerTitle}>Eksplorasi Keajaiban Bahari Nusantara</Text>
            <Text style={styles.bannerSubtitle}>Rute terkurasi dari Rp 250rb</Text>
          </View>
        </View>

        {/* CATEGORIES SELECTION */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Kategori Wisata</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
            {categories.map((cat, index) => {
              const isActive = selectedCategory === cat;
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.7}
                  style={[styles.categoryPill, isActive && styles.activeCategoryPill]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text style={[styles.categoryText, isActive && styles.activeCategoryText]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* POPULAR DESTINATIONS */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Destinasi Populer</Text>
            <Text style={styles.seeAllText}>Lihat Semua</Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#06B6D4" style={styles.loader} />
          ) : filteredTours.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🗺️</Text>
              <Text style={styles.emptyText}>Destinasi tidak ditemukan</Text>
              <Text style={styles.emptySubtext}>Coba gunakan kata kunci pencarian atau kategori lain.</Text>
            </View>
          ) : (
            filteredTours.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.9}
                style={styles.card}
                onPress={() => router.push({
                  pathname: `/destination/${item.id}`,
                  params: {
                    id: item.id,
                    name: item.name,
                    location: item.location,
                    category: item.category,
                    rating: item.rating,
                    image: item.image,
                    description: item.description
                  }
                })}
              >
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.cardOverlay} />
                
                {/* Rating Badge */}
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingStar}>⭐</Text>
                  <Text style={styles.ratingValue}>{item.rating.toFixed(1)}</Text>
                </View>

                {/* Card Content Area */}
                <View style={styles.cardContent}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>{item.category}</Text>
                  </View>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardLocation}>📍 {item.location}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070A13', // Ultra-premium deep slate dark mode
  },
  header: {
    backgroundColor: '#0F172A', // Slate 900
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeText: {
    color: '#94A3B8', // Slate 400
    fontSize: 13,
    fontWeight: '600',
  },
  logoText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  dotText: {
    color: '#06B6D4',
  },
  avatarContainer: {
    borderWidth: 2,
    borderColor: '#06B6D4',
    borderRadius: 50,
    padding: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B', // Slate 800
    borderRadius: 14,
    height: 48,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  searchIcon: {
    fontSize: 15,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    height: '100%',
  },
  clearIcon: {
    color: '#64748B',
    fontSize: 14,
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  banner: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    overflow: 'hidden',
    height: 180,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 10, 19, 0.5)',
    justifyContent: 'flex-end',
    padding: 20,
  },
  promoTag: {
    backgroundColor: '#06B6D4',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 50,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  promoTagText: {
    color: '#0F172A',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 26,
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: '#06B6D4',
    fontSize: 13,
    fontWeight: '600',
  },
  sectionContainer: {
    marginTop: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  seeAllText: {
    color: '#06B6D4',
    fontSize: 13,
    fontWeight: '600',
  },
  categoriesScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryPill: {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderRadius: 50,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  activeCategoryPill: {
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    borderColor: '#06B6D4',
  },
  categoryText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  activeCategoryText: {
    color: '#06B6D4',
  },
  loader: {
    marginTop: 30,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },
  card: {
    marginHorizontal: 20,
    borderRadius: 24,
    overflow: 'hidden',
    height: 220,
    marginBottom: 20,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 10, 19, 0.4)',
  },
  ratingBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  ratingStar: {
    fontSize: 11,
    marginRight: 4,
  },
  ratingValue: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardLocation: {
    color: '#06B6D4',
    fontSize: 13,
    fontWeight: '600',
  },
});
