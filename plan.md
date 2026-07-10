# GeoStats Planejamento

## Conceito

Uma aplicação de ERP que consome dados do IBGE de forma eficaz e os usa para metricas ideográficas relacionadas a empresa

## Objetivo

Entender e desenvolver um sistema de ERP completo, aprender a consumir uma API externa em um projeto e desenvolver habilidades aprendidas como POO, Testes e Arquitetura

Focando atualmente em desenvolver o MVP Inicial do Projeto e focando apenas em dois modulos iniciais

### O que desenvolver (Tasks do MVP)

- **Modulo de Clientes**
  - Cadastro simples de clientes, salvando Nome, Cidade, Estado e o Código do Município do IBGE.
- **Módulo de Vendas (Simples)**
  - Registro de vendas vinculadas a esses clientes (Valor, Dados, Cliente).
- **Módulo IBGE**
  - Uma tela que consome a API do IBGE para buscar os dados de população/PIB do município do cliente e cruza com as vendas que você fez lá

#### UI/UX - Arquitetura de Telas

- **Dashboard Inicial:** Gráficos de vendas da empresa.

- **Tela de Clientes:** Listagem e formulário de cadastro.

- **Tela de Nova Venda:** Formulário simples para registrar o pedido.

- **Tela de Análise de Mercado (Integração IBGE):** Um mapa ou gráfico de barras comparando: População da Cidade (IBGE) vs Volume de Vendas da sua Empresa.

## Arquitetura

Sumario:

- Tecnologias e ferramentas
- Arquitetura e Design de Pastas

### Tecnologias

Nesse tópico será abordado a definição de todas as tecnologias, ferramentas e paradigmas escolhidos e o por que a escolha de cada um.

#### Linguagens e Ferramentas

- **Front-end:**
  - React + Vite
  - Typescript
  - Recharts (gráficos)

_A escolha do **React + Vite + Typescript** me garante uma base solida contra erros graças a tipagem estática e a flexibilidade da componentização do React._

_Juntos ao **Recharts**, obtenho uma facilidade de implementação de de gráficos e estruturas das páginas de forma simples, eficaz e sem perder a segurança._

- **Back-end:**
  - PostgreSQL + Prisma (ORM) -> Database

_A escolha do **PostgreSQL** se da por ser projetado para lidar com consultas extremamente complexas, grandes volumes de dados e operações analíticas._

_Já o **Prisma**, é a **ORM padrão de mercado** para conectar bancos de dados na web, especialmente com relação à produtividade e à segurança_

_Levando em consideração que um **ERP**, mesmo que simples, pode requerer varias consultas, a união dessas duas ferramentas traz, para mim, a solução perfeita para o problema._

### Arquitetura e Design de Pastas

#### Princípios SOLID _(POO)_

Utilizar os princípios _SOLIDs_ para implementação correta de classes em ambas partes (Front-end e Back-end), com objetivo de dominar tais princípios e obter uma facilidade de manutenção maior.

Assim consigo garantir escalabilidade e maior organização dos meus códigos.

#### Testes Automatizados

Fazer os teste automatizados com as seguintes ferramentas

- **Vitest**
- **Supertest (biblioteca) + Postman**
- **SQLite + ORM**

_Ao fazer os teste automatizados com **Vitest + Supertest**, utilizar o **Postman** para ver as requisições mais uma vez, e o **SQLite + ORM** para testar a implantação e funcionamento da Database, consigo tornar minha aplicação mais segura e funcional._

_A ideia é também aprender a criar teste automatizados que cumpram pelo menos dois dos três níveis de testes automatizados._

> **1 - Base (Testes Unitários):** Devem ser a maioria. São rápidos de escrever e rodam em milissegundos. Testem funções puras, cálculos e regras de negócios isolados.

> **2 - Meio (Testes de Integração):** Teste o banco de dados e as rotas da API combinadas. Demoram um pouco mais para rodar, mas dão muita confiança.

> **3 - Topo (Testes End-to-End / E2E):** Simula o usuário clicando na tela (usando ferramentas como Cypress ou Playwright). São os mais lentos e caros de manter, por isso ficam no topo em menor quantidade.

#### Conexão E2E e Design de Pastas