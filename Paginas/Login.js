import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Container from '../components/Container';
import Input from '../components/Input';
import Botao from '../components/Botao';
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

async function Logar() {
  if (!email || !senha) {
    Alert.alert('Erro', 'Preencha todos os campos');
    return;
  }

  try {
    setLoading(true);

    const response = await axios.get("http://10.0.2.2:9000/api/login", {
      params: {
        email: email,
        senha: senha
      }
    });

    console.log(response.data);

    if (response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);

      Alert.alert("Sucesso", "Login realizado com sucesso!");
      navigation.replace("Cep");
    } else {
      Alert.alert("Erro", response.data.msg);
    }

  } catch (error) {
    console.log("ERRO", error?.response?.data || error.message);
  } finally {
    setLoading(false);
  }
}
  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Login</Text>
      </View>

      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Input
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <Botao titulo="ENTRAR" onPress={Logar} loading={loading} />

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 100,
  },
  title: {
    fontSize: 3,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 200,
  },
  subtitle: {
    fontSize: 50,
    color: '#15ff00',
    marginTop: 5,
  },
  link: {
    textAlign: 'center',
    marginTop: 20,
    color: '#15ff00',
    fontSize: 14,
  },
});