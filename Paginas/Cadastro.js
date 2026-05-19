import React, {useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Inicio from "./inicio";

export default function Cadastro({ navigation }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    nascimento: "",
    genero: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function validarCampos() {
    const { nome, email, senha, telefone, nascimento, genero } = form;

    if (!nome || !email || !senha || !telefone || !nascimento || !genero) {
      Alert.alert("Erro", "Preencha todos os campos");
      return false;
    }

    if (!email.includes("@")) {
      Alert.alert("Erro", "E-mail inválido");
      return false;
    }

    if (senha.length < 6) {
      Alert.alert("Erro", "Senha muito curta");
      return false;
    }

    return true;
  }

  async function Cadastrar() {
    if (!validarCampos()) return;

    const payload = {
      nome: form.nome,
      email: form.email,
      senha: form.senha,
      telefone: form.telefone,
      nascimento: form.nascimento,
      genero: form.genero,
    };

    try {
      setLoading(true);

      const response = await axios.post(
        "http://10.0.2.2:8000/api/cadastrar_usuario",
        payload
      );

      console.log(response.data);

    
      if (response.data.token) {
        await AsyncStorage.setItem(
          "token",
          response.data.token
        );

        navigation.replace("Login");
        return;
      }

    
      const login = await axios.get(
        "http://10.0.2.2:8000/api/login",
        {
          params: {
            email: form.email,
            senha: form.senha,
          },
        }
      );

      if (login.data.token) {
        await AsyncStorage.setItem(
          "token",
          login.data.token
        );

        navigation.replace("Inicio");
      }

    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Erro ao cadastrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={form.nome}
        onChangeText={(v) => handleChange("nome", v)}
      />

      <TextInput
        placeholder="E-mail"
        style={styles.input}
        value={form.email}
        onChangeText={(v) => handleChange("email", v)}
      />

      <TextInput
        placeholder="Senha"
        style={styles.input}
        secureTextEntry
        value={form.senha}
        onChangeText={(v) => handleChange("senha", v)}
      />

      <TextInput
        placeholder="Telefone"
        style={styles.input}
        value={form.tele}
        onChangeText={(v) => handleChange("telefone", v)}
      />

      <TextInput
        placeholder="Nascimento"
        style={styles.input}
        value={form.nascimento}
        onChangeText={(v) => handleChange("nascimento", v)}
      />

      <TextInput
        placeholder="Gênero"
        style={styles.input}
        value={form.genero}
        onChangeText={(v) => handleChange("genero", v)}
      />

      <TouchableOpacity style={styles.botao} onPress={Cadastrar}>
        {loading ? (
          <ActivityIndicator color="#000000" />
        ) : (
          <Text style={styles.botaoTexto}>CADASTRAR</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack(Home)}>
        <Text style={styles.link}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#0D0D0D",
    padding: 20,
    justifyContent: "center",
  },

  title: {
    color: "#D4AF37",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#1A1A1A",
    color: "#ffffff",
    borderWidth: 1,
    borderColor: "#D4AF37",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  botao: {
    backgroundColor: "#D4AF37",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  botaoTexto: {
    fontWeight: "bold",
    color: "#000",
  },

  link: {
    textAlign: "center",
    marginTop: 20,
    color: "#4D8DFF",
  },

});