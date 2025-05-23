# ⚽ Sistema de Gestão Esportiva: Vai Dar Jogo! 🏆

## ✨ Sobre o Projeto

Bem-vindo ao **Vai Dar Jogo**, uma aplicação web robusta e intuitiva, desenvolvida para simplificar a organização e gestão de times, jogadores e competições esportivas. Seja para um futebol de fim de semana com amigos ou um torneio mais estruturado, nosso sistema oferece as ferramentas para você focar no que realmente importa: o jogo!

Construído com as tecnologias mais modernas do ecossistema React, o "Vai Dar Jogo" combina performance, uma interface de usuário agradável e uma experiência de desenvolvimento otimizada.

## 🚀 Funcionalidades Principais

Explore o que você pode fazer com o "Vai Dar Jogo":

### 👤 Gerenciamento de Jogadores

* **Cadastro Detalhado:** Registre jogadores com nome completo, apelido, data de nascimento e status (membro ou convidado).

* **Avaliação Flexível:** Atribua e gerencie a habilidade dos jogadores utilizando diferentes sistemas de avaliação:

    * ⭐ **Estrelas (1-5):** Simples e visual.

    * 🔢 **Numérico (1-10):** Para uma precisão maior.

    * 📊 **Meia Estrela:** Permite avaliações mais granulares (ex: 3.5).

* **Posições por Esporte:** Defina as posições preferidas de cada jogador, adaptadas ao esporte selecionado (futsal, futebol, vôlei, basquete, handebol).

* **Visualização e Edição:** Visualize todos os jogadores cadastrados, edite suas informações e remova-os facilmente.

### 🎲 Sorteio de Times Inteligente

* **Balanceamento Automático:** Nosso algoritmo exclusivo considera as avaliações e posições dos jogadores para criar times automaticamente equilibrados, garantindo partidas mais justas e divertidas.

* **Configurável:** Defina o número de jogadores por time para se adaptar às suas necessidades.

* **Goleiros Separados:** Goleiros são identificados e listados separadamente, não sendo incluídos no sorteio automático de jogadores de linha.

### ✅ Lista de Presença Dinâmica

* **Controle em Tempo Real:** Marque a presença dos jogadores de forma rápida e eficiente para cada sessão de jogo.

* **Gestão de Pagamentos:** Registre quem pagou a taxa da sessão, facilitando a organização financeira.

* **Filtros e Estatísticas Rápidas:** Filtre por presentes, ausentes e veja um resumo rápido de participação e pagamentos.

* **Relatórios em PDF:** Gere e baixe relatórios de presença em PDF para registro e compartilhamento.

### 📊 Estatísticas Detalhadas

* **Visão Abrangente:** Visualize gráficos e métricas sobre a participação dos jogadores, distribuição por posição e níveis de avaliação.

* **Análise de Desempenho:** Obtenha insights sobre o desempenho geral da sua equipe e a evolução dos jogadores ao longo do tempo.

### 🏆 Gestão de Campeonatos

* **Criação Personalizada:** Organize seus próprios torneios com facilidade.

* **Formatos Flexíveis:** Escolha entre diferentes tipos de competição:

    * **Liga:** Todos contra todos (ida e volta).

    * **Copa:** Com fase de grupos e fases eliminatórias (mata-mata).

    * **Mata-mata:** Apenas fases eliminatórias (ida e volta).

* **Acompanhamento de Resultados:** Gerencie os times participantes e visualize a tabela do campeonato.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com um stack de tecnologias modernas e eficientes:

* **React:** Biblioteca JavaScript para construção de interfaces de usuário dinâmicas e reativas.

* **TypeScript:** Superset do JavaScript que adiciona tipagem estática, melhorando a segurança e a manutenibilidade do código.

* **Tailwind CSS:** Um framework CSS utilitário que permite construir designs personalizados rapidamente, com foco em responsividade.

* **Framer Motion:** Uma poderosa biblioteca para criar animações e transições suaves e complexas na interface do usuário.

* **Shadcn UI:** Coleção de componentes de interface de usuário reutilizáveis e acessíveis, construídos com Tailwind CSS e Radix UI.

* **Zustand:** Uma solução de gerenciamento de estado leve e flexível para React, otimizada para performance.

* **React Router:** Biblioteca padrão para roteamento declarativo em aplicações React.

* **React Query (`@tanstack/react-query`):** Para gerenciamento de estado assíncrono, cache e sincronização de dados do servidor.

* **`react-icons`:** Uma vasta biblioteca de ícones populares (Font Awesome, Material Design, etc.) para uso fácil em componentes React.

* **`jsPDF`:** Biblioteca para geração de documentos PDF diretamente no navegador.

* **`date-fns`:** Utilitário para manipulação e formatação de datas.

* **`zod` & `@hookform/resolvers/zod`:** Para validação de esquemas de formulário de forma robusta e eficiente.

