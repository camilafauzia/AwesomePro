import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlaceOfWorship, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Listdata = () => {
  const jsonUrl = 'http://192.168.100.30:3000/cabud';
  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        setDataUser(json)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  function refreshPage() {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        setDataUser(json)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  function deleteData(id) {
    fetch(jsonUrl + '/' + id, {
      method: 'DELETE',
    })
      .then((response) => {
        // Periksa apakah respons kosong
        if (response.status === 204) {
          return null; // 204 No Content tidak perlu di-parse
        }
        return response.json();
      })
      .then((json) => {
        if (json) {
          console.log(json);
        }
        alert('Data terhapus');
        refreshPage();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Gagal menghapus data');
      });
  }

  return (
    <SafeAreaView>
      {isLoading ? (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={styles.cardtitle}>Loading...</Text>
        </View>
      ) : (
        <View>
          <FlatList
            style={{ marginBottom: 0 }}
            data={dataUser}
            onRefresh={() => { refreshPage() }}
            refreshing={refresh}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity>
                  <View style={[styles.card, { backgroundColor: item.color || '#8a7a71' }]}>
                    <View style={styles.avatar}>
                      <FontAwesomeIcon icon={faPlaceOfWorship} size={50} color={item.color} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cardtitle} numberOfLines={1} ellipsizeMode="tail">
                        {item.nama_cagarbudaya}
                      </Text>
                      <Text numberOfLines={1} ellipsizeMode="tail">{item.kota}</Text>
                      <Text numberOfLines={2} ellipsizeMode="tail">{item.full_address}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                      {/* <FontAwesomeIcon icon={faChevronRight} size={20} /> */}
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={styles.form}>
                  <Button title="Hapus"
                    onPress={() => Alert.alert('Hapus data', 'Yakin akan menghapus data ini?', [
                      { text: 'Tidak', onPress: () => console.log('button tidak') },
                      { text: 'Ya', onPress: () => deleteData(item.id) },
                    ])}
                    color={'#594a40'}
                  />
                </View>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  )
}

export default Listdata

const styles = StyleSheet.create({
  title: {
    paddingVertical: 12,
    backgroundColor: '#333',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  avatar: {
    borderRadius: 100,
    width: 80,
  },
  cardtitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    marginHorizontal: 20,
    marginVertical: 7
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 20,
  },
});