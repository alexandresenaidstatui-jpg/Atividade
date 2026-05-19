import {useEffect, useState} from 'react';
import axios from 'axios';
import { View, Text, FlatList, StyleSheet, Pressable, Alert, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Listar_carro({navigation}) {

    const [dados, setRecebedados] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [getDados, setGetDados] = useState({});

    async function listar() {

        try {
             const token = await AsyncStorage.getItem("token");
             console.log("token:", token);

             if (token) {

                const response = await axios.post("http://10.0.2.2:8000/api/todos_carros",{

                    token:token,
                });
                console.log("Resposta da api:", response.data.carro)
                    
                    setRecebedados(response.data.carro);

    }
}
catch (error) {
    
    console.log("ERRO", error.response?.data?.error || error.message);

}

    }

    useEffect(() => {
        listar();
    }, []);

    const Renderitem = ({ item }) => (
<Pressable style={{height: 80, backgroundColor: "#d22020", justifyContent: 'center', alignItems: 'center', borderWidth:1, borderColor:"#000"  }} onPress={()=>{setGetDados(item); setModalVisible(true);}} >

<Text>{item.modelo}</Text>

</Pressable>
    )

    async function Deletar() {

        try{
            const token = await AsyncStorage.getItem("token");
            console.log("token:", token);
            if(token){
                const response = await axios.delete("http://10.0.2.2:8000/api/deletar_carro",{
                    data:{
                    token:token,
                    id_carro:getDados.id,
                    }
                });
                console.log("Resposta da api:", response.data.carro);
                Alert.alert("Sucesso!", "Carro Deletado com Sucesso!");
                setModalVisible(false);
                listar();
            }
        }catch(error){
            console.log("ERRO", error.response?.data?.errors || error.message);
            Alert.alert("ERRO", "Não foi possível deletar o carro!");
        }
    }

    return(

      <SafeAreaView style={{flex:1}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center',marginTop:20}}>Lista de Carros</Text>
        <FlatList
          data={dados}
          keyExtractor={(item) => item.id}
          renderItem={Renderitem}
        />
<Modal
animationType="slide"
transparent={false}
visible={modalVisible}
onRequestClose={()=>setModalVisible(!modalVisible)}
 > 
<View style={{flex:1, justifyContent:'center', alignItems:'center',}} >
<Text style={{fontSize: 20, color:"#0000"}}>{getDados.modelo}</Text>
<Text style={{fontSize: 20, color:"#0000"}}>{getDados.cor}</Text>
<Text style={{fontSize: 20, color:"#0000"}}>{getDados.ano}</Text>
<Text style={{fontSize: 20, color:"#0000"}}>{getDados.valor}</Text>
<Text style={{fontSize: 20, color:"#0000"}}>{getDados.potencia}</Text>
<Text style={{fontSize: 20, color:"#0000"}}>{getDados.dono}</Text>
<Text style={{fontSize: 20, color:"#0000"}}>{getDados.placa}</Text>
<Text style={{fontSize: 20, color:"#0000"}}>{getDados.tipo_gasolina}</Text>
<Text style={{fontSize: 20, color:"#0000"}}>{getDados.fabricante}</Text>
</View>

<View style={{flexDirection:"row", justifyContent:'space-around', margin:20}}>
<TouchableOpacity style={{backgroundColor:"#dbdb09", padding:10, borderRadius:5, borderColor:"#000", borderWidth:1}} onPress={()=>{navigation.navigate("Editar", { item: getDados });}} >
    <Text>Alterar</Text>
</TouchableOpacity>

<TouchableOpacity style={{backgroundColor:"#db0909", padding:10, borderRadius:5, borderColor:"#000", borderWidth:1}} onPress={()=>Alert.alert("Confirmação",`Deseja realmente deletar este carro? ${getDados.modelo}?`, [ { text: "Cancelar" }, { text: "Deletar", onPress: () => Deletar() } ])}>
    <Text>Deletar</Text>
</TouchableOpacity>

</View>


</Modal>

      </SafeAreaView>
    );

}