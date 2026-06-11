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

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Tour Member' | 'Tour Guide'>('Tour Member');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert('Formulir Belum Lengkap', 'Mohon isi semua data untuk membuat akun Anda!');
      return;
    }

    Alert.alert(
      'Pendaftaran Berhasil 🎉',
      `Selamat bergabung, ${name}! Akun Anda sebagai ${role} telah berhasil dibuat. Silakan login.`,
      [
        {
          text: 'Masuk Sekarang',
          onPress: () => router.replace('/login'),
        },
      ]
    );
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
          <Text style={styles.subtitle}>Daftar akun baru dan temukan jutaan pesona wisata nusantara.</Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Registrasi Akun</Text>

          {/* Role Picker (Interactive Badges) */}
          <View style={styles.rolePickerContainer}>
            <Text style={styles.inputLabel}>Pilih Peran Anda</Text>
            <View style={styles.roleButtonsWrapper}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === 'Tour Member' && styles.activeRoleButton,
                ]}
                onPress={() => setRole('Tour Member')}
                activeOpacity={0.7}
              >
                <Text style={[styles.roleText, role === 'Tour Member' && styles.activeRoleText]}>
                  🏖️ Tour Member
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === 'Tour Guide' && styles.activeRoleButton,
                ]}
                onPress={() => setRole('Tour Guide')}
                activeOpacity={0.7}
              >
                <Text style={[styles.roleText, role === 'Tour Guide' && styles.activeRoleText]}>
                  🧭 Tour Guide
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nama Lengkap</Text>
            <TextInput
              style={styles.input}
              placeholder="Budi Santoso"
              placeholderTextColor="#64748B"
              value={name}
              onChangeText={setName}
            />
          </View>

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
            <Text style={styles.inputLabel}>Kata Sandi</Text>
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={[styles.input, { flex: 1, borderBottomWidth: 0, paddingHorizontal: 0 }]}
                placeholder="Buat kata sandi minimal 6 karakter..."
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

          {/* Register Button */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            activeOpacity={0.8}
          >
            <Text style={styles.registerButtonText}>Daftar Akun Baru</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Navigation area */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Sudah punya akun GoTour? </Text>
          <TouchableOpacity onPress={() => router.replace('/login')}>
            <Text style={styles.loginLink}>Masuk Di Sini</Text>
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
    paddingTop: height * 0.06,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  logoText: {
    fontSize: 38,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  dotText: {
    color: '#06B6D4',
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
    marginBottom: 20,
  },
  rolePickerContainer: {
    marginBottom: 20,
  },
  roleButtonsWrapper: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  roleButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(7, 10, 19, 0.4)',
  },
  activeRoleButton: {
    borderColor: '#06B6D4',
    backgroundColor: 'rgba(6, 182, 212, 0.12)',
  },
  roleText: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
  },
  activeRoleText: {
    color: '#06B6D4',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
    marginBottom: 6,
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
  registerButton: {
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
  registerButtonText: {
    color: '#0F172A', // Slate 900
    fontSize: 15,
    fontWeight: 'bold',
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
  loginLink: {
    color: '#06B6D4',
    fontWeight: 'bold',
    fontSize: 14,
  },
});