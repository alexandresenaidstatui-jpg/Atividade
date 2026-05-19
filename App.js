import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './Paginas/Splash';
import Login from './Paginas/Login';
import Cadastro from './Paginas/Cadastro';
import Salvar_carro from './Paginas/cadastrar_carro';
import Inicio from './Paginas/inicio';
import  Listar_carro  from './Paginas/Listar_carro';
import Editar from './Paginas/edita_carro';
import Deletar from './Paginas/delet_carro';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Salvar_carro" component={Salvar_carro} />
         <Stack.Screen name="Listar_carro" component={Listar_carro} />
         <Stack.Screen name="Editar" component={Editar} />
         <Stack.Screen name="Deletar" component={Deletar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}