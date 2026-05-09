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
      {/* BANNER */}
      <View style={styles.banner}>
        <Image
          source={{
            uri: 'https://picsum.photos/800/400',
          }}
          style={styles.bannerImage}
        />

        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>
            Temukan Tempat Terbaik
          </Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              Jelajahi Sekarang
            </Text>
          </TouchableOpacity>
        </View>
      </View>
       {/* CATEGORY */}
      <View style={styles.categoryContainer}>
        <Text style={styles.sectionTitle}>
          Kategori
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['Pantai', 'Gunung', 'Pulau', 'Camping'].map(
            (item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryButton}
              >
                <Text style={styles.categoryText}>
                  {item}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </ScrollView>
      </View>

       {/* POPULAR DESTINATION */}
      <View style={styles.destinationContainer}>
        <Text style={styles.sectionTitle}>
          Destinasi Populer
        </Text>

         {destinations.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
          >
            <Image
              source={{
                uri: item.image,
              }}
              style={styles.cardImage}
            />

             <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>
                {item.name}
              </Text>

              <Text style={styles.cardLocation}>
                📍 {item.location}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  );
}