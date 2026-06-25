# ChangeLog - Parte 3

## Objetivo

Criar a base de testes automatizados do front-end e deixar a execução validada localmente.

## O que foi feito

- Configuração do Vitest com `jsdom`.
- Setup do ambiente de testes com `@testing-library`.
- Inclusão dos scripts de teste e coverage no `package.json`.
- Criação de testes unitários iniciais para componentes e contextos.
- Criação de teste básico para `Checkout` com mocks.
- Configuração de coverage e threshold mínimo.
- Criação de workflow de CI para testes e coverage.
- Atualização do `README` com instruções de uso.

## Arquivos principais

- `vitest.config.js`
- `src/setupTests.js`
- `src/__tests__/Card.test.jsx`
- `src/__tests__/ProductList.test.jsx`
- `src/__tests__/CartItem.test.jsx`
- `src/__tests__/CartContext.test.jsx`
- `src/__tests__/storageService.test.jsx`
- `src/__tests__/Checkout.test.jsx`
- `.github/workflows/ci.yml`

## Validação

- Testes executados com sucesso.
- Coverage gerado com sucesso em `coverage/`.

## Resultado

A etapa de testes ficou pronta para uso local e para validação automática no CI.

## Validação

- `npm run test:coverage` executado com sucesso e cobrindo +50% .

## Ajustes feitos depois

- Foram adicionados mais testes para `Card`, `CartItem`, `Checkout`, `useCartActions` e `useFormValidation`.
- Também foi coberto o `storageService` com mocks.
- O workflow do GitHub Actions foi ajustado para instalar as dependências sem erro.
