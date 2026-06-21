# Plano de Refatoração do Front-end

## 1. Diagnóstico Inicial

O front-end hoje tem boa base funcional, mas mistura responsabilidades que dificultam manutenção e testes. Os principais problemas são:

- Inicialização com efeitos colaterais no ponto de entrada, o que deixa o boot da aplicação pouco previsível.
- Estado global e persistência local espalhados em contexts e componentes, com lógica assíncrona duplicada.
- Mistura de responsabilidade entre apresentação, regra de negócio leve e acesso a dados em vários arquivos.
- Nomes inconsistentes de rotas, arquivos, variáveis e componentes, o que reduz legibilidade e padronização.
- Dependência forte entre telas, components e services, aumentando acoplamento e dificultando alteração isolada.
- Repetição de padrões de busca, armazenamento e atualização de carrinho/favoritos.
- Ausência de base de testes automatizados e de configuração formal de linting além do script atual.
- Código com sinais de code smells como funções longas, blocos aninhados, duplicação e pequenas violações de Clean Code.

## 2. Nova Arquitetura de Pastas

Estrutura sugerida, mantendo o back-end intacto e refatorando apenas o front-end:

```txt
src/
  app/
    router/
    providers/
    App.jsx
  assets/
  components/
    layout/
    ui/
    product/
    cart/
    favorites/
  features/
    home/
    product-detail/
    cart/
    checkout/
    login/
    profile/
    favorites/
    category/
  hooks/
  services/
    api/
    storage/
  context/
  utils/
  styles/
  tests/
```

Ideia central:

- `app/` concentra bootstrap, providers e rotas.
- `features/` organiza as telas por domínio, reduzindo dependência cruzada.
- `components/` guarda componentes reutilizáveis e desacoplados.
- `services/` centraliza acesso a API e persistência local.
- `utils/` fica para funções puras e helpers.
- `tests/` concentra testes de integração leve e testes de componentes.

## 3. Ferramentas e Padrões

Ferramentas propostas:

- Linter: ESLint
- Framework de testes: Vitest
- Biblioteca de teste de UI: React Testing Library
- Ambiente DOM: jsdom

Padrões de código:

- Nomes consistentes em inglês ou português, mas sem misturar os dois no mesmo domínio.
- Componentes com responsabilidade única.
- Funções pequenas e com nomes descritivos.
- Separação clara entre UI, estado, efeitos e acesso a dados.
- Uso de hooks customizados para extrair lógica repetida.
- Padronização de imports, formatação, aspas e organização de arquivos via lint.

## 4. Estratégia de Testes

A meta é chegar perto de 50% de cobertura com testes simples, úteis e baratos de manter.

A estratégia será esta:

- Priorizar testes de componentes puros e de lógica desacoplada primeiro.
- Cobrir funções utilitárias com entrada e saída previsíveis.
- Cobrir contexts com foco em adicionar, remover, limpar e calcular totais.
- Cobrir páginas principais com mocks de API e de armazenamento local.
- Mockar chamadas de rede e persistência para não depender do back-end.
- Validar fluxos críticos do usuário:
  - carregar produtos
  - adicionar ao carrinho
  - remover item
  - favoritar e desfavoritar
  - navegar entre telas principais
- Evitar testar detalhes de implementação; testar comportamento visível.
- Criar um conjunto mínimo de testes por domínio para distribuir esforço entre os 4 integrantes.
- Medir cobertura no fim de cada etapa para garantir progresso real até a meta.

Distribuição sugerida da cobertura:

- Funções puras e utils: cobertura alta e rápida.
- Contexts: cobertura média-alta.
- Telas principais: cobertura suficiente para fluxos críticos.
- Componentes visuais simples: cobertura pontual para renderização e eventos.

## 5. Divisão de Tarefas do Grupo

### Parte 1 — Base da Arquitetura e Padronização
Responsável por organizar a estrutura de pastas, ajustar nomes mais claros e preparar a base do projeto para a refatoração sem alterar comportamento.

Entregas:

- Propor e executar a nova organização de pastas do front-end.
- Separar bootstrap, rotas e providers.
- Padronizar nomes de arquivos e imports mais críticos.
- Isolar responsabilidades que hoje estão concentradas em arquivos centrais.
- Criar a base para integração das outras partes sem conflito.

Estimativa: 5 horas

### Parte 2 — Refatoração de Componentes e Telas
Responsável por redesenhar os blocos mais confusos do front-end com foco em Clean Code e redução de acoplamento.

Entregas:

- Quebrar componentes grandes em componentes menores.
- Extrair lógica repetida para hooks ou services.
- Simplificar telas com muitas responsabilidades.
- Eliminar duplicações visíveis de UI e fluxo.
- Melhorar legibilidade de nomes, condições e manipulação de estado.

Estimativa: 5 horas

### Parte 3 — Testes Automatizados
Responsável por criar a base de testes e atingir a cobertura planejada sem mexer no back-end.

Entregas:

- Configurar Vitest e React Testing Library.
- Criar testes para contexts, utils e componentes de maior risco.
- Cobrir fluxos críticos de carrinho, favoritos e busca.
- Mockar API e armazenamento local.
- Medir cobertura e identificar lacunas até chegar perto dos 50%.

Estimativa: 5 horas

### Parte 4 — Lint, Qualidade e Consolidação Final
Responsável por padronizar estilo, reduzir code smells restantes e fazer a consolidação final da refatoração.

Entregas:

- Configurar ESLint com regras de React e hooks.
- Ajustar o código para passar no linter.
- Remover smells finais como blocos longos, duplicação e inconsistências.
- Rever acoplamento entre arquivos e pequenas dependências residuais.
- Validar que a aplicação continua funcionando após a reorganização.

Estimativa: 5 horas

## Resultado Esperado

Com essa divisão, o grupo terá um trabalho substancial, paralelo e com baixo risco de conflito no Git, cobrindo:

- reorganização estrutural
- melhoria arquitetural
- refatoração orientada a Clean Code
- testes automatizados
- lint e padronização
- redução de acoplamento

Se esse plano for aprovado, o próximo passo será começar pela Parte 1 e preparar a base de lint e testes antes da refatoração visual.