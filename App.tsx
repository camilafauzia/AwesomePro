import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Image } from 'react-native';
import { useColorScheme } from 'react-native';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#1e1e1e' : '#f4f4f4', // Warna latar belakang yang lebih gelap pada mode gelap
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>CulturalMApp: Cultural Map App</Text>
          <Text style={styles.headerSubtitle}>Persebaran Cagar Budaya Jakarta</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Cagar Budaya di Jakarta</Text>
          <View style={styles.card}>
            {/* Gambar untuk menggantikan ikon */}
            <Image
              source={{uri: 'https://cdn.antaranews.com/cache/1200x800/2022/10/08/IMG_20220516_194036.jpg'}} // Ganti dengan URL atau gambar lokal
              style={styles.icon}
            />
            <Text style={styles.cardText}>Cagar Budaya Jakarta</Text>
          </View>

          <Text style={styles.sectionTitle}>Lokasi dan Keberagaman Cagar Budaya</Text>
          <View style={styles.card}>
            {/* Gambar untuk menggantikan ikon */}
            <Image
              source={{uri: 'https://cdn-icons-png.freepik.com/512/7474/7474511.png'}} // Ganti dengan URL atau gambar lokal
              style={styles.icon}
            />
            <Text style={styles.cardText}>Seluruh DKI Jakarta</Text>
          </View>

          <Text style={styles.sectionTitle}>Sejarah dan Peran Cagar Budaya di Jakarta</Text>
          <Text style={styles.sectionDescription}>
            Jakarta, sebagai ibu kota Indonesia, memiliki banyak situs bersejarah yang merupakan bagian dari warisan budaya yang kaya.
            Cagar budaya di Jakarta meliputi bangunan, situs arkeologi, dan kawasan yang memiliki nilai historis tinggi, yang menjadi saksi bisu
            perjalanan panjang sejarah kota ini.
            <Text style={styles.highlight}>Cagar budaya di Jakarta tidak hanya mencakup bangunan-bangunan kolonial Belanda, tetapi juga
            situs-situs yang penting bagi sejarah perjuangan kemerdekaan Indonesia dan perkembangan kebudayaan bangsa.</Text>
            Salah satu contoh cagar budaya yang terkenal di Jakarta adalah kawasan Kota Tua yang memiliki sejumlah bangunan peninggalan Belanda
            yang masih berdiri kokoh hingga saat ini. Di tempat ini, Anda dapat menemukan gedung-gedung bersejarah yang telah menjadi saksi
            sejarah Jakarta sejak abad ke-17.
            <Text style={styles.highlight}>Selain itu, Jakarta juga memiliki sejumlah museum yang menjadi tempat koleksi berbagai artefak bersejarah
            dari seluruh Indonesia, seperti Museum Nasional dan Museum Sejarah Jakarta.</Text>
            Banyak dari cagar budaya ini yang kini dijadikan sebagai tempat wisata edukasi, memberikan informasi tentang sejarah Jakarta dan
            peran pentingnya dalam pembentukan negara Indonesia.
          </Text>
          
          <Text style={styles.sectionTitle}>Melestarikan Cagar Budaya</Text>
          <Text style={styles.sectionDescription}>
            Pelestarian cagar budaya di Jakarta menjadi tanggung jawab bersama antara pemerintah, masyarakat, dan berbagai pihak terkait.
            Berbagai program pelestarian seperti renovasi bangunan cagar budaya, pendidikan masyarakat tentang pentingnya konservasi, dan
            pengawasan terhadap perkembangan pembangunan yang dapat mengancam keberadaan cagar budaya terus dilaksanakan.
            <Text style={styles.highlight}>Melalui pelestarian cagar budaya, kita dapat menjaga identitas dan warisan sejarah bangsa yang penting bagi generasi mendatang.</Text>
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Melestarikan Warisan Budaya Indonesia</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Header Styles
  header: {
    backgroundColor: '#3e2723',
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#d7ccc8',
  },

  // Section Styles
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#3e2723',
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#5f4b3e',
    marginBottom: 20,
    lineHeight: 24,
  },

  // Highlight Style for special parts of text
  highlight: {
    fontWeight: '700',
    color: '#b4512e',
  },

  // Card Styles
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6a4e23',
    marginLeft: 15,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#8c5e3c',
    marginLeft: 15,
  },

  // Icon Styles (Gambar digunakan sebagai ikon)
  icon: {
    width: 50,
    height: 50,
  },

  // Footer Styles
  footer: {
    padding: 20,
    backgroundColor: '#3e2723',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#d7ccc8',
    fontSize: 14,
  },
});

export default App;
