# KURIO — NFT Marketplace

Marketplace demonstrativo de NFTs desenvolvido como parte de um desafio técnico de Frontend.

O projeto simula a experiência de uma plataforma de negociação de NFTs, permitindo explorar um catálogo, pesquisar e filtrar itens, visualizar detalhes, gerenciar um carrinho e realizar compras demonstrativas.

**Importante:** não são realizadas transações financeiras ou operações reais em blockchain.

## Tecnologias

- **React 19** — construção da interface.
- **TypeScript** — tipagem estática.
- **Vite** — ambiente de desenvolvimento e build.
- **TanStack Router** — roteamento e sincronização de filtros com a URL.
- **TanStack Query** — gerenciamento de consultas e estados de carregamento.
- **Axios** — comunicação com a API simulada.
- **Tailwind CSS** — estilização e responsividade.
- **shadcn/ui** — componentes de interface.
- **Mock Service Worker (MSW)** — interceptação e simulação de requisições HTTP.
- **Playwright** — testes automatizados end-to-end.

## Funcionalidades

### Catálogo de NFTs

- Exibição de NFTs com imagem, nome, coleção e preço.
- Pesquisa por nome e coleção.
- Filtros por categoria e blockchain.
- Ordenação dos resultados.
- Paginação.
- Sincronização dos parâmetros de pesquisa com a URL.
- Página de detalhes de cada NFT.

### Carrinho

- Adição de NFTs ao carrinho.
- Prevenção de itens duplicados.
- Remoção individual de itens.
- Limpeza do carrinho.
- Cálculo do valor total.
- Persistência no navegador.

### Autenticação demonstrativa

- Telas de login e cadastro.
- Identificação de usuário por e-mail.
- Redirecionamento ao checkout após login.
- Perfil com histórico de pedidos.
- Gerenciamento demonstrativo de endereços de carteiras.

A autenticação é exclusivamente demonstrativa. Não existe validação de credenciais em servidor.

### Checkout

- Revisão dos itens antes da confirmação.
- Exigência de login demonstrativo para finalizar pedidos.
- Simulação de compra.
- Geração de identificador para o pedido.
- Página de confirmação.
- Histórico de pedidos associado ao usuário demonstrativo.
- Proteção básica contra duplicação por chave de idempotência.

Nenhum pagamento real é processado.

## Como executar localmente

- Link Vercel : https://jungle-nft-marketplace-sigma.vercel.app/

### Pré-requisitos

- Node.js e npm instalados.

### Instalação

Clone o repositório:

```bash
git clone https://github.com/mthszf99/jungle-nft-marketplace.git
```

Acesse a pasta:

```bash
cd jungle-nft-marketplace
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm run dev
```

Abra no navegador o endereço informado pelo Vite.

## Validação do projeto

Execute a análise estática:

```bash
npm run lint
```

Gere o build de produção:

```bash
npm run build
```

### Testes end-to-end

Os testes utilizam Playwright.

Para instalar o navegador necessário:

```bash
npx playwright install chromium
```

Execute a suíte completa:

```bash
npx playwright test
```

Para visualizar o relatório:

```bash
npx playwright show-report
```

Os testes abrangem cenários como:

- Carregamento do catálogo.
- Navegação e paginação.
- Visualização dos detalhes de NFTs.
- Adição e remoção de itens do carrinho.
- Bloqueio do checkout para visitantes.
- Login e finalização demonstrativa de pedidos.
- Persistência do histórico.
- Separação dos pedidos exibidos para diferentes usuários.

**Nota:** os testes de persistência após atualização da página não substituem uma validação completa de idempotência sob requisições concorrentes.

## Decisões técnicas

### API simulada com MSW

O MSW intercepta requisições HTTP e fornece dados simulados ao frontend.

Essa abordagem permite desenvolver e testar a interface sem depender de um backend externo.

O service worker também é utilizado na versão publicada do projeto.

### Gerenciamento de dados

O TanStack Query gerencia consultas à API simulada.

O React Context centraliza o estado demonstrativo do marketplace, incluindo carrinho, usuário, pedidos e carteiras.

### Persistência local

O `localStorage` mantém os dados demonstrativos entre atualizações da página.

Pedidos e carteiras são organizados por e-mail para separar os dados apresentados a cada usuário no mesmo navegador.

Essa separação é apenas funcional: não representa autorização segura nem isolamento garantido por servidor.

### Precisão dos valores em ETH

Os cálculos monetários utilizam `BigInt` e representação em wei, evitando erros de precisão associados à soma direta de números de ponto flutuante.

### Idempotência demonstrativa

O checkout recebe uma chave de idempotência e verifica se já existe um pedido correspondente antes de criar outro.

A implementação funciona no contexto do estado local do protótipo, mas não oferece as garantias transacionais de um backend.

## Build e publicação

Para gerar os arquivos de produção:

```bash
npm run build
```

Os arquivos são disponibilizados na pasta `dist`.

O projeto pode ser publicado na Vercel, com configuração de rewrite para permitir o acesso direto às rotas da aplicação.

O arquivo `public/mockServiceWorker.js` precisa estar acessível no domínio publicado para que a API simulada funcione.

## Limitações conhecidas

Este projeto é um protótipo frontend e possui limitações intencionais:

- Não existe backend de autenticação.
- Senhas não são verificadas por um servidor.
- Não há integração com carteiras blockchain reais.
- Não são realizadas transações ou pagamentos reais.
- Não existe banco de dados.
- Os dados persistidos dependem do navegador utilizado.
- O armazenamento local pode ser inspecionado ou modificado pelo usuário.
- A separação dos dados por e-mail não constitui uma barreira de segurança.
- A idempotência demonstrativa não substitui uma implementação transacional no servidor.

**Não utilize senhas reais nos formulários demonstrativos.**

## Autor

Desenvolvido por Matheus Ferreira Pires.

GitHub: `mthszf99`