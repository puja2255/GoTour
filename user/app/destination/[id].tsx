import { useLocalSearchParams } from 'expo-router';

import {
  View,
  Text,
} from 'react-native';

export default function DetailPage() {
  const { id } = useLocalSearchParams();
 return (
    <View style={{ padding: 20 }}>
      <Text>Detail Wisata ID: {id}</Text>
    </View>
  );
}