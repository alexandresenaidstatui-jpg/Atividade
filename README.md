> Por que tenho uma pasta chamada ".expo" no meu projeto?

A pasta ".expo" é criada quando um projeto Expo é iniciado usando o comando "expo start".

> O que os arquivos contêm?

- "devices.json": contém informações sobre os dispositivos que abriram este projeto recentemente. Ele é usado para preencher a lista "Sessões de desenvolvimento" nas suas versões de desenvolvimento.

- "settings.json": contém a configuração do servidor usada para servir o manifesto do aplicativo.

> Devo adicionar a pasta ".expo" ao meu repositório?

Não, você não deve compartilhar a pasta ".expo". Ela não contém nenhuma informação relevante para outros desenvolvedores que trabalham no projeto, sendo específica para a sua máquina.

Após a criação do projeto, a pasta ".expo" já é adicionada ao seu arquivo ".gitignore".


> Expo (React Native)

O Expo é uma ferramenta e plataforma que facilita o desenvolvimento de aplicativos mobile com React Native, permitindo criar apps para Android, iOS e Web de forma rápida e sem precisar configurar ambientes nativos complexos.

> O que é o Expo?

O Expo é um conjunto de ferramentas que simplifica o desenvolvimento mobile usando JavaScript e React. Ele fornece:

Ambiente pronto para desenvolvimento
APIs nativas já integradas
Build e deploy simplificados

> Testes em dispositivos físicos com facilidade
📦 Principais vantagens
⚡ Setup rápido (sem Android Studio/Xcode inicialmente)
📱 Teste instantâneo com o app Expo Go
🔧 APIs prontas (câmera, localização, sensores, etc.)
🌐 Suporte a web (com React Native Web)
🔄 Hot Reload (atualização em tempo real)
🛠️ Instalação

>Você pode começar usando o CLI do Expo:

npm install -g create-expo-app

>Criar um projeto:

npx create-expo-app meu-app
cd meu-app
npm start Executando o projeto

>Após iniciar:

npm start

>Você pode:

Escanear o QR code com o app Expo Go
Rodar no emulador Android
Rodar no simulador iOS (Mac)

📁 Estrutura básica
meu-app/
├── App.js
├── package.json
├── node_modules/
└── assets/
🧩 Exemplo básico
import { Text, View } from 'react-native';


export default function App() {
  return (
    <View>
      <Text>Olá, mundo com Expo!</Text>
    </View>
  );
}
> APIs disponíveis

O Expo oferece várias APIs prontas:

Câmera
Localização
Notificações
Sensores (acelerômetro, giroscópio)
Armazenamento local

Exemplo:

npx expo install expo-camera
 Build e publicação

Para gerar APK ou app iOS:

npx expo build

Ou com a nova ferramenta:

npx expo prebuild
npx expo run:android
 Deploy OTA (Over The Air)

Você pode atualizar seu app sem precisar publicar novamente nas lojas:

npx expo publish



 Quando usar Expo?

Use Expo se você quer:

Desenvolver rápido
Evitar configuração nativa complexa
Criar MVPs ou apps simples a médios



Evite Expo se você precisa:

Customizações nativas muito específicas
Controle total do código nativo

 Recursos úteis

Documentação oficial
Comunidade ativa
Integração com React Native
