import { useLocalSearchParams } from 'expo-router';

import {
  View,
  Text,
} from 'react-native';

export default function DetailPage() {
  const { id } = useLocalSearchParams();
