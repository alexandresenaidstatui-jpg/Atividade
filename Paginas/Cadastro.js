import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Container from '../components/Container';
import Input from '../components/Input';
import Botao from '../components/Botao';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔹 service de storage (boa prática)
export const Storage = {
  salvar: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log('Erro ao salvar', e);
    }
  },
  pegar: async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.log('Erro ao pegar', e);
      return null;
    }
  },
  remover: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log('Erro ao remover', e);
    }
  },
};

export default function Cadastro({ navigation }) {

  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    tel: '',
    nasc: '',
    gen: ''
  });

  const [loading, setLoading] = useState(false);

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  // ✅ máscara automática de data
  function formatarInputData(text) {
    let cleaned = text.replace(/\D/g, '');

    if (cleaned.length > 2)
      cleaned = cleaned.replace(/(\d{2})(\d)/, '$1/$2');

    if (cleaned.length > 5)
      cleaned = cleaned.replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');

    return cleaned;
  }

  // ✅ validação REAL de data
  function formatApi(data) {
    if (!data) return null;

    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = data.match(regex);

    if (!match) return null;

    const [, dia, mes, ano] = match;

    const dataObj = new Date(`${ano}-${mes}-${dia}`);

    if (
      dataObj.getDate() != dia ||
      dataObj.getMonth() + 1 != mes ||
      dataObj.getFullYear() != ano
    ) {
      return null;
    }

    return `${ano}-${mes}-${dia}`;
  }

  function validarCampos() {
    const { nome, email, senha, tel, nasc, gen } = form;

    if (!nome || !email || !senha || !tel || !nasc || !gen) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return false;
    }

    if (!email.includes("@")) {
      Alert.alert("Erro", "E-mail inválido!");
      return false;
    }

    if (senha.length < 6) {
      Alert.alert("Erro", "Senha deve ter no mínimo 6 caracteres");
      return false;
    }

    return true;
  }

  async function Cadastrar() {
    if (!validarCampos()) return;

    const dataFormatada = formatApi(form.nasc);

    if (!dataFormatada) {
      Alert.alert("Erro", "Data inválida! Use dd/mm/aaaa");
      return;
    }

    const payload = {
      nome: form.nome,
      email: form.email,
      senha: form.senha,
      telefone: form.tel,
      nascimento: dataFormatada,
      genero: form.gen,
    };

    try {
      setLoading(true);

      const response = await axios.post(
        "http://10.0.0.2:8000/api/cadastrar_usuario",
        payload
      );

      console.log("RESPOSTA API:", response.data);

      const { token, msg } = response.data;

      if (token) {
        await Storage.salvar('@token', token);

        Alert.alert("Sucesso", "Cadastro realizado!");
        navigation.replace("Login");
      } else {
        Alert.alert("Erro", msg || "Erro ao cadastrar");
      }

    } catch (error) {
      console.log("ERRO COMPLETO:", error);

      const mensagem =
        error?.response?.data?.msg ||
        error.message ||
        "Erro inesperado";

      Alert.alert("Erro", mensagem);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Preencha seus dados</Text>
      </View>

      <Input placeholder="Nome completo" value={form.nome} onChangeText={(v) => handleChange('nome', v)} />

      <Input placeholder="E-mail" value={form.email} onChangeText={(v) => handleChange('email', v)} keyboardType="email-address" />

      <Input placeholder="Senha" value={form.senha} onChangeText={(v) => handleChange('senha', v)} secureTextEntry />

      <Input placeholder="Telefone" value={form.tel} onChangeText={(v) => handleChange('tel', v)} />

      <Input
        placeholder="Nascimento (dd/mm/aaaa)"
        value={form.nasc}
        onChangeText={(v) => handleChange('nasc', formatarInputData(v))}
      />

      <Input placeholder="Gênero" value={form.gen} onChangeText={(v) => handleChange('gen', v)} />

      <Botao titulo="CADASTRAR" onPress={Cadastrar} loading={loading} />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Já tem conta? Faça login</Text>
      </TouchableOpacity>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#d1e000',
    marginTop: 60,
  },
  subtitle: {
    fontSize: 20,
    color: '#d1e000',
    marginTop: 5,
  },
  link: {
    textAlign: 'center',
    marginTop: 20,
    color: '#004cff',
    fontSize: 16,
  },
});