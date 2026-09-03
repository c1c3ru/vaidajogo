# Vai da Jogo ⚽

Sistema completo para gerenciamento de jogadores, times e campeonatos esportivos. Desenvolvido para facilitar a organização de peladas, torneios e competições amadoras.

## 🚀 Funcionalidades

### 📋 Gerenciamento de Jogadores
- **Cadastro completo**: Nome, apelido, data de nascimento, posições e avaliações
- **Sistema de avaliação flexível**: Suporte a diferentes escalas de rating (1-5, 1-10, etc.)
- **Controle de presença**: Marcar jogadores presentes/ausentes
- **Controle de pagamento**: Gerenciar mensalidades e taxas
- **Filtros avançados**: Busca por nome, posição, rating, presença e pagamento

### ⚽ Organização de Times
- **Sorteio automático**: Algoritmo inteligente para balanceamento de times
- **Configuração flexível**: Definir número de jogadores por time
- **Múltiplos esportes**: Futebol, Futsal, Basquete, Vôlei
- **Posições específicas**: Sistema adaptável para cada modalidade

### 🏆 Sistema de Campeonatos
- **Múltiplos formatos**: Liga, eliminatórias, grupos + mata-mata
- **Gerenciamento de partidas**: Controle de resultados e classificação
- **Chaveamento automático**: Geração de tabelas e confrontos
- **Acompanhamento em tempo real**: Estatísticas e rankings

### 📊 Estatísticas e Relatórios
- **Histórico de presenças**: Controle de frequência dos jogadores
- **Relatórios financeiros**: Controle de pagamentos e inadimplência
- **Estatísticas de desempenho**: Análise de dados dos jogadores
- **Exportação de dados**: Relatórios em PDF

## 🛠️ Tecnologias

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion + Lottie
- **Icons**: Lucide React + FontAwesome
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **PDF Generation**: jsPDF
- **Routing**: React Router DOM
- **Testing**: Jest + Testing Library
- **Internationalization**: i18next + react-i18next

## 🌐 Internacionalização (i18n)

O projeto suporta múltiplos idiomas:
- 🇧🇷 Português (Brasil) - Padrão
- 🇺🇸 Inglês (EUA)
- 🇪🇸 Espanhol

A detecção de idioma é automática baseada no navegador, mas pode ser alterada manualmente pelo usuário.

## ♿ Acessibilidade

Compromisso com a inclusão:
- Navegação por teclado
- Suporte a leitores de tela (ARIA)
- Contraste de cores adequado
- HTML semântico

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/                    # Componentes base (shadcn/ui)
│   ├── dashboard/             # Componentes do dashboard
│   ├── player/                # Componentes de jogadores
│   ├── tournament/            # Componentes de torneios
│   ├── pages/                 # Páginas principais
│   ├── PlayerForm.tsx         # Formulário de cadastro
│   ├── PlayerList.tsx         # Lista de jogadores
│   ├── TeamDraw.tsx           # Sorteio de times
│   ├── PresenceList.tsx       # Controle de presença
│   ├── Statistics.tsx         # Estatísticas
│   └── TournamentBracket.tsx  # Chaveamento
├── stores/                    # Gerenciamento de estado (Zustand)
│   ├── usePlayerStore.ts      # Estado dos jogadores
│   ├── useTeamStore.ts        # Estado dos times
│   ├── useTournamentStore.ts  # Estado dos torneios
│   └── useStatisticsStore.ts  # Estado das estatísticas
├── types/                     # Definições TypeScript
├── utils/                     # Utilitários e helpers
├── constants/                 # Constantes e configurações
├── assets/                    # Animações Lottie
└── styles/                    # Estilos globais
```

## 🎯 Páginas Principais

- **Dashboard** (`/dashboard`) - Painel principal com acesso a todas as funcionalidades
- **Cadastro de Jogadores** (`/player-form`) - Formulário para adicionar novos jogadores
- **Lista de Jogadores** (`/players`) - Visualização e gerenciamento de jogadores
- **Controle de Presença** (`/presence`) - Marcar presenças e pagamentos
- **Sorteio de Times** (`/team-draw`) - Organizar jogadores em times balanceados
- **Estatísticas** (`/statistics`) - Relatórios e análises
- **Campeonatos** (`/championship`) - Gerenciar torneios e competições

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <URL_DO_REPOSITORIO>

# Navegue até o diretório
cd vaidajogo

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
npm run lint     # Verificar código
```

## 🎨 Design System

- **Cores principais**: Gradientes em azul e ciano
- **Componentes**: Sistema consistente baseado em shadcn/ui
- **Responsividade**: Design mobile-first
- **Animações**: Transições suaves com Framer Motion
- **Ícones**: Lucide React para interface moderna

## 💾 Persistência de Dados

- **Local Storage**: Dados persistidos localmente no navegador
- **Zustand Persist**: Sincronização automática do estado
- **Backup/Restore**: Funcionalidades de exportação e importação

## 🔧 Configuração

O projeto inclui configurações para:
- ESLint para qualidade de código
- TypeScript para tipagem estática
- Tailwind CSS para estilização
- Vite para build otimizado

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

