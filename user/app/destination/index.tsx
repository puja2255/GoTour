import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';

const DATA = [
  {
    id: 1,
    name: 'Pantai Mutun',
  },
  {
    id: 2,
    name: 'Pahawang',
  },
];

export default function DestinationPage() {
    return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={DATA}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push(
                `/destination/${item.id}`
              )
            }
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}