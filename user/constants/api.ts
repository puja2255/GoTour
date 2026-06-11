import { Platform } from 'react-native';

// Use 10.0.2.2 for Android Emulator, localhost/127.0.0.1 for iOS Simulator and Web
export const API_BASE_URL = Platform.select({
  android: 'http://10.0.2.2:3022',
  default: 'http://localhost:3022',
});

console.log('GoTour API Base URL configured to:', API_BASE_URL);
