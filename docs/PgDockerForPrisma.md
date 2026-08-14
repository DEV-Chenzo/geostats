# Conectando PostgreSQL no Docker com Prisma

Este guia configura o servidor para acessar o PostgreSQL executado pelo Docker usando o Prisma.

## Visão geral das portas

O PostgreSQL dentro do container escuta na porta padrão `5432`. O Docker publica essa porta como `5005` na máquina local:

```text
Servidor Node/Prisma (sua máquina)
        │
        └── postgresql://...@localhost:5005/geostatsdb
                                      │
Docker: 5005 ───────────────────────► 5432
                                      │
                              Container postgres_dev
```

O mapeamento no `docker-compose.yml` é:

```yaml
ports:
  - "5005:5432"
```

O formato é `PORTA_LOCAL:PORTA_DO_CONTAINER`. Portanto, o servidor que roda na sua máquina conecta em `localhost:5005`; o container recebe a conexão em `5432`.

## 1. Iniciar o banco

Na raiz do projeto, execute:

```powershell
docker compose up -d
docker compose ps
```

O serviço `postgres` deve aparecer como `running`, com o mapeamento `0.0.0.0:5005->5432/tcp`.

## 2. Configurar a URL de conexão local

No arquivo `server/.env`, defina uma URL PostgreSQL direta:

```env
DATABASE_URL="postgresql://postgres:geostatspg@localhost:5005/geostatsdb?schema=public"
```

As partes dessa URL correspondem à configuração do Docker Compose:

| Parte | Valor | Origem |
| --- | --- | --- |
| Usuário | `postgres` | `POSTGRES_USER` |
| Senha | `geostatspg` | `POSTGRES_PASSWORD` |
| Host | `localhost` | O servidor Node roda na sua máquina |
| Porta | `5005` | Porta local publicada pelo Docker |
| Banco | `geostatsdb` | `POSTGRES_DB` |

Não use uma URL iniciada por `prisma+postgres://` para esta conexão local direta. Esse protocolo é destinado ao Prisma Postgres/Accelerate. Para o PostgreSQL no container, use `postgresql://`.

### Quando a API também estiver no Docker

Se a API for executada em outro container do mesmo `docker-compose.yml`, ela deve acessar o serviço pelo nome e pela porta interna:

```env
DATABASE_URL="postgresql://postgres:geostatspg@postgres:5432/geostatsdb?schema=public"
```

Regra prática:

- Código executado fora do Docker: `localhost:5005`.
- Código executado dentro da rede Docker: `postgres:5432`.

## 3. Configurar o Prisma CLI

Em Prisma 7, a URL do banco é configurada em `prisma.config.ts`, e não no bloco `datasource` de `schema.prisma`.

Use esta configuração em `server/prisma.config.ts`:

```ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

`dotenv/config` carrega as variáveis de `server/.env`. A função `env("DATABASE_URL")` faz o comando falhar claramente se a variável estiver ausente.

## 4. Criar as tabelas com migrations

Com o banco em execução, entre na pasta do servidor:

```powershell
cd server
```

Para criar e aplicar a migration a partir de `prisma/schema.prisma`:

```powershell
npx prisma migrate dev --name init
```

Esse comando cria os arquivos em `prisma/migrations`, aplica as alterações no banco `geostatsdb` e registra a migration na tabela `_prisma_migrations`.

Após qualquer mudança no schema, gere novamente o cliente:

```powershell
npx prisma generate
```

Para consultar o estado das migrations:

```powershell
npx prisma migrate status
```

Use `prisma migrate dev` apenas no desenvolvimento. Ele pode pedir confirmação para resetar o banco quando detectar divergências; não confirme o reset se houver dados que devem ser preservados.

## 5. Usar o Prisma no código TypeScript

Este projeto usa Prisma 7. Para uma conexão direta ao PostgreSQL, o `PrismaClient` precisa de um driver adapter.

Instale as dependências na pasta `server`:

```powershell
npm install @prisma/adapter-pg pg
npm install --save-dev @types/pg
```

Crie o arquivo `server/src/infrastructure/database/prisma.ts`:

```ts
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL não foi definida.");
}

const adapter = new PrismaPg({ connectionString });

export const prisma = new PrismaClient({ adapter });
```

Use a mesma instância do cliente nos repositórios e serviços. Por exemplo:

```ts
import { prisma } from "../infrastructure/database/prisma.js";

const users = await prisma.user.findMany();

const user = await prisma.user.create({
  data: {
    email: "ana@exemplo.com",
    name: "Ana",
  },
});
```

Não instancie `new PrismaClient()` sem adapter no Prisma 7 para este caso. Uma instância compartilhada também evita a criação desnecessária de vários pools de conexão.

## 6. Inspecionar os dados

Depois de aplicar a migration, inicie o Prisma Studio:

```powershell
npx prisma studio
```

Abra o endereço informado pelo terminal — normalmente `http://localhost:5555` — para visualizar e editar os registros.

## Referências

- [Prisma Config](https://docs.prisma.io/docs/orm/reference/prisma-config-reference)
- [Prisma Migrate: migrate dev](https://docs.prisma.io/docs/cli/migrate/dev)
- [Configuração do Prisma Client](https://docs.prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction)
