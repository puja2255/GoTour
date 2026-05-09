import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

import { router } from 'expo-router';

export default function HomePage() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>GoTour</Text>

      <TouchableOpacity
        onPress={() =>
          router.push('/destination')
        }
      >
        <Text>Lihat Destinasi</Text>
      </TouchableOpacity>
    </View>
  );
}