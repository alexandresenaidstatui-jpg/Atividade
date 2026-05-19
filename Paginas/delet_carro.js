import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Container from '../components/Container';
import Input from '../components/Input';
import Botao from '../components/Botao';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

export default function Deletar({ navigation }) {

    const route = useRoute();
    const { item } = route.params || {};
  
  const [modelo, setModelo] = useState(item?.modelo || "");
  const [ano, setAno] = useState(item?.ano?.toString() || "");
  const [cor, setCor] = useState(item?.cor || "");
  const [placa, setPlaca] = useState(item?.placa || "");
  const [dono, setDono] = useState(item?.dono || "");
  const [valor, setValor] = useState(item?.valor?.toString() || "");
  const [potencia, setPotencia] = useState(item?.potencia || "");
  const [tipo_gasolina, setTipoGasolina] = useState(item?.tipo_gasolina?.toString() || "");
  const [fabricante, setFabricante] = useState(item?.fabricante || "");
  const [loading, setLoading] = useState(false);

  async function excluir() {

    try{
        if (!item?.id) {
          Alert.alert("ERRO", "Carro nao encontrado para deletar!");
          return;
        }

        const token = await AsyncStorage.getItem("token");
        console.log("token:", token);

        if(token){

          const response = await axios.delete("http://10.0.2.2:8000/api/deletar_carro",{

     
    token:token,
    id_carro:item.id,
    modelo:modelo,
    ano:parseInt(ano),     
    cor:cor,
    placa:placa,
    dono:dono,
    valor:parseInt(valor),
    potencia:potencia,
    tipo_gasolina:parseInt(tipo_gasolina),
    fabricante:fabricante, 

    
  });
        console.log("Resposta da api", response.data.carro);
        Alert.alert("Sucesso!", "Carro Deletado com Sucesso!");
        navigation.goBack();
        }

    }catch(error){
       
        console.log("ERRO", error.response?.data?.errors || error.message);
        Alert.alert("ERRO", "Não foi possível deletar o carro!");

    }

  }

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title}>vender carro</Text>
        <Text style={styles.subtitle}>Preencha seus dados</Text>
      </View>

      <Input
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
      />

      <Input
        placeholder="Ano"
        value={ano}
        onChangeText={setAno}
      />

      <Input
        placeholder="Cor"
        value={cor}
        onChangeText={setCor}
      />

      <Input
        placeholder="Placa"
        value={placa}
        onChangeText={setPlaca}
      />

      <Input
        placeholder="Dono"
        value={dono}
        onChangeText={setDono}
      />

      <Input
        placeholder="Valor"
        value={valor}
        onChangeText={setValor}
      />

      <Input
        placeholder="Potência"
        value={potencia}
        onChangeText={setPotencia}
      />

      <Input
        placeholder="Tipo de Gasolina"
        value={tipo_gasolina}
        onChangeText={setTipoGasolina}
      />

      <Input
        placeholder="Fabricante"
        value={fabricante}
        onChangeText={setFabricante}
      />
        
    
      <Botao titulo="DELETAR" onPress={excluir} />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Já tem conta? Faça login</Text>
      </TouchableOpacity>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#d1e000',
    marginTop: 100,
   
    
  },
  subtitle: {
    fontSize: 25,
    color: '#d1e000',
    marginTop: 5,
  },
  link: {
    textAlign: 'center',
    marginTop: 20,
    color: '#d1e000',
    fontSize: 20,
  },
});
