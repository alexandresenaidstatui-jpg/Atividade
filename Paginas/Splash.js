import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash({ navigation }) {

  useEffect(() => {

    const validacao = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log("token.:", token);

      setTimeout(() => {
        if (token) {
          navigation.replace("Home");
        } else {
          navigation.replace("Home");
        }
      }, 3000);
    };

    validacao();

  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo</Text>
      <Text style={styles.subtitle}>ao XLmotors</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#d1e000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 32,
    color: '#d1e000',
  },
});