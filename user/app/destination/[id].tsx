import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function DetailPage() {
  const params = useLocalSearchParams();
  
  // Extract and provide elegant fallbacks for all params
  const id = params.id;
  const name = params.name || 'Wisata Nusantara';
  const location = params.location || 'Indonesia';
  const category = params.category || 'Destinasi Unggulan';
  const rating = params.rating ? Number(params.rating) : 4.8;
  const image = params.image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80';
  const description = params.description || 'Destinasi liburan eksotis dengan panorama keindahan alam nusantara yang asri dan memanjakan mata, sangat cocok untuk mengisi waktu liburan Anda bersama keluarga.';

  const handleBooking = () => {
    Alert.alert(
      'Pemesanan Tiket 🎟️',
      `Apakah Anda ingin melanjutkan pemesanan tiket untuk destinasi "${name}"?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Pesan Sekarang',
          onPress: () => Alert.alert('Sukses 🎉', 'Tiket Anda telah berhasil dipesan! Kode booking telah dikirim ke email Anda.'),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Scrollable Main Area */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Image Section */}
        <View style={styles.heroSection}>
          <Image source={{ uri: image }} style={styles.heroImage} />
          <View style={styles.gradientOverlay} />
          
          {/* Top Floating Buttons */}
          <View style={styles.floatingHeader}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.floatingButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.floatingButton}>
              <Text style={styles.shareIcon}>❤️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Sheet Section */}
        <View style={styles.contentSheet}>
          {/* Category Pill */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{category}</Text>
          </View>

          {/* Title and Rating Row */}
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{name}</Text>
            <View style={styles.ratingBadge}>
              <Text style={styles.starText}>⭐</Text>
              <Text style={styles.ratingValueText}>{rating.toFixed(1)}</Text>
            </View>
          </View>

          {/* Location row */}
          <Text style={styles.locationText}>📍 {location}</Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Destination Description */}
          <Text style={styles.sectionTitle}>Deskripsi Wisata</Text>
          <Text style={styles.descriptionText}>{description}</Text>

          {/* Amenities/Amenities Horizontal selection */}
          <Text style={styles.sectionTitle}>Fasilitas & Penawaran</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.amenitiesContainer}>
            <View style={styles.amenityChip}>
              <Text style={styles.amenityIcon}>🏡</Text>
              <Text style={styles.amenityText}>Homestay</Text>
            </View>
            <View style={styles.amenityChip}>
              <Text style={styles.amenityIcon}>🧭</Text>
              <Text style={styles.amenityText}>Guide</Text>
            </View>
            <View style={styles.amenityChip}>
              <Text style={styles.amenityIcon}>🚗</Text>
              <Text style={styles.amenityText}>Transport</Text>
            </View>
            <View style={styles.amenityChip}>
              <Text style={styles.amenityIcon}>🍽️</Text>
              <Text style={styles.amenityText}>Konsumsi</Text>
            </View>
            <View style={styles.amenityChip}>
              <Text style={styles.amenityIcon}>📸</Text>
              <Text style={styles.amenityText}>Dokumentasi</Text>
            </View>
          </ScrollView>

          {/* Tour Guide area */}
          <Text style={styles.sectionTitle}>Pemandu Wisata Pilihan</Text>
          <View style={styles.guideCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80' }}
              style={styles.guideAvatar}
            />
            <View style={styles.guideInfo}>
              <Text style={styles.guideName}>Ahmad Dani</Text>
              <Text style={styles.guideBadge}>✓ Berlisensi Resmi HPI</Text>
            </View>
            <TouchableOpacity style={styles.chatButton} activeOpacity={0.7}>
              <Text style={styles.chatIcon}>💬</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* Floating Booking Footer */}
      <View style={styles.bookingFooter}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Mulai Dari</Text>
          <Text style={styles.priceValue}>Rp 250.000<Text style={styles.perPerson}>/pax</Text></Text>
        </View>
        <TouchableOpacity
          style={styles.bookButton}
          activeOpacity={0.8}
          onPress={handleBooking}
        >
          <Text style={styles.bookButtonText}>Pesan Tiket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070A13',
  },
  scrollContent: {
    paddingBottom: 110,
  },
  heroSection: {
    height: height * 0.45,
    width: width,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 10, 19, 0.3)',
  },
  floatingHeader: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  floatingButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  backArrow: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  shareIcon: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  contentSheet: {
    backgroundColor: '#070A13',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    marginTop: -30,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  categoryBadge: {
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.25)',
  },
  categoryBadgeText: {
    color: '#06B6D4',
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 10,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  starText: {
    fontSize: 12,
    marginRight: 4,
  },
  ratingValueText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '500',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 22,
    textAlign: 'justify',
  },
  amenitiesContainer: {
    gap: 10,
  },
  amenityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  amenityIcon: {
    fontSize: 15,
    marginRight: 6,
  },
  amenityText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  guideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  guideAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  guideInfo: {
    flex: 1,
    marginLeft: 12,
  },
  guideName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  guideBadge: {
    fontSize: 11,
    color: '#06B6D4',
    fontWeight: '600',
  },
  chatButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#06B6D4',
  },
  chatIcon: {
    fontSize: 16,
  },
  bookingFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 84,
    backgroundColor: '#0F172A',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  priceContainer: {
    justifyContent: 'center',
  },
  priceLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 2,
  },
  perPerson: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: 'normal',
  },
  bookButton: {
    backgroundColor: '#06B6D4',
    borderRadius: 14,
    paddingHorizontal: 28,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#06B6D4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  bookButtonText: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: 'bold',
  },
});