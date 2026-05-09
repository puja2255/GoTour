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

   header: {
    padding: 20,
    marginTop: 20,
  },

  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E88E5',
  },

  subtitle: {
    marginTop: 5,
    color: '#666',
    fontSize: 16,
  },

  search: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },

  banner: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 25,
  },

  bannerImage: {
    width: '100%',
    height: 220,
  },

   bannerOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },

   bannerTitle: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#1E88E5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  );
}