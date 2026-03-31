import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Splash({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo</Text>
      <Text style={styles.subtitle}>ao buscaCEP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9b0bbb',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#15ff00',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 32,
    color: '#15ff00',
  },
});