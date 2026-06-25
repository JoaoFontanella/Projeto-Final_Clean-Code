# ChangeLog - Parte 1

## Objetivo

Organizar a estrutura inicial do front-end e separar responsabilidades principais da aplicação.

## O que foi feito

- Criada a camada `src/app/` para concentrar `App`, rotas e providers.
- Centralizados os providers da aplicação em um único wrapper.
- Movidas as rotas para uma camada própria.
- Criada a camada `src/services/` para API e storage.
- Migrados os helpers de API para `src/services/api/`.
- Centralizado o bootstrap de storage em `src/services/storage/`.
- Atualizados os componentes e telas que consumiam os helpers antigos.

## Validação

- Build executado com sucesso após a reorganização.

## Resultado

A base do projeto ficou mais modular e pronta para as próximas etapas de refatoração e testes.