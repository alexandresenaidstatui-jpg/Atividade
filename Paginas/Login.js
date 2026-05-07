import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Container from "../components/Container";
import Input from "../components/Input";
import Botao from "../components/Botao";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function Logar() {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get(
        "http://10.0.2.2:8000/api/login",
        {
          params: {
            email,
            senha,
          },
        }
      );

      if (response.data.token) {
        await AsyncStorage.setItem(
          "token",
          response.data.token
        );

        Alert.alert("Sucesso", "Login realizado!");
        navigation.replace("Home");
      } else {
        Alert.alert("Erro", response.data.msg);
      }

    } catch (error) {
      console.log(error?.response?.data || error.message);
      Alert.alert("Erro", "Falha no login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Entre na sua conta</Text>
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

      <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
        <Text style={styles.link}>
          Não tem conta? Cadastre-se
        </Text>
      </TouchableOpacity>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#d1e000",
  },
  link: {
    textAlign: "center",
    marginTop: 20,
    color: "#d1e000",
  },
});