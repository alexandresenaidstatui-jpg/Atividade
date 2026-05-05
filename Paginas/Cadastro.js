import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Container from '../components/Container';
import Input from '../components/Input';
import Botao from '../components/Botao';
import axios from 'axios';

export default function Cadastro({ navigation }) {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tel, setTel] = useState('');
  const [nasc, setNasc] = useState('');
  const [gen, setGen] = useState('');
  const [loading, setLoading] = useState(false);

   function formatApi(Data){

        const [dia, mes, ano] = Data.split("/");
        return `${ano}-${mes}-${dia}`;

        }
        const values = {

            nome:nome,
            email:email,
            senha:senha,
            telefone:tel,
            nascimento:formatApi(nasc),
            genero:gen,

        }
        async function Cadastrar() {

            if(nome === "" || email === "" || senha === "" || tel === "" ||nasc === "" || gen === ""){

        Alert.alert("ERRO", "Favor Preencher todos os Campos!");

            }else{
              

                try{

                    const response = await axios.get("http://10.122.41.153:8000/api/cadastrar_usuario",values);
                    console.log(response.data);                


                    Alert.alert("Sucesso!", "Cadastro Realizado com sucesso!");
                    navigation.navigate("Login");


                }catch(error){

                console.log("ERRO", error.response.data.errors);


                }

            }
           
        }
  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Preencha seus dados</Text>
      </View>

      <Input
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
      />

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

<Input
        placeholder="Telefone"
        value={tel}
        onChangeText={setTel}
      />
      <Input
        placeholder="Nascimento"
        value={nasc}
        onChangeText={setNasc}
      />
      <Input
        placeholder="Genero"
        value={gen}
        onChangeText={setGen}
      />
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
    marginBottom: 200,
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
    color: '#004cff',
    fontSize: 20,
  },
});