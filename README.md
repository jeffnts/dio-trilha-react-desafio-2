# GitHub Repository Search App

<p align="center">
<a href="https://web.dio.me/home">
<img  width="200"  height="100"  src="https://hermes.digitalinnovation.one/assets/diome/logo.svg">
</p>

Este projeto é uma aplicação React que permite buscar repositórios no GitHub e gerenciar uma lista de repositórios encontrados.

## Funcionalidades

- Buscar repositórios no GitHub
- Adicionar repositórios à lista
- Remover repositórios da lista
- Limpar toda a lista de repositórios
- Exibir mensagens de erro usando um componente Toast

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm start`

Executa a aplicação em modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-la no navegador.

A página será recarregada quando você fizer alterações.\
Você também verá quaisquer erros de lint no console.

### `npm test`

Inicia o executor de testes no modo interativo de observação.\
Veja a seção sobre [executar testes](https://facebook.github.io/create-react-app/docs/running-tests) para mais informações.

### `npm run build`

Compila a aplicação para produção na pasta `build`.\
Ele corretamente agrupa o React no modo de produção e otimiza a construção para o melhor desempenho.

A compilação é minificada e os nomes dos arquivos incluem os hashes.\
Sua aplicação está pronta para ser implantada!

Veja a seção sobre [implantação](https://facebook.github.io/create-react-app/docs/deployment) para mais informações.

## Estrutura do Projeto

- `src/components`: Contém os componentes reutilizáveis, como `Input`, `Button`, `ItemRepo` e `Toast`.
- `src/services`: Contém a configuração do Axios para fazer requisições à API do GitHub.
- `src/styles`: Contém os estilos globais e específicos dos componentes.
- `src/App.js`: Componente principal que gerencia o estado e a lógica da aplicação.

## Como Usar

1. Digite o nome do repositório que deseja buscar no campo de entrada.
2. Pressione Enter ou clique no botão "Buscar" para buscar repositórios no GitHub.
3. Os repositórios encontrados serão adicionados à lista, a menos que já existam na lista.
4. Use o botão "Remover" para remover um repositório específico da lista.
5. Use o botão "Limpar" para remover todos os repositórios da lista.

## Dependências

- React
- Axios
- Styled-components

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Você pode abrir issues e enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT.