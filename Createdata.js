import React, { useState } from 'react'
import { SafeAreaView, View, ScrollView, TextInput, Text, Button, StyleSheet } from 'react-native';

const Createdata = () => {
  const jsonUrl = 'http://192.168.100.30:3000/cabud';
  const [nama_cagarbudaya, setNamaCagarbudaya] = useState('');
  const [kota, setKota] = useState('');
  const [full_address, setFullAddress] = useState('');

  const submit = () => {
    const data = {
      nama_cagarbudaya: nama_cagarbudaya,
      kota: kota,
      full_address: full_address,
    };
    fetch('http://192.168.100.30:3000/cabud', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      alert('Data tersimpan');
      setNamaCagarbudaya('');
      setKota('');
      setFullAddress('');
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Tambah Data Cagar Budaya</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nama Cagar Budaya"
            value={nama_cagarbudaya}
            onChangeText={(value) => setNamaCagarbudaya(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Kota"
            value={kota}
            onChangeText={(value) => setKota(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Alamat Lengkap"
            value={full_address}
            onChangeText={(value) => setFullAddress(value)}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Simpan"
              onPress={submit}
              color="#755948"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Createdata;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    paddingVertical: 16,
    backgroundColor: '#3e2723',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  buttonContainer: {
    marginTop: 15,
    backgroundColor: '#3e2723',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});