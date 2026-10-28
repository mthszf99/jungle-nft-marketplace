# KURIO — NFT Marketplace (Frontend Challenge)

Marketplace demonstrativo construído com React 19, TypeScript, TanStack Router, TanStack Query, Axios, Tailwind CSS e Mock Service Worker (MSW).

## Rodar localmente

```bash
npm install
npm run dev
```

## Validar

```bash
npm run lint
npm run build
```

## Funcionalidades

- Catálogo de NFTs com busca, filtros, ordenação e paginação sincronizados com a URL.
- Detalhes dos NFTs e carrinho persistente no navegador.
- Checkout demonstrativo, confirmação de pedido e histórico.
- Login/cadastro **simulados**, perfil e cadastro de endereços de carteiras.
- Preços ETH somados usando BigInt (wei), evitando imprecisão de ponto flutuante.
- API REST simulada com MSW, inclusive no build de produção.

**Limitações:** este é um protótipo frontend; não há autenticação segura, blockchain real, pagamento real ou banco de dados. Pedidos e sessões são persistidos no localStorage do navegador, não compartilhados entre dispositivos. Não use senhas reais.

## Publicação

Build: `npm run build`. Diretório de saída: `dist`. Configure rewrite SPA para `index.html` em rotas profundas. O arquivo `public/mockServiceWorker.js` deve estar disponível no domínio publicado.
