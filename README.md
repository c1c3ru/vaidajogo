## Estrutura do Projeto
## Telas Principais


Lista de Jogadores (/players)
Cadastro de Jogadores (/player/new)
Sorteio de Times (/teams/draw)
Lista de Presença (/attendance)
Estatísticas (/statistics)
Componentes Reutilizáveis

## Botões, entradas de texto, modais, ícones e toasts.
Animações suaves utilizando Framer Motion.
Componentes de design, como Card, Header, e Footer.
Gerenciamento de Estado

## React Context para autenticação e dados globais (usuários, jogadores, etc.).
Zustand ou Redux para controle de estados mais complexos, como times balanceados.
Estilo

## Tailwind CSS para uma estilização consistente e rápida.
Configuração de cores suaves baseadas nos tons de verde: #10B981 e tons complementares.
API Simulada

## Simulação de uma API REST usando o json-server ou Mock Service Worker (MSW) para desenvolvimento local.

```
src/
├── components/
│   ├── Header.tsx
│   ├── PlayerForm.tsx
│   ├── PlayerList.tsx
│   ├── TeamDraw.tsx
│   ├── PresenceList.tsx
│   └── Statistics.tsx
├── pages/
│   ├── Login.tsx
│   ├── Dashboard.tsx
├── App.tsx
├── main.tsx
└── styles/
    └── global.css
```    

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

