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

A detecção de idioma é automática baseada no navegador, e o seletor de idioma fica
disponível no canto superior direito de todas as telas.

### Como os textos funcionam

- `src/constants/texts.ts` é a fonte de verdade da interface, em português.
- `src/i18n/locales/texts/en-US.json` e `es.json` traduzem essa mesma árvore; o que
  não estiver traduzido cai automaticamente no português.
- Nos componentes, use o hook `useTexts()` em vez de importar `TEXTS` diretamente —
  a estrutura é idêntica (`TEXTS.PRESENCE.TITLE`) e o texto acompanha o idioma ativo.

Para adicionar um texto novo: crie a chave em `texts.ts`, traduza nos dois arquivos
de locale e consuma pelo hook. O teste em `src/hooks/__tests__/useTexts.test.tsx`
falha se um arquivo de tradução declarar uma chave que não existe na árvore padrão.

> As posições dos jogadores (`src/constants/texts.ts` → `SPORTS.*.POSITIONS`) não são
> traduzidas de propósito: elas são gravadas no cadastro do jogador e comparadas com
> `PositionEnum`, então traduzi-las invalidaria os dados já salvos.

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
- **Cadastro** (`/player-form`) - Formulário para adicionar novos jogadores
- **Jogadores** (`/players`) - Visualização e gerenciamento de jogadores
- **Check-In** (`/presence`) - Confirmar presença e pagamento do dia
- **Sorteio** (`/team-draw`) - Organizar jogadores em times balanceados
- **Estatísticas** (`/statistics`) - Relatórios e análises
- **Campeonatos** (`/championship`) - Gerenciar torneios e competições

> Só entram no sorteio os jogadores com **presença e pagamento confirmados** no Check-In —
> a mesma regra do app mobile.

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

A web usa o mesmo visual do app mobile (Flutter, em `mobile/`): tema escuro fixo, definido no
bloco `.dark` de `src/index.css` com as cores de `mobile/lib/core/theme/app_theme.dart`.

- **Cores**: fundo `#050511`, texto `#E0E7FF`, primária `#00F0FF`, secundária `#7000FF`, destaque `#FF003C`
- **Tipografia**: *Chakra Petch* para títulos, *Jura* para corpo de texto
- **Componentes**: sistema consistente baseado em shadcn/ui, sempre pelos tokens do tema
- **Responsividade**: design mobile-first
- **Animações**: transições suaves com Framer Motion
- **Ícones**: Lucide React

> O acompanhamento da equiparação entre web e mobile fica em [`STATUS_EQUIPARACAO.md`](STATUS_EQUIPARACAO.md).
> Ao criar telas novas, use os tokens do tema (`bg-card`, `text-foreground`, `text-muted-foreground`,
> `border-border`, `text-primary`…) em vez de cores fixas do Tailwind, que não acompanham o tema.

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

