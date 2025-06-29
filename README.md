# Frontend - Teste Técnico

Este repositório contém o frontend do teste técnico. Abaixo estão as instruções para configurar e executar o projeto localmente utilizando Docker.

## Tecnologias

- TypeScript
- React
- Docker + Docker Compose

## Pré-requisitos

Antes de começar, você precisa ter instalado na sua máquina:

- Git: https://git-scm.com/
- Docker: https://www.docker.com/

## Instalação e execução

### 1. Clonar o repositório

```sh
git clone https://github.com/jordan-cod/seletivo-mamba-frontend
cd seletivo-mamba-frontend
```

### 2. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```sh
cp .env.example .env
```

Preencha os valores necessários de acordo com sua configuração local.

⚠️ Importante: Verifique se as portas configuradas no `.env` não estão sendo usadas por outros serviços.

Execute o comando abaixo para subir a aplicação:

```sh
docker compose up -d --build
```

A aplicação estará disponível em:

```sh
http://localhost:PORTA
```

## 📁 Estrutura do Projeto

```sh
├── Dockerfile             # Define o ambiente da aplicação no container
├── README.md              # Documentação do projeto
├── docker-compose.yaml    # Orquestra os containers do frontend
├── eslint.config.mjs      # Configuração do ESLint
├── next-env.d.ts          # Arquivo gerado pelo Next.js para suportar TypeScript
├── next.config.ts         # Configuração personalizada do Next.js
├── package-lock.json      # Travamento de dependências
├── package.json           # Dependências e scripts do projeto
├── postcss.config.mjs     # Configuração do PostCSS (ex: Tailwind CSS)
├── src                    # Código-fonte da aplicação
│   ├── actions            # Funções assíncronas (Server Actions)
│   ├── app                # Estrutura de rotas (App Router)
│   ├── components         # Componentes da aplicação
│   │   └── shared         # Componentes genéricos reutilizáveis (botões, modais, etc)
│   ├── config             # Configurações e constantes globais
│   ├── schemas            # Schemas de validação com Zod
│   ├── services           # Serviços para requisições HTTP e integração com backend
│   ├── types              # Tipagens e interfaces TypeScript utilizadas no projeto
│   └── utils              # Funções utilitárias
└── tsconfig.json          # Configuração do TypeScript
```

