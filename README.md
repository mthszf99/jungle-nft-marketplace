# KURIO — NFT Marketplace

Marketplace demonstrativo de NFTs desenvolvido como desafio técnico de Front-end para a Jungle Gaming.

O projeto apresenta uma experiência de navegação, descoberta e compra simulada de NFTs, com foco em responsividade, organização de código, gerenciamento de estado, testes automatizados e experiência do usuário.

> **Aviso:** este é um projeto demonstrativo. Não são realizadas transações reais, pagamentos ou operações em blockchain.

## Funcionalidades

- Catálogo de NFTs com interface responsiva.
- Pesquisa por nome e coleção.
- Filtros por categoria e blockchain.
- Ordenação e paginação dos resultados.
- Página de detalhes de cada NFT.
- Login e cadastro demonstrativos.
- Carrinho de compras.
- Checkout simulado.
- Histórico de pedidos separado por usuário.
- Simulação de conexão de carteiras.
- Controle de idempotência dos pedidos.
- Estados de carregamento, erro e ausência de resultados.
- Simulação de cenários de API com MSW.
- Atualização de disponibilidade em tempo real com Socket.IO no ambiente local.
- Testes automatizados com Playwright.

## Tecnologias

### Front-end

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- TanStack Router
- TanStack Query
- Axios

### Simulação e comunicação

- Mock Service Worker (MSW)
- Socket.IO
- localStorage

### Qualidade

- ESLint
- Playwright

## Como executar

## Demonstração Online

- Acessar pelo link: https://jungle-nft-marketplace-sigma.vercel.app/

### Pré-requisitos

- Node.js compatível com a versão do Vite utilizada.
- npm.

### Instalação

Clone o repositório:

```bash
git clone https://github.com/mthszf99/jungle-nft-marketplace.git
```

Entre na pasta:

```bash
cd jungle-nft-marketplace
```

Instale as dependências:

```bash
npm install
```

### Executar o front-end

```bash
npm run dev
```

### Executar com Socket.IO

Para iniciar o front-end e o servidor de eventos:

```bash
npm run dev:full
```

O servidor Socket.IO utiliza a porta `3001`.

### Gerar build

```bash
npm run build
```

### Executar lint

```bash
npm run lint
```

### Executar testes automatizados

```bash
npx playwright test
```

## Arquitetura

O projeto utiliza uma organização baseada em responsabilidades:

- `src/components`: componentes reutilizáveis da interface.
- `src/pages`: páginas da aplicação.
- `src/hooks`: hooks personalizados.
- `src/services`: comunicação com a API e serviços de compra.
- `src/state`: gerenciamento de carrinho, usuários, pedidos e disponibilidade.
- `src/mocks`: handlers e dados simulados com MSW.
- `src/types`: definições TypeScript.
- `src/lib`: utilitários e configuração de integrações.
- `server`: servidor demonstrativo Socket.IO.
- `tests`: testes automatizados com Playwright.

## API simulada

O projeto utiliza Mock Service Worker (MSW) para simular os endpoints de NFTs.

Essa abordagem permite desenvolver e testar funcionalidades de consumo de API sem depender de um backend externo.

A aplicação também contempla cenários de carregamento e falhas simuladas.

## Gerenciamento de dados

O TanStack Query é utilizado para gerenciamento de consultas e cache dos NFTs.

A pesquisa, os filtros, a ordenação e a paginação são sincronizados com os parâmetros da URL.

Os dados demonstrativos de usuários, carrinhos e pedidos são armazenados localmente no navegador.

## Compras demonstrativas

O checkout permite simular a aquisição de NFTs.

No ambiente local, quando o servidor Socket.IO está disponível, a solicitação de compra é validada pelo servidor demonstrativo antes da criação do pedido local.

O servidor mantém em memória a disponibilidade dos NFTs e utiliza uma chave de idempotência para reconhecer solicitações repetidas.

No deploy estático, sem backend Socket.IO configurado, a compra é simulada diretamente no navegador.

**Limitações:**

- Não existe integração com blockchain ou pagamentos reais.
- A autenticação é demonstrativa.
- Os dados armazenados no localStorage não são compartilhados entre dispositivos.
- O servidor Socket.IO mantém o estado em memória.
- O deploy estático não possui controle global de disponibilidade.
- A validação demonstrativa do Socket.IO não substitui autenticação, persistência e processamento transacional de um backend real.

## Testes

O projeto utiliza Playwright para testar os principais fluxos da aplicação.

Entre os cenários cobertos estão:

- Navegação e catálogo.
- Pesquisa e filtros.
- Carrinho e checkout.
- Persistência de sessão.
- Separação de pedidos por usuário.
- Idempotência.
- Comportamento diante de respostas assíncronas.

Os testes tradicionais são executados em um ambiente isolado, sem depender do servidor Socket.IO.

A integração de compras em tempo real pode ser demonstrada manualmente no ambiente local.

## Objetivo

Este projeto foi desenvolvido para demonstrar habilidades em:

- Desenvolvimento de interfaces com React e TypeScript.
- Componentização e responsividade.
- Integração e simulação de APIs.
- Gerenciamento de estado.
- Navegação e sincronização com URL.
- Tratamento de erros e estados assíncronos.
- Testes automatizados.
- Organização e manutenção de código.

## Autor

Matheus Ferreira Pires

GitHub: [mthszf99](https://github.com/mthszf99)