# Funcionamento da Api do IBGE

A API do IBGE é RESTful, gratuita e não exige chave de autenticação (_API Key_). Para realizar consultas, basta entender como a **URL** é montada, pois cada parte do endereço (_path_ e _query parameters_) serve para filtrar ou formatar a resposta.

---

## 1. A Estrutura Base de uma URL do IBGE

Toda requisição ao IBGE é dividida em 4 partes principais:

$$\text{URL Base} + \text{Versão do Serviço} + \text{Recurso/Endpoint} + \text{Parâmetros (Query Params)}$$

### Exemplo Visual

```text
https://servicodados.ibge.gov.br/api/v1/localidades/estados/BA/municipios?orderBy=nome
\_________________________________/\_/\_________/ \_________________/\___________/
            Base                 Ver.  Serviço          Recurso        Query Param

```

---

## 2. Como funcionam os dois tipos principais de busca

### A. Busca por Rota/Hierarquia (API de Localidades)

Nesta API, os filtros acontecem diretamente no caminho da URL (_path variables_). Você navega na hierarquia do país alterando os valores entre barras.

- **Estados de uma região específica:**
  `.../api/v1/localidades/regioes/2/estados` _(Onde `2` é o ID da Região Nordeste)_
- **Municípios de um estado específico:**
  `.../api/v1/localidades/estados/BA/municipios` _(Usa a sigla `BA` ou o ID `29`)_
- **Distritos de um município:**
  `.../api/v1/localidades/municipios/2927408/distritos` _(Usa o ID do IBGE da cidade)_

---

### B. Busca por Parâmetros Avançados (API do SIDRA / Agregados)

Para dados estatísticos (Censo, PIB, Inflação), a URL usa uma estrutura baseada em código de **Tabela**, **Variável** e **Filtros de Localidade**.

Sintaxe do endpoint do SIDRA:

```text
/api/v3/agregados/{tabela}/periodos/{periodo}/variaveis/{variavel}?localidades={nivel}[{ids}]

```

Desmistificando os elementos:

| Parâmetro        | Significado                                                          | Exemplo na URL                        |
| ---------------- | -------------------------------------------------------------------- | ------------------------------------- |
| **`{tabela}`**   | Código da pesquisa/tabela do IBGE                                    | `9514` (Tabela do Censo 2022)         |
| **`{periodo}`**  | Ano ou período desejado (`all` para todos)                           | `2022` ou `all`                       |
| **`{variavel}`** | O dado específico que quer extrair                                   | `93` (População residente)            |
| **`{nivel}`**    | Nível geográfico (`N1`=Brasil, `N2`=Região, `N3`=UF, `N6`=Município) | `N6`                                  |
| **`[{ids}]`**    | IDs específicos ou `all` para todos                                  | `N6[2927408]` (Salvador) ou `N6[all]` |

#### Exemplo Prático Completo

Buscar a população do Censo 2022 apenas para o município com ID `2927408`:

```text
https://servicodados.ibge.gov.br/api/v3/agregados/9514/periodos/2022/variaveis/93?localidades=N6[2927408]

```

---

## 3. Query Parameters Úteis (Parâmetros de Consulta)

Você pode adicionar parâmetros no final da URL (após o `?`) para controlar a resposta:

- **Ordenação:** `?orderBy=nome` (ordena listas em ordem alfabética).
- **Campos Específicos:** `?view=nivelado` (no SIDRA, simplifica a estrutura do JSON retornado).

---

## 4. Onde encontrar os IDs das Tabelas e Variáveis?

Como os números das tabelas (`9514`, `5938`) e variáveis (`93`, `37`) não são óbvios, você pode usufruir da própria API para descobri-los:

- **Listar todas as pesquisas disponíveis:**
  `GET [https://servicodados.ibge.gov.br/api/v3/agregados](https://servicodados.ibge.gov.br/api/v3/agregados)`
- **Ver metadados de uma tabela específica (saber quais variáveis existem nela):**
  `GET [https://servicodados.ibge.gov.br/api/v3/agregados/9514/metadados](https://servicodados.ibge.gov.br/api/v3/agregados/9514/metadados)`

## 5. Considerações estratégicas

Observações que motivaram decisões técnicas e estratégicas por parte do uso/consumo da Api do IBGE.

### I - Porque ter duas funções de busca de população ao invés de uma só (DRY principle e desempenho) ?

A biblioteca possui duas funções responsáveis pela obtenção da população dos municípios, cada uma projetada para um cenário específico. Essa separação segue o princípio **DRY (Don't Repeat Yourself)** e também busca otimizar o desempenho da aplicação.

`buscarPopulacaoMunicipio(idMunicipio)`

Este método é utilizado quando o objetivo é consultar a população de **um único município**. Ele realiza uma requisição específica à API do IBGE e retorna apenas a população do município informado.

**Quando utilizar:**

- Consultar a população de um município específico.
- Operações pontuais que não exigem informações de outros municípios.

---

`criarIndicePopulacao(uf)`

Este método é utilizado internamente durante a execução de `buscarMunicipiosPorEstado()`.

Em vez de realizar uma requisição para cada município do estado, ele faz **uma única consulta** à API do IBGE para obter a população de todos os municípios da Unidade Federativa (UF). Em seguida, os dados são organizados em um `Map<number, number>`, onde:

- **Chave (`key`)** → ID do município.
- **Valor (`value`)** → População do município.

Exemplo:

```text
2900108 → 7301
2900207 → 17294
2900306 → 14567
```

Durante o mapeamento dos municípios, basta consultar o `Map` utilizando o ID do município para obter sua população de forma rápida:

```ts
const populacao = indicePopulacao.get(municipio.id) ?? 0;
```

---

#### Benefícios dessa abordagem

- **Evita duplicação de código**, mantendo cada método responsável por um único cenário.
- **Melhora a organização da classe**, deixando cada função com uma responsabilidade específica.
- **Reduz drasticamente o número de requisições à API.**

Por exemplo, o estado da Bahia possui **417 municípios**. Se `buscarMunicipiosPorEstado()` utilizasse apenas `buscarPopulacaoMunicipio()`, seriam realizadas **417 requisições** à API do IBGE.

Com `criarIndicePopulacao()`, é realizada **apenas uma única requisição**, que retorna a população de todos os municípios da UF. Depois disso, as populações são consultadas diretamente em memória através de um `Map`, tornando o processo significativamente mais rápido e eficiente.
