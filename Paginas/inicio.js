import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Botao,
} from "react-native";
import Salvar_carro from "./cadastrar_carro";

export default function Inicio({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá 👑</Text>
            <Text style={styles.title}>XLmotors</Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>LC</Text>
          </View>
        </View>

        {/* Busca */}
        <TextInput
          placeholder="Pesquisar veículos..."
          placeholderTextColor="#777"
          style={styles.search}
        />

        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>
            Venda seu carro com facilidade 
          </Text>

          <Text style={styles.bannerText}>
            Plataforma premium para compra e venda de veículos.
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Listar_carro")}>
              <Text style={styles.buttonText}>Explorar</Text>
            </TouchableOpacity>

             <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate("Salvar_carro")}
>
  <Text style={styles.buttonText}>Vender carro</Text>
</TouchableOpacity>
          </View>
        </View>

        {/* Sessão */}
        <Text style={styles.sectionTitle}>
          Veículos em destaque
        </Text>

        {/* Card 1 */}
        <View style={styles.carCard}>
          <Text style={styles.carName}>BMW M4 Competition</Text>
          <Text style={styles.carPrice}>R$ 620.000</Text>
          <Text style={styles.carInfo}>2024 • Automático • 0km</Text>
        </View>

        {/* Card 2 */}
        <View style={styles.carCard}>
          <Text style={styles.carName}>Porsche 911 Turbo</Text>
          <Text style={styles.carPrice}>R$ 1.200.000</Text>
          <Text style={styles.carInfo}>2025 • Automático • 0km</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  greeting: {
    color: "#C9A227",
    fontSize: 16,
  },

  title: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "bold",
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#C9A227",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#000",
    fontWeight: "bold",
  },

  search: {
    backgroundColor: "#151515",
    borderRadius: 16,
    padding: 15,
    color: "#FFF",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  banner: {
    backgroundColor: "#151515",
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: "#C9A227",
    marginBottom: 30,
  },

  bannerTitle: {
    color: "#C9A227",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },

  bannerText: {
    color: "#DDD",
    lineHeight: 22,
    marginBottom: 22,
  },

  actions: {
    flexDirection: "row",
    gap: 12,
  },

  button: {
    backgroundColor: "#C9A227",
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 14,
  },

  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },

  sellButton: {
    borderWidth: 1,
    borderColor: "#C9A227",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
  },

  sellButtonText: {
    color: "#C9A227",
    fontWeight: "bold",
  },

  sectionTitle: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 18,
  },

  carCard: {
    backgroundColor: "#151515",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  carName: {
    color: "#C9A227",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  carPrice: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },

  carInfo: {
    color: "#AAA",
  },
});