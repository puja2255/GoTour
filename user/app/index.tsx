import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

const destinations = [
  {
    id: 1,
    name: 'Pantai Mutun',
    location: 'Lampung',
    image:
      'https://picsum.photos/400/300?random=1',
  },
  {
    id: 2,
    name: 'Pulau Pahawang',
    location: 'Pesawaran',
    image:
      'https://picsum.photos/400/300?random=2',
  },
  {
    id: 3,
    name: 'Bukit Sakura',
    location: 'Bandar Lampung',
    image:
      'https://picsum.photos/400/300?random=3',
  },
];

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