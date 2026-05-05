import { useState, useEffect } from "react";
import axios from "axios";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function Home() {
  const [dados, setDados] = useState([]);
  const [modal, setModal] = useState(false);
  const [recebeDado, setRecebeDado] = useState({});

  useEffect(() => {
    async function Buscar() {
      try {
        const response = await axios.get("https://68e447c28e116898997b7...");
        console.log(response.data);
        setDados(response.data);
      } catch (error) {
        console.log("ERRO", error);
      }
    }

    Buscar();
  }, []);

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => {
        setRecebeDado(item);
        setModal(true);
      }}
    >
      <View style={styles.card}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Usuários</Text>

      <FlatList
        data={dados}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <Modal
        visible={modal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalNome}>{recebeDado.nome}</Text>
            <Text style={styles.modalEmail}>{recebeDado.email}</Text>

            <TouchableOpacity
              style={styles.botao}
              onPress={() => setModal(false)}
            >
              <Text style={styles.botaoTexto}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    padding: 10,
  },

  title: {
    color: "#D4AF37",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#1A1A1A",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D4AF37",
  },

  nome: {
    color: "#D4AF37",
    fontSize: 18,
    fontWeight: "bold",
  },

  email: {
    color: "#CCCCCC",
    fontSize: 14,
    marginTop: 5,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "80%",
    backgroundColor: "#1A1A1A",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D4AF37",
    alignItems: "center",
  },

  modalNome: {
    color: "#D4AF37",
    fontSize: 20,
    fontWeight: "bold",
  },

  modalEmail: {
    color: "#CCCCCC",
    marginVertical: 10,
  },

  botao: {
    backgroundColor: "#D4AF37",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },

  botaoTexto: {
    color: "#000",
    fontWeight: "bold",
  },
});