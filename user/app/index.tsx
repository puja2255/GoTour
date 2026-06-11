import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function OnboardingPage() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Dark Elegant Overlay */}
        <View style={styles.overlay}>
          {/* Top Brand Logo Area */}
          <View style={styles.logoArea}>
            <Text style={styles.logoText}>GoTour<Text style={styles.dotText}>.</Text></Text>
            <Text style={styles.tagline}>Nusantara Explorer</Text>
          </View>

          {/* Bottom Card Area */}
          <View style={styles.bottomArea}>
            <Text style={styles.title}>
              Jelajahi Keindahan Indonesia
            </Text>
            <Text style={styles.subtitle}>
              Temukan destinasi wisata tersembunyi, event kebudayaan spektakuler, dan panduan wisata berlisensi resmi untuk liburan impianmu.
            </Text>

            {/* Glowing Accent Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.ctaButton}
              onPress={() => router.replace('/login')}
            >
              <Text style={styles.ctaText}>Mulai Petualangan ✈️</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.secondaryButton}
              onPress={() => router.replace('/(tabs)')}
            >
              <Text style={styles.secondaryText}>Masuk sebagai Tamu</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Versi 2.0 • Dipersembahkan oleh Tim GoTour
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070A13',
  },
  backgroundImage: {
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(7, 10, 19, 0.45)', // Premium dark glass tint
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingTop: height * 0.08,
    paddingBottom: height * 0.04,
  },
  logoArea: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  logoText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    fontFamily: 'System',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  dotText: {
    color: '#06B6D4', // Vibrant Cyan Accent
  },
  tagline: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginTop: 4,
    fontWeight: '600',
  },
  bottomArea: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)', // Tailwind Slate 900 Glass
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 28,
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8', // Slate 400
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  ctaButton: {
    backgroundColor: '#06B6D4', // Cyan 500
    borderRadius: 18,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#06B6D4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 14,
  },
  ctaText: {
    color: '#0F172A', // Slate 900
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    borderRadius: 18,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    marginBottom: 20,
  },
  secondaryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 11,
    color: 'rgba(148, 163, 184, 0.5)',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});