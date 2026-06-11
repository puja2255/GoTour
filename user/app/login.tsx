import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import { router } from 'expo-router';

const { height } = Dimensions.get('window');

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Eits, Tunggu Dulu', 'Silakan masukkan email dan password Anda!');
      return;
    }

    // Direct simulated auth flow
    Alert.alert('Selamat Datang!', 'Proses login berhasil. Selamat menjelajah!', [
      {
        text: 'Lanjutkan',
        onPress: () => router.replace('/(tabs)'),
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Top Header Section */}
        <View style={styles.header}>
          <Text style={styles.logoText}>GoTour<Text style={styles.dotText}>.</Text></Text>
          <Text style={styles.subtitle}>Selamat datang kembali! Silakan masuk ke akun Anda.</Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Masuk Akun</Text>
          
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Alamat Email</Text>
            <TextInput
              style={styles.input}
              placeholder="budi@gotour.com"
              placeholderTextColor="#64748B"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <View style={styles.passwordHeader}>
              <Text style={styles.inputLabel}>Kata Sandi</Text>
              <TouchableOpacity activeOpacity={0.6}>
                <Text style={styles.forgotText}>Lupa Sandi?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={[styles.input, { flex: 1, borderBottomWidth: 0, paddingHorizontal: 0 }]}
                placeholder="Masukkan kata sandi..."
                placeholderTextColor="#64748B"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                style={styles.eyeButton} 
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                <Text style={styles.eyeText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Masuk Sekarang</Text>
          </TouchableOpacity>

          {/* Guest Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>ATAU</Text>
            <View style={styles.divider} />
          </View>

          {/* Guest Access Button */}
          <TouchableOpacity
            style={styles.guestButton}
            onPress={() => router.replace('/(tabs)')}
            activeOpacity={0.7}
          >
            <Text style={styles.guestButtonText}>Masuk Sebagai Tamu</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Registration area */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Belum punya akun GoTour? </Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.registerLink}>Daftar Sekarang</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070A13', // Deep premium dark background
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    paddingTop: height * 0.05,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
  logoText: {
    fontSize: 38,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  dotText: {
    color: '#06B6D4', // Vibrant Cyan Accent
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)', // Glassmorphism Slate 900
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  inputLabel: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
    marginBottom: 6,
  },
  forgotText: {
    fontSize: 12,
    color: '#06B6D4',
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'rgba(7, 10, 19, 0.6)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    height: 52,
    color: '#FFFFFF',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  passwordInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(7, 10, 19, 0.6)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    height: 52,
    paddingHorizontal: 16,
  },
  eyeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  eyeText: {
    fontSize: 18,
  },
  loginButton: {
    backgroundColor: '#06B6D4', // Cyan 500
    borderRadius: 14,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#06B6D4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  loginButtonText: {
    color: '#0F172A', // Slate 900
    fontSize: 15,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  dividerText: {
    fontSize: 11,
    color: 'rgba(148, 163, 184, 0.5)',
    marginHorizontal: 16,
    fontWeight: '700',
  },
  guestButton: {
    backgroundColor: 'transparent',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#64748B',
    fontSize: 14,
  },
  registerLink: {
    color: '#06B6D4',
    fontWeight: 'bold',
    fontSize: 14,
  },
});