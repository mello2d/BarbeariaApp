
Configuração do Projeto React Native
1. Dependências do Projeto
Instale as dependências principais com os seguintes comandos:


npm install react react-native
Expo (opcional para facilitar o desenvolvimento)
Se preferir usar o Expo, instale com o seguinte comando:



npm install expo
Moment.js (para manipulação de datas)
Instale o Moment.js para trabalhar com datas de forma prática:



npm install moment
FontAwesome (para ícones)
Se desejar adicionar ícones, instale o FontAwesome:


npm install @expo/vector-icons
Se não usar Expo, você pode instalar diretamente react-fontawesome ou outras bibliotecas de ícones.

React Navigation (para navegação entre telas)
Instale as dependências para navegação entre telas:


npm install @react-navigation/native
npm install @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
React Native Gesture Handler e React Native Reanimated (para animações)
Essas bibliotecas ajudam a criar gestos e animações interativas no seu aplicativo:


npm install react-native-gesture-handler react-native-reanimated
React Native Paper (para componentes UI prontos) - opcional
Se quiser usar componentes UI prontos como botões e caixas de texto:



npm install react-native-paper
React Native StatusBar (para personalizar a barra de status)
Instale para personalizar a barra de status do dispositivo:



npm install react-native-status-bar
React Native Safe Area Context (para compatibilidade com a área segura em dispositivos com notch)
Instale para garantir que a interface não fique oculta por barras de status:


npm install react-native-safe-area-context
2. Dependências de Desenvolvimento (opcionais)
ESLint (para garantir padrões de codificação)
Instale o ESLint para manter um código limpo e consistente:

npm install eslint --save-dev
Prettier (para formatação automática de código)
Instale o Prettier para garantir que o código seja formatado automaticamente:


npm install prettier --save-dev
React Native Debugger (para depuração)
Instale a ferramenta React Native Debugger para depuração do aplicativo:


npm install react-native-debugger --save-dev
Jest (para testes automatizados)
Instale o Jest para testes de unidades e integração:


npm install jest --save-dev
3. Extensões para o Editor (Recomendações)
ESLint + Prettier (VSCode)
Instale as extensões ESLint e Prettier no seu editor (VSCode ou outro).

React Native Tools (VSCode)
A extensão React Native Tools facilita o desenvolvimento com depuração integrada.

Bracket Pair Colorizer (VSCode)
Instale essa extensão para destacar pares de colchetes, parênteses e chaves com cores diferentes.

Prettier (VSCode)
Instale a extensão Prettier no VSCode para formatar o código automaticamente.


Passo a Passo para Usar o Expo Go para Simular o App

1. Instalar o Expo CLI
Se você ainda não instalou o Expo CLI, instale-o globalmente usando o npm:


npm install -g expo-cli
Isso permite que você use o Expo CLI para criar, rodar e gerenciar seus projetos React Native com Expo.

2. Criar um Novo Projeto com Expo
Se você ainda não criou o seu projeto, use o seguinte comando para iniciar um novo projeto com Expo:


expo init BarbeariaApp
Escolha a opção "blank" para um projeto vazio ou qualquer template que atenda às suas necessidades.

3. Iniciar o Projeto no Expo
Após criar o projeto, navegue até o diretório do projeto e inicie o servidor Expo com o comando:


cd BarbeariaApp
expo start
Isso abrirá o Expo Developer Tools no seu navegador e mostrará um código QR.

4. Instalar o Expo Go no Dispositivo Móvel
Para testar seu aplicativo no celular, baixe o Expo Go na loja de aplicativos:

Para Android: Baixe o Expo Go na Google Play Store.
Para iOS: Baixe o Expo Go na App Store.
5. Escanear o Código QR com o Expo Go
Abra o Expo Go no seu dispositivo móvel.
No Expo Developer Tools (navegador), você verá um código QR.
No Expo Go, toque em "Scan QR Code" e escaneie o código exibido no navegador.
6. Testar o App no Dispositivo Móvel
Após escanear o código QR, seu aplicativo será carregado automaticamente no Expo Go no seu dispositivo móvel.

7. Fazer Alterações e Ver Resultados Imediatos
Com o Expo Go, qualquer alteração no código do seu projeto será refletida instantaneamente no seu dispositivo móvel, sem necessidade de recompilar ou reiniciar o aplicativo manualmente. O Expo oferece recarregamento ao vivo, facilitando o desenvolvimento e testes rápidos.

8. Fechar o Expo Go
Para sair do aplicativo, basta fechar o Expo Go no seu dispositivo. Para interromper o servidor Expo, pressione Ctrl+C no terminal.

Dicas Importantes:
Conexão com a Internet: Seu dispositivo móvel e o computador devem estar na mesma rede Wi-Fi para que o Expo Go consiga comunicar-se com o servidor do Expo.
Desempenho: Embora o Expo Go facilite o desenvolvimento, o desempenho no simulador do Expo pode ser diferente de um dispositivo físico. Para testes mais precisos, é recomendável usar o dispositivo real.
Gerenciamento de Dependências: Caso use bibliotecas nativas (como react-native-gesture-handler ou react-native-reanimated), verifique se elas são compatíveis com o Expo ou se precisam ser "ejetadas" do Expo para uso completo.

