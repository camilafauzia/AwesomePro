import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, TextInput, Text, Button, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlaceOfWorship } from '@fortawesome/free-solid-svg-icons';

const Createdata = () => {
  const jsonUrl = 'http://192.168.100.30:3000/cabud'; // Ganti dengan URL sesuai server Anda
  const [nama_cagarbudaya, setNamaCagarbudaya] = useState('');
  const [kota, setKota] = useState('');
  const [full_address, setFullAddress] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const submit = () => {
    if (!selectedUser) {
      Alert.alert('Pilih Data', 'Silakan pilih data yang ingin diubah.');
      return;
    }

    if (!nama_cagarbudaya || !kota || !full_address) {
      Alert.alert('Validasi Gagal', 'Semua field harus diisi.');
      return;
    }

    const data = { nama_cagarbudaya, kota, full_address };

    fetch(`${jsonUrl}/${selectedUser.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gagal menyimpan data');
        }
        return response.json();
      })
      .then(() => {
        Alert.alert('Sukses', 'Data berhasil diubah');
        resetForm();
        refreshPage();
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Terjadi kesalahan saat menyimpan data');
      });
  };

  const selectItem = (item) => {
    setSelectedUser(item);
    setNamaCagarbudaya(item.nama_cagarbudaya);
    setKota(item.kota);
    setFullAddress(item.full_address);
  };

  const resetForm = () => {
    setSelectedUser(null);
    setNamaCagarbudaya('');
    setKota('');
    setFullAddress('');
  };

  const refreshPage = () => {
    setRefresh(true);
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        console.log('cabud', json);
        setDataUser(json);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Gagal mengambil data dari server');
      })
      .finally(() => setRefresh(false));
  };

  useEffect(() => {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        console.log('cabud', json);
        setDataUser(json);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Gagal mengambil data dari server');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.cardtitle}>Loading...</Text>
          </View>
        ) : (
          <View>
            <FlatList
              ListHeaderComponent={
                <View style={styles.headerContainer}>
                  <Text style={styles.title}>Edit Data Cagar Budaya</Text>
                  <View style={styles.form}>
                    <TextInput
                      style={styles.input}
                      placeholder="Nama Cagar Budaya"
                      value={nama_cagarbudaya}
                      onChangeText={setNamaCagarbudaya}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Kota"
                      value={kota}
                      onChangeText={setKota}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Alamat Lengkap"
                      value={full_address}
                      onChangeText={setFullAddress}
                    />
                    <TouchableOpacity style={styles.button} onPress={submit}>
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              }
              data={dataUser}
              onRefresh={refreshPage}
              refreshing={refresh}
              keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectItem(item)}>
                  <View style={styles.card}>
                    <FontAwesomeIcon icon={faPlaceOfWorship} size={50} style={styles.icon} />
                    <View style={styles.cardContent}>
                      <Text style={styles.cardtitle}>{item.nama_cagarbudaya || 'Tidak Ada Nama'}</Text>
                      <Text style={styles.cardText}>{item.kota || 'Tidak Ada Kota'}</Text>
                      <Text style={styles.cardText}>{item.full_address || 'Tidak Ada Alamat'}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Createdata;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Background yang lebih cerah dan netral
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  headerContainer: {
    backgroundColor: '#8a7a71', // Nuansa coklat lembut
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#594a40', // Coklat gelap
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginHorizontal: 20,
    marginVertical: 7,
  },
  icon: {
    color: '#8a7a71', // Coklat lembut sesuai tema
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
  },
  cardtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#594a40', // Coklat gelap
  },
  cardText: {
    fontSize: 14,
    color: '#555',
  },
});
