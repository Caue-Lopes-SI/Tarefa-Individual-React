# Film{IN}hos

Aplicação web para catalogar filmes, escrever reviews e acompanhar o que você já assistiu — inspirada no Letterboxd. Desenvolvida como tarefa individual do curso de Sistemas de Informação, consumindo uma API própria.


## Funcionalidades

- **Autenticação** — cadastro e login, com sessão persistida via Zustand e rotas protegidas para páginas que exigem usuário logado
- **Home** — carrossel de destaques, carrosséis por categoria/gênero e reviews recentes da comunidade
- **Busca de filmes** — pesquisa por título com filtro por múltiplos gêneros
- **Página de filme** — detalhes (sinopse, elenco, duração, classificação indicativa), média de avaliações, favoritar, marcar como assistido e criar review com nota em estrelas
- **Minhas avaliações, Favoritos e Assistidos** — páginas pessoais do usuário logado
- **Perfil público** — favoritos, assistidos e reviews de qualquer usuário

## Tecnologias

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/) — roteamento e rotas protegidas
- [TanStack Query](https://tanstack.com/query/latest) — cache e sincronização de dados assíncronos
- [Zustand](https://github.com/pmndrs/zustand) (com `persist`) — estado de autenticação
- [Axios](https://axios-http.com/) — cliente HTTP com interceptor de token e logout automático em 401
- [Zod](https://zod.dev/) — validação de formulários
- [Embla Carousel](https://www.embla-carousel.com/) — carrosséis de filmes
- CSS Modules para estilização

## Estrutura do projeto

```
src/
├── Components/    # Header, Footer, carrosséis, modal, rating em estrelas, ProtectedRoute
├── Pages/         # Home, Login, Register, Search, Movie, Favorites, Watched, MyReviews, UserProfile
├── hooks/         # hooks de dados por página (React Query)
├── services/      # chamadas à API (auth, filmes, reviews, usuários)
├── store/         # authStore (Zustand)
├── api/           # instância do Axios com interceptors
├── Types/         # tipagens de Filme e Review
└── utils/         # helpers (ex: cor da classificação indicativa)
```

## Rodando localmente

```bash
# instalar dependências
npm install

# ambiente de desenvolvimento
npm run dev

# build de produção
npm run build

# lint
npm run lint
```

A aplicação consome a API pública em `https://tarefaapi.onrender.com/api/v1` — não é necessário nenhum backend local nem variáveis de ambiente para rodar.

## Autor

Desenvolvido por [Cauê Lopes](https://github.com/Caue-Lopes-SI).