* **`react-hook-form`:** Para gerenciamento de formulários com validação e performance otimizadas.

* **`uuid`:** Para geração de IDs únicos.

## ⚙️ Configurações do Sistema

O sistema permite algumas personalizações para se adequar às suas preferências:

### Sistema de Avaliação

Escolha o método de avaliação de jogadores que melhor se adapta à sua equipe:

* **Estrelas (1-5):** Ideal para uma avaliação rápida e visual.

* **Numérico (1-10):** Oferece mais granularidade para detalhar a habilidade.

* **Meia Estrela:** Permite avaliações como 3.5, 4.5, etc., para maior precisão.

### Destaque de Convidados

Personalize como os jogadores convidados são visualmente destacados na lista de presença e em outras seções, facilitando a identificação.

## 📂 Estrutura do Projeto

A organização do projeto segue um padrão modular para facilitar o desenvolvimento e a manutenção:

```
├── public/
│   └── index.html
├── src/
│   ├── assets/                # Imagens, ícones estáticos, etc.
│   ├── components/            # Componentes React reutilizáveis
│   │   ├── ui/                # Componentes de UI genéricos (Shadcn UI)
│   │   ├── menu/              # Componentes específicos do menu principal
│   │   ├── pages/             # Componentes de página principal/rota
│   │   ├── presence/          # Componentes para a funcionalidade de lista de presença
│   │   ├── player/            # Componentes relacionados à gestão de jogadores
│   │   ├── rating/            # Componentes para diferentes sistemas de avaliação
│   │   ├── shared/            # Componentes reutilizáveis em várias páginas
│   │   ├── tournament/        # Componentes específicos de torneios
│   │   └── (Outros componentes na raiz de 'components/')
│   ├── hooks/                 # Hooks React personalizados e reutilizáveis
│   ├── stores/                # Gerenciamento de estado (Zustand e Context API)
│   │   ├── PlayerContext.tsx  # Context API para o estado de jogadores
│   │   └── zustand_stores.ts  # Arquivo consolidado para todas as stores Zustand
│   ├── utils/                 # Funções utilitárias e helpers
│   │   ├── animations.ts      # Configurações de Framer Motion
│   │   ├── enums.ts           # Definições de enums
│   │   ├── localStorage.ts    # Funções para localStorage
│   │   ├── pageNames.ts       # Mapeamento de nomes de página
│   │   ├── pdf.ts             # Funções de geração de PDF
│   │   ├── sportsIcons.ts     # Mapeamento de ícones de esporte
│   │   ├── tournament.ts      # Lógica de geração de torneios
│   │   └── types.ts           # Definições de tipos e interfaces
│   ├── App.tsx                # Componente raiz da aplicação
│   ├── index.css              # Estilos globais (Tailwind CSS)
│   └── main.tsx               # Ponto de entrada da aplicação (renderização do React)

```

## 🚀 Iniciando o Projeto

Siga estas instruções para configurar e executar o projeto em sua máquina local.

### Pré-requisitos

Certifique-se de ter o Node.js instalado (versão 18 ou superior é recomendada).

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    ```

2.  **Entre no diretório do projeto:**
    ```bash
    cd nome-do-projeto # Substitua pelo nome da pasta do seu projeto
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

    A aplicação estará disponível em `http://localhost:5173` (ou outra porta, se 5173 estiver em uso).

### Scripts Úteis

* `npm run dev`: Inicia o servidor de desenvolvimento.
* `npm run build`: Compila a aplicação para produção.
* `npm run lint`: Executa o linter para verificar problemas de código.
* `npm run preview`: Serve a build de produção localmente.

## 🗺️ Rotas da Aplicação

Acesse as diferentes seções da aplicação através das seguintes rotas:

* `/` - Página de Login
* `/login` - Página de Login
* `/menu` - Menu Principal
* `/player/new` - Cadastro de Novo Jogador
* `/players` - Lista de Jogadores
* `/teams/draw` - Sorteio de Times
* `/presence` - Lista de Presença
* `/statistics` - Estatísticas dos Jogadores
* `/championship` - Gestão de Campeonatos

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Se você tiver ideias para melhorias, novas funcionalidades ou encontrar algum bug, por favor, siga estas etapas:

1.  Faça um **Fork** do projeto.

2.  Crie uma **Branch** para sua feature/correção (`git checkout -b feature/minha-nova-feature` ou `fix/correcao-de-bug`).

3.  Faça commit das suas alterações (`git commit -m 'feat: Adiciona nova funcionalidade X'`).

    * Use commits semânticos (ex: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`).

4.  Faça **Push** para a sua branch (`git push origin feature/minha-nova-feature`).

5.  Abra um **Pull Request** para a branch `main` (ou `master`) do repositório original.

    * Descreva suas alterações detalhadamente.

    * Inclua capturas de tela, se aplicável.

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.


