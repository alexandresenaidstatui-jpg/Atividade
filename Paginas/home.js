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
  TextInput,
  StyleSheet,
} from "react-native";

export default function Home() {
  const [dados, setDados] = useState([]);
  const [modal, setModal] = useState(false);
  const [modo, setModo] = useState("create"); // create | edit
  const [selecionado, setSelecionado] = useState(null);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    Buscar();
  }, []);

  async function Buscar() {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      setDados(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  function abrirCriar() {
    setModo("create");
    setForm({ nome: "", email: "", phone: "" });
    setModal(true);
  }

  function abrirEditar(item) {
    setModo("edit");
    setSelecionado(item);
    setForm({
      nome: item.name,
      email: item.email,
      phone: item.phone,
    });
    setModal(true);
  }

  async function salvar() {
    try {
      if (modo === "create") {
        const res = await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          form
        );

        setDados([...dados, res.data]);
      } else {
        const res = await axios.put(
          `https://jsonplaceholder.typicode.com/users/${selecionado.id}`,
          form
        );

        const atualizado = dados.map((item) =>
          item.id === selecionado.id ? res.data : item
        );

        setDados(atualizado);
      }

      setModal(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function deletar(id) {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );

      const novoArray = dados.filter((item) => item.id !== id);
      setDados(novoArray);
    } catch (error) {
      console.log(error.message);
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Pressable onPress={() => abrirEditar(item)}>
        <Text style={styles.nome}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </Pressable>

      <TouchableOpacity
        onPress={() => deletar(item.id)}
        style={styles.deleteBtn}
      >
        <Text style={{ color: "#fff" }}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>CRUD Usuários</Text>

      <TouchableOpacity style={styles.addBtn} onPress={abrirCriar}>
        <Text style={{ color: "#000", fontWeight: "bold" }}>
          + Novo Usuário
        </Text>
      </TouchableOpacity>

      <FlatList
        data={dados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      {/* MODAL CRUD */}
      <Modal visible={modal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              {modo === "create" ? "Criar Usuário" : "Editar Usuário"}
            </Text>

            <TextInput
              placeholder="Nome"
              value={form.nome}
              onChangeText={(v) =>
                setForm({ ...form, nome: v })
              }
              style={styles.input}
            />

            <TextInput
              placeholder="Email"
              value={form.email}
              onChangeText={(v) =>
                setForm({ ...form, email: v })
              }
              style={styles.input}
            />

            <TextInput
              placeholder="Telefone"
              value={form.phone}
              onChangeText={(v) =>
                setForm({ ...form, phone: v })
              }
              style={styles.input}
            />

            <TouchableOpacity style={styles.saveBtn} onPress={salvar}>
              <Text style={{ color: "#000", fontWeight: "bold" }}>
                Salvar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModal(false)}>
              <Text style={{ color: "#fff", marginTop: 10 }}>
                Fechar
              </Text>
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
    textAlign: "center",
    marginBottom: 10,
  },

  addBtn: {
    backgroundColor: "#D4AF37",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },

  card: {
    backgroundColor: "#1A1A1A",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    borderColor: "#D4AF37",
    borderWidth: 1,
  },

  nome: {
    color: "#D4AF37",
    fontSize: 18,
  },

  email: {
    color: "#ccc",
  },

  deleteBtn: {
    backgroundColor: "red",
    marginTop: 10,
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
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
    borderRadius: 10,
  },

  modalTitle: {
    color: "#D4AF37",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },

  saveBtn: {
    backgroundColor: "#D4AF37",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});