# ChangeLog - Parte 2

## Objetivo

Refatorar telas e componentes repetidos para reduzir acoplamento e simplificar a interface.

## O que foi feito

- Quebra de componentes grandes em partes menores.
- Criação de hooks para reaproveitar lógica.
- Centralização do acesso ao storage.
- Ajuste da validação do checkout para usar hook.
- Correção da Home para manter os cards lado a lado.
- Correção de um warning de CSS.

## Code smells corrigidos

- Componentes grandes e difíceis de manter, com responsabilidade concentrada no mesmo arquivo.
- Lógica duplicada entre telas e componentes, especialmente em validação e ações do carrinho.
- Baixa coesão, com regra de negócio misturada com apresentação.
- Alto acoplamento entre checkout, storage e validação, dificultando reaproveitamento.
- Inconsistência visual causada por regra de layout espalhada e warning de CSS.

## Arquivos principais

- `src/components/ProductList.jsx`
- `src/components/CartItem.jsx`
- `src/hooks/useSession.jsx`
- `src/hooks/useFormValidation.jsx`
- `src/screens/Home.jsx`
- `src/screens/Cart.jsx`
- `src/screens/Checkout.jsx`

## Validação

- Build executado com sucesso após a refatoração.

## Resultado

A interface ficou mais organizada, com menos duplicação e melhor manutenção.