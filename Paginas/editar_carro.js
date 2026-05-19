import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Text, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

// IMPORTS DOS COMPONENTES
// ajuste o caminho conforme seu projeto
import { Background, Container, Texto, Input, Botao } from "../components";

export default function Edita({ navigation }) {

    const route = useRoute();
    const item = route.params || {};

    const [id] = useState(item?.id_livro || "");
    const [titulo, setTitulo] = useState(item?.titulo || "");
    const [autor, setAutor] = useState(item?.autor || "");
    const [ano_publicacao, setAnoPublicacao] = useState(
        item?.ano_publicacao?.toString() || ""
    );
    const [editora, setEditora] = useState(item?.editora || "");
    const [isbn, setIsbn] = useState(item?.isbn || "");
    const [paginas, setPaginas] = useState(
        item?.paginas?.toString() || ""
    );
    const [preco, setPreco] = useState(
        item?.preco?.toString() || ""
    );
    const [gen, setGen] = useState(item?.genero || "");

    async function editaLivro() {

        if (
            titulo === "" ||
            autor === "" ||
            ano_publicacao === "" ||
            editora === "" ||
            isbn === "" ||
            paginas === "" ||
            preco === "" ||
            gen === ""
        ) {

            Alert.alert("ERRO", "Favor preencher todos os campos!");
            return;
        }

        try {

            const token = await AsyncStorage.getItem("token");

            console.log("TOKEN:", token);
            console.log("ID LIVRO:", id);

            if (!token) {
                Alert.alert("Erro", "Token não encontrado!");
                return;
            }

            const response = await axios.put(
                "http://10.0.2.2:8000/api/altera_carro",
                {
                    token: token,
                    id_livro: id,
                    titulo: titulo,
                    autor: autor,
                    ano_publicacao: ano_publicacao,
                    editora: editora,
                    isbn: isbn,
                    paginas: paginas,
                    preco: preco,
                    genero: gen,
                }
            );

            console.log("SUCESSO:", response.data);

            Alert.alert("Sucesso", "Dados alterados com sucesso!");

            navigation.navigate("Home");

        } catch (error) {

            console.log(
                "ERRO:",
                error.response?.data || error.message
            );

            Alert.alert(
                "Erro",
                "Não foi possível alterar o livro."
            );
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>

                <Background>
                    <Container>

                        <Text
                            style={{
                                fontFamily: "rushon",
                                color: "#fff",
                                fontSize: 50,
                            }}
                        >
                            Editar Livro
                        </Text>

                        <Texto txt={"Título"} />
                        <Input
                            placeholder={"Título.:"}
                            value={titulo}
                            onChangeText={setTitulo}
                        />

                        <Texto txt={"Autor"} />
                        <Input
                            placeholder={"Autor.:"}
                            value={autor}
                            onChangeText={setAutor}
                        />

                        <Texto txt={"Ano de Publicação"} />
                        <Input
                            placeholder={"Publicação.:"}
                            value={ano_publicacao}
                            onChangeText={setAnoPublicacao}
                        />

                        <Texto txt={"Editora"} />
                        <Input
                            placeholder={"Editora.:"}
                            value={editora}
                            onChangeText={setEditora}
                        />

                        <Texto txt={"ISBN"} />
                        <Input
                            placeholder={"ISBN.:"}
                            value={isbn}
                            onChangeText={setIsbn}
                        />

                        <Texto txt={"Páginas"} />
                        <Input
                            placeholder={"Páginas.:"}
                            value={paginas}
                            onChangeText={setPaginas}
                        />

                        <Texto txt={"Preço"} />
                        <Input
                            placeholder={"Valor.:"}
                            value={preco}
                            onChangeText={setPreco}
                        />

                        <Texto txt={"Genero"} />
                        <Input
                            placeholder={"Genero.:"}
                            value={gen}
                            onChangeText={setGen}
                        />

                        <Botao
                            btnTxt={"EDITAR"}
                            onPress={editaLivro}
                        />

                    </Container>
                </Background>

            </ScrollView>
        </SafeAreaView>
    );
}