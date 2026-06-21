# ChangeLog - Parte 1

## Objetivo

Organizar a base da arquitetura do front-end e padronizar a estrutura inicial do projeto, sem alterar o back-end e sem entrar ainda nas fases de testes, lint ou refatoração profunda das telas.

## Alterações realizadas

### 1. Nova camada de aplicação

- Criada a pasta `src/app/` para concentrar a estrutura central do front-end.
- Separadas as responsabilidades em três arquivos principais:
  - `src/app/App.jsx`
  - `src/app/router/appRouter.jsx`
  - `src/app/providers/AppProviders.jsx`
- O `App` passou a servir como ponto de composição da aplicação, reduzindo acoplamento com a árvore principal de componentes.

### 2. Centralização dos providers

- O `CartProvider` e o `FavoritesProvider` foram agrupados em um único wrapper de aplicação.
- A lógica de providers deixou de ficar acoplada ao arquivo raiz da aplicação.

### 3. Organização das rotas

- As rotas foram movidas para uma camada própria em `src/app/router/`.
- O roteamento passou a ficar isolado da composição principal do `App`.
- A configuração continua funcional, mas agora está mais fácil de manter e expandir.

### 4. Criação da camada de serviços

- Criada a pasta `src/services/` para concentrar integrações com API e storage.
- Os helpers que antes estavam em `src/components/` passaram a ter uma estrutura própria em `src/services/api/`.
- Também foi criada a camada `src/services/storage/` para lidar com bootstrap de sessão.

### 5. Migração dos helpers de API

- Os arquivos abaixo passaram a existir como implementação principal em `src/services/api/`:
  - `apiBaseUrl.js`
  - `productsApi.js`
  - `categoriesApi.js`
  - `productsByCategoryApi.js`
  - `cartApi.js`
  - `checkoutApi.js`
- As telas e contexts passaram a importar os serviços novos diretamente.

### 6. Bootstrap de storage centralizado

- A inicialização de `AsyncStorage` saiu do `src/main.jsx` e foi movida para `src/services/storage/sessionBootstrap.js`.
- O bootstrap ficou mais previsível e menos espalhado pelo ponto de entrada.

### 7. Compatibilidade temporária dos arquivos antigos

- Os arquivos antigos que só faziam export continuam existindo como ponte temporária:
  - `src/components/Category.jsx`
  - `src/components/Products.jsx`
  - `src/components/ProductsCategory.jsx`
  - `src/components/CartBD.jsx`
  - `src/components/CheckoutBD.jsx`
- Eles foram mantidos apenas para evitar quebra durante a transição, mas a remoção definitiva deve acontecer na etapa final da refatoração.

### 8. Atualização dos consumidores

- Arquivos de tela e contexto foram atualizados para importar os serviços novos.
- Os principais arquivos ajustados foram:
  - `src/components/Header.jsx`
  - `src/context/CartContext.jsx`
  - `src/screens/Home.jsx`
  - `src/screens/Categoria.jsx`
  - `src/screens/ProductDetail.jsx`
  - `src/screens/Cart.jsx`
  - `src/screens/Checkout.jsx`

## Code Smells Corrigidos Nesta Etapa

Nesta primeira parte, alguns code smells já foram atacados diretamente:

- **Mistura de responsabilidades no arquivo raiz**: a composição da aplicação, as rotas e os providers deixaram de ficar concentrados em um único arquivo.
- **Side effects no bootstrap**: a inicialização de `AsyncStorage` saiu do entry point e passou para uma camada específica de storage.
- **Arquivos utilitários no lugar errado**: os helpers de API que estavam em `components` foram movidos para `services/api`.
- **Acoplamento estrutural desnecessário**: a aplicação passou a ter uma separação mais clara entre `app`, `services`, `context` e `screens`.
- **Nomes e organização pouco expressivos**: a nova estrutura de pastas deixa mais claro onde cada responsabilidade vive.
- **Duplicação de pontos de acesso à API**: a URL base passou a ser centralizada em um arquivo único.

Esses smells não foram todos eliminados do projeto inteiro ainda, mas a base para corrigi-los foi criada nesta etapa.

## Resultado da Parte 1

Ao final desta etapa, a base do front-end ficou mais modular, com responsabilidade melhor separada entre aplicação, rotas, providers, serviços e storage. Isso prepara o terreno para as próximas etapas de refatoração, testes e padronização.