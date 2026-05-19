import React, { useState } from "react";
import axios from "axios";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Salvar_carro({ navigation }) {
  
  const [modelo, setModelo] = useState("");
  const [email, setEmail] = useState("");
  const [cor, setCor] = useState("");
  const [placa, setPlaca] = useState("");
  const [dono, setDono] = useState("");
  const [valor, setValor] = useState("");
  const [potencia, setPotencia] = useState("");
  const [tipo_gasolina, setTipoGasolina] = useState("");
  const [fabricante, setFabricante] = useState("");

  
  async function cadastrar_carro() {
    try {
      
      const response = await axios.post(
        "http://10.0.2.2:8000/api/formulario",
        {
          modelo,
          email,
          cor,
          placa,
          dono,
          valor,
          potencia,
          tipo_gasolina,
          fabricante,
        }
      );

      console.log("CARRO CADASTRADO:", response.data);
      Alert.alert("Sucesso", "Carro cadastrado com sucesso!");

      // LIMPAR CAMPOS
      setModelo("");
      setEmail("");
      setPlaca("");
      setDono("");
      setValor("");
      setPotencia("");
      setTipoGasolina("");
      setFabricante("");
      setCor("");

      // Opcional: Redirecionar após cadastrar
      // navigation.navigate("Inicio");

    } catch (error) {
      console.log("ERRO:", error.response?.data || error.message);
      Alert.alert("Erro", "Erro ao cadastrar carro");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cadastro de Carros</Text>

      <TextInput
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Placa"
        value={placa}
        onChangeText={setPlaca}
        style={styles.input}
      />

      <TextInput
        placeholder="Cor"
        value={cor}
        onChangeText={setCor}
        style={styles.input}
      />

      <TextInput
        placeholder="Dono"
        value={dono}
        onChangeText={setDono}
        style={styles.input}
      />

      <TextInput
        placeholder="Valor"
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Potência"
        value={potencia}
        onChangeText={setPotencia}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Tipo de Gasolina"
        value={tipo_gasolina}
        onChangeText={setTipoGasolina}
        style={styles.input}
      />

      <TextInput
        placeholder="Fabricante"
        value={fabricante}
        onChangeText={setFabricante}
        style={styles.input}
      />

      {/* Alterado de Salvar_carro para cadastrar_carro */}
      <TouchableOpacity style={styles.button} onPress={cadastrar_carro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Inicio")}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#D4AF37",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#D4AF37",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#D4AF37",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#D4AF37",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
