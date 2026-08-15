# Task dos modulos de vendas

## Principais Objetivos

_Seguindo o modelo:_

> - Funcionalidade Obrigatória
>   - Funcionalidade opcional ou futura

- O usuário pode adicionar um **Registros de vendas**
- Os **Registros de vendas** tem que corresponder a interface contida na entidade [Vendas](../../server/src/domain/entities/Venda.ts)
- Os Clientes que estão no parâmetro de Vendas tem que corresponder a interface [Cliente](../../server/src/domain/entities/Clientes.ts) e estar registrados no Banco de Dados dentro da **tabela Clientes**
  - Posteriormente poderemos criar um modulo de Registro | Remoção de clientes
- Todos os registros tem que ser armazenados no banco de dados dentro da tabela de Vendas
