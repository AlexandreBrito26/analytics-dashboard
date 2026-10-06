<div align="center">

# 📊 Analytics Dashboard

**Dashboard de analytics moderno, responsivo e animado**
Métricas, gráficos interativos e tema claro/escuro, tudo tipado com TypeScript.

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-Modules-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

[🌐 Demo](#-demo) · [✨ Funcionalidades](#-funcionalidades) · [🚀 Como rodar](#-como-rodar) · [🗺️ Roadmap](#️-roadmap)

</div>

---

## 📌 Sobre o projeto

> [!NOTE]
> Projeto de portfólio criado para demonstrar uma arquitetura front-end escalável: gerenciamento de estado, cache de requisições, rotas com code splitting e estilização isolada por componente.

O dashboard reúne os principais indicadores de um negócio (**receita, visitas, conversão e pedidos**) em uma interface limpa, com gráficos interativos e filtros de período. Os dados vêm de uma camada de serviço isolada, então trocar os mocks por uma API real exige mudar apenas um arquivo.

---

## 🌐 Demo

| | |
|---|---|
| 🔗 **Deploy** | `https://seu-projeto.vercel.app` |
| 🖼️ **Preview** | _adicione um print ou GIF em `docs/preview.png`_ |

---

## ✨ Funcionalidades

| | Recurso | Detalhes |
|---|---|---|
| 📈 | **Gráficos interativos** | Gráfico de área de receita com tooltip e filtro de 7, 14 ou 30 dias |
| 🧮 | **Cards de métricas** | Valores formatados em pt-BR com variação percentual (▲ / ▼) |
| 🧾 | **Tabela de pedidos** | Lista de pedidos com valor em BRL e status |
| 🌗 | **Tema claro/escuro** | Alternância manual e detecção da preferência do sistema |
| ⚡ | **Cache inteligente** | Requisições com TanStack Query: loading, cache e refetch automáticos |
| 🧭 | **Code splitting** | Páginas carregadas sob demanda com `React.lazy` |
| 🎞️ | **Animações** | Entrada suave dos componentes com Framer Motion |
| 📱 | **Responsivo** | Layout adaptado de celular a desktop |

---

## 🧰 Stack

| Camada | Tecnologia | Por quê |
|---|---|---|
| ⚛️ UI | **React 18** | Componentização e hooks |
| 🔷 Linguagem | **TypeScript** | Tipagem de ponta a ponta |
| 🎨 Estilo | **SCSS + CSS Modules** | Estilos isolados e variáveis de tema |
| ⚡ Build | **Vite** | Dev server e build rápidos |
| 🧭 Rotas | **React Router 6** | Navegação SPA |
| 🔄 Dados | **TanStack Query** | Cache e estado de servidor |
| 🗃️ Estado global | **Zustand** | Store leve (tema) |
| 📊 Gráficos | **Recharts** | Visualização de dados |
| 🎞️ Animação | **Framer Motion** | Microinterações |

---

## 🗂️ Estrutura de pastas

```text
src/
├── app/                  # configuração do router
├── components/           # UI reutilizável (Layout, StatCard)
├── features/
│   └── dashboard/        # componentes específicos do dashboard (RevenueChart)
├── pages/                # telas (Dashboard, Orders)
├── services/             # camada de dados (mocks → API real)
├── store/                # estado global com Zustand
├── styles/               # variáveis, mixins e estilos globais
└── main.tsx              # ponto de entrada
```

---

## 🚀 Como rodar

### Pré-requisitos

- **Node.js** 18 ou superior
- **npm** (ou pnpm / yarn)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/analytics-dashboard.git
cd analytics-dashboard

# 2. Instale as dependências
npm install

# 3. Rode em modo de desenvolvimento
npm run dev
```

Acesse **http://localhost:5173** 🎉

### 📜 Scripts disponíveis

| Comando | O que faz |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Checa os tipos e gera o build de produção |
| `npm run preview` | Serve o build localmente |
| `npm test` | Roda os testes com Vitest |

---

## ☁️ Deploy na Vercel

1. Suba o projeto para o **GitHub**
2. Na Vercel, clique em **Add New → Project** e importe o repositório
3. A Vercel detecta o **Vite** sozinha, então é só clicar em **Deploy**

> [!TIP]
> O arquivo `vercel.json` já redireciona todas as rotas para o `index.html`, evitando erro 404 ao atualizar a página em `/pedidos`.

---

## 🔌 Conectando uma API real

<details>
<summary><b>Clique para ver como trocar os mocks</b></summary>

<br>

Todas as chamadas ficam em `src/services/analytics.ts`. Substitua as funções mockadas por `fetch`:

```ts
export const getMetrics = async (): Promise<Metric[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/metrics`)
  if (!res.ok) throw new Error('Falha ao carregar métricas')
  return res.json()
}
```

Crie um arquivo `.env` na raiz:

```env
VITE_API_URL=https://sua-api.com
```

As páginas não precisam mudar, pois o TanStack Query já cuida de loading, erro e cache.

</details>

---

## 🗺️ Roadmap

- [x] Layout com sidebar e rotas
- [x] Cards de métricas e gráfico de receita
- [x] Tema claro/escuro
- [x] Tabela de pedidos
- [ ] Paginação, busca e ordenação na tabela
- [ ] Gráficos de pizza (categorias) e barras (visitas)
- [ ] Integração com API real (Spring Boot + PostgreSQL)
- [ ] Exportação de relatórios em CSV
- [ ] Testes com Vitest e Testing Library

---

## 🤝 Contribuindo

Contribuições são bem-vindas!

1. Faça um **fork** do projeto
2. Crie uma branch: `git checkout -b feature/minha-feature`
3. Faça o commit: `git commit -m "feat: minha feature"`
4. Envie: `git push origin feature/minha-feature`
5. Abra um **Pull Request**

---

## 👤 Autor

<div align="center">

**Feito com 💜 por [Seu Nome](https://github.com/seu-usuario)**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/seu-usuario)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/seu-usuario)

⭐ Se gostou do projeto, deixe uma estrela!

</div>
