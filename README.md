# Projeto SEOFT

Este repositório contém o projeto **SEOFT**, uma plataforma auxiliar do Setor de Oftalmologia do HGF, desenvolvida com a T3 Stack moderna, utilizando Next.js 15, TypeScript, Tailwind CSS, tRPC e Prisma.

## 🎯 Sobre a Plataforma

A plataforma **SEOFT** não é um prontuário digital. Ela atua como um intermediador, organizando e armazenando algumas informações do atendimento dos pacientes para facilitar a dinâmica dos atendimentos no dia a dia. Com um design focado na eficiência e simplicidade, o SEOFT auxilia os colaboradores a acessarem e registrarem informações de maneira mais prática e ágil.

O acesso à plataforma é **restrito aos colaboradores do SEOFT**, garantindo a segurança das informações e o uso exclusivo por pessoas autorizadas.

## 🏗️ Estrutura do Projeto

```
src/
├── app/          # Rotas e páginas da aplicação (App Router)
├── components/   # Componentes reutilizáveis
├── hooks/        # Custom hooks React
├── lib/          # Utilitários e configurações
├── server/       # Lógica do servidor e API routes
├── styles/       # Estilos globais e configurações do Tailwind
└── trpc/         # Configuração e rotas do tRPC
```

## 🛠️ Tecnologias Principais

- **Next.js 15**: Framework React com App Router e Server Components
- **TypeScript**: Tipagem estática e melhor DX
- **Tailwind CSS**: Estilização utilitária com suporte a temas
- **tRPC**: API type-safe com TypeScript
- **Prisma**: ORM moderno para PostgreSQL
- **NextAuth.js**: Autenticação segura
- **Radix UI**: Componentes acessíveis e customizáveis
- **React Query**: Gerenciamento de estado e cache
- **Zod**: Validação de dados em runtime

## 🚀 Configuração e Instalação

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/leonunesbs/seoft.git
   cd seoft
   ```

2. **Instale as dependências**:

   ```bash
   pnpm install
   ```

3. **Configure as variáveis de ambiente**:

   ```bash
   cp .env.example .env
   ```

   Ajuste as variáveis no arquivo `.env` conforme necessário.

4. **Configure o banco de dados**:

   ```bash
   pnpm db:generate  # Gera as migrações
   pnpm db:push     # Aplica as migrações
   ```

5. **Execute o projeto**:
   ```bash
   pnpm dev
   ```
   A aplicação estará disponível em `http://localhost:3000`.

## 📝 Scripts Disponíveis

- `pnpm dev`: Inicia o servidor de desenvolvimento com Turbo
- `pnpm build`: Compila a aplicação para produção
- `pnpm start`: Inicia o servidor em modo de produção
- `pnpm lint`: Executa o linter
- `pnpm format`: Formata o código com Prettier
- `pnpm typecheck`: Verifica tipos TypeScript
- `pnpm test`: Executa os testes
- `pnpm db:studio`: Abre o Prisma Studio para gerenciar o banco

## 🔧 Ferramentas de Desenvolvimento

- **ESLint**: Linting e formatação de código
- **Prettier**: Formatação consistente
- **Husky**: Git hooks para qualidade de código
- **Commitlint**: Padronização de commits
- **Vitest**: Framework de testes
- **Renovate**: Atualização automática de dependências

## 🤝 Contribuição

Contribuições são bem-vindas! Siga os passos abaixo:

1. **Fork o repositório**
2. **Crie uma branch**: `git checkout -b feature/nova-funcionalidade`
3. **Faça commit das alterações**: `git commit -m 'feat: adiciona nova funcionalidade'`
4. **Envie para o repositório**: `git push origin feature/nova-funcionalidade`
5. **Abra um Pull Request**

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

## 🔒 Segurança

Para reportar vulnerabilidades, consulte nosso [guia de segurança](SECURITY.md).
