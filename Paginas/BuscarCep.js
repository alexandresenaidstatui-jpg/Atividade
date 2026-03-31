import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import Container from '../components/Container';
import Input from '../components/Input';
import Botao from '../components/Botao';
import Login from './Login';

export default function BuscarCep({navigation}) {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [loading, setLoading] = useState(false);

  async function buscarCep() {
    const cepLimpo = cep.replace(/\D/g, '');
    
    if (cepLimpo.length !== 8) {
      Alert.alert('Erro', 'Digite um CEP válido com 8 números');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      
      if (response.data.erro) {
        Alert.alert('CEP não encontrado');
        setEndereco(null);
      } else {
        setEndereco(response.data);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar o CEP');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title}></Text>
        <Text style={styles.subtitle}>Buscar CEP</Text>
      </View>

      <Input
        placeholder="Digite o CEP (ex: 45578490)"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
        maxLength={9}
      />

      <Botao titulo="BUSCAR" onPress={buscarCep} loading={loading} />
 <Botao 
  titulo="Deslogar" 
  onPress={() => navigation.navigate('Login')} 
/>
      {endereco && (
        <ScrollView style={styles.resultado}>
          <Text style={styles.resultTitle}>Endereço encontrado:</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>CEP:</Text>
            <Text style={styles.value}>{endereco.cep}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Logradouro:</Text>
            <Text style={styles.value}>{endereco.logradouro || '-'}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Bairro:</Text>
            <Text style={styles.value}>{endereco.bairro || '-'}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Cidade:</Text>
            <Text style={styles.value}>{endereco.localidade || '-'}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>UF:</Text>
            <Text style={styles.value}>{endereco.uf || '-'}</Text>
          </View>
        </ScrollView>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
   marginBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 200,
  },
  subtitle: {
    fontSize: 40,
    color: '#00ff3c',
    marginTop: 5,
  },
  resultado: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    maxHeight: 300,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    width: 80,
    fontWeight: 'bold',
    color: '#666',
  },
  value: {
    flex: 1,
    color: '#333',
  },
});