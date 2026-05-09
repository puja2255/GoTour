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

export default function HomePage() {
  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>GoTour</Text>

        <Text style={styles.subtitle}>
          Explore Wisata Favoritmu
        </Text>
      </View>

       {/* SEARCH */}
      <TextInput
        placeholder="Cari destinasi..."
        style={styles.search}
      />
  );
}