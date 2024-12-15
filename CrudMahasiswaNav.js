import * as React from 'react';
import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Animated,
  Linking,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faBuildingColumns, faPlus, faPenToSquare, faMap } from '@fortawesome/free-solid-svg-icons';
import WebView from 'react-native-webview';
import Datacabud from './Listdata'; // assuming you have this component
import Editdata from './Editdata'; // assuming you have this component
import Createdata from './Createdata'; // assuming you have this component
import Portofolio from './App'; // assuming you have this component

// Landing Page Component
function LandingPage({ onGetStarted }) {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity

  React.useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  // Function to handle linking to URLs
  const handleLinkPress = (url) => {
    Linking.openURL(url).catch((err) => console.error('Error opening URL: ', err));
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://i.pinimg.com/736x/46/e2/31/46e231b15a0fbca302f34e57d4799026.jpg',
      }}
      style={styles.landingContainer}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://i.pinimg.com/236x/cf/da/74/cfda74e63ca9681e4b76ac1a04d63e05.jpg' }}
          style={styles.logo}
        />
        <Text style={styles.landingTitle}>
          Welcome to CulturalMApp
        </Text>
        <Text style={styles.landingSubtitle}>
          Eksplorasi, pelajari, dan kelola data cagar budaya dari berbagai
          wilayah dengan mudah.
        </Text>

        <Animated.View style={{ opacity: fadeAnim }}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={onGetStarted}
          >
            <Text style={styles.getStartedButtonText}>Jelajahi Sekarang</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => handleLinkPress('https://example.com/about')}
            style={styles.footerLink}
          >
            <Text style={styles.footerLinkText}>Tentang Aplikasi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleLinkPress('https://example.com/contact')}
            style={styles.footerLink}
          >
            <Text style={styles.footerLinkText}>Kontak</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

// Screen Components
function HomeScreen() {
  return <Portofolio />;
}

function DataCabudScreen() {
  return <Datacabud />;
}

function AddDataScreen() {
  return <Createdata />;
}

function EditScreen() {
  return <Editdata />;
}

function LayarWeb() {
  return <WebView source={{ uri: 'https://leafmap.vercel.app/home' }} />;
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [showLandingPage, setShowLandingPage] = useState(true);

  const handleGetStarted = () => {
    setShowLandingPage(false);
  };

  return (
    <NavigationContainer>
      {showLandingPage ? (
        <LandingPage onGetStarted={handleGetStarted} />
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#f5f5f5',
              borderTopWidth: 0,
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              height: 65,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
              marginBottom: 5,
            },
            tabBarActiveTintColor: '#8B4513',
            tabBarInactiveTintColor: '#8a7a71',
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faHouse} color={color} size={24} />,
            }}
          />
          <Tab.Screen
            name="Cagar Budaya"
            component={DataCabudScreen}
            options={{
              tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faBuildingColumns} color={color} size={24} />,
            }}
          />
          <Tab.Screen
            name="Add Data"
            component={AddDataScreen}
            options={{
              tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faPlus} color={color} size={24} />,
            }}
          />
          <Tab.Screen
            name="Edit Data"
            component={EditScreen}
            options={{
              tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faPenToSquare} color={color} size={24} />,
            }}
          />
          <Tab.Screen
            name="Map"
            component={LayarWeb}
            options={{
              tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faMap} color={color} size={24} />,
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  landingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Lebih transparan
    borderRadius: 12,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    elevation: 5,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 15,
    borderRadius: 60,
  },
  landingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  landingSubtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  getStartedButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 3,
  },
  getStartedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  footerLink: {
    marginHorizontal: 10,
  },
  footerLinkText: {
    color: '#8B4513',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
