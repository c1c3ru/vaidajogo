# STATUS DA EQUIPARAÇÃO WEB ↔ MOBILE

> Fonte de verdade para a próxima execução. Atualizado a cada ciclo de trabalho.
>
> - **Mobile (referência):** Flutter, em `mobile/lib/` — tema *dark-only* "cyberpunk".
> - **Web (alvo):** React + Vite + Tailwind + shadcn/ui, em `src/`.
> - **Escopo:** apenas arquivos de frontend da Web. Nenhum endpoint de backend ou regra de banco foi alterado.
> - **Branch:** `claude/project-thread-mn85k2`.
> - **Último ciclo:** 23/09/2026 — Ciclos 1 a 4 (tema, Check-In, Sorteio, demais telas).

## Critérios para marcar um componente como concluído

1. A web usa a mesma lógica de negócio e a mesma estrutura visual do mobile (respeitando particularidades da plataforma).
2. `npm run build` compila sem erros.
3. O console do navegador não tem novos erros ou avisos depois da alteração.

**Como cada item abaixo foi verificado:** `npm run lint` (0 erros), `npx tsc --noEmit` (0 erros),
`npm run test:run` (37 testes), `npm run build` e um navegador Chromium real rodando contra
`vite preview`, percorrendo as 7 rotas com o console capturado e interagindo com os controles.

---

## 1. Componentes validados e idênticos

| Componente | Arquivo | O que foi equiparado |
|---|---|---|
| **Tema global** | `index.html`, `src/index.css`, `src/App.css` | A web agora roda no tema escuro do mobile. `<html class="dark">` mais `color-scheme`/`theme-color`; o bloco `.dark` já tinha exatamente as cores de `AppColors` (`#050511`, `#E0E7FF`, `#00F0FF`, `#7000FF`, `#FF003C`) e as fontes *Chakra Petch* / *Jura*. Verificado no navegador: `body` em `rgb(5, 5, 16)`, idêntico ao `AppColors.background`. O `#root` deixou de ser o CSS de exemplo do Vite (largura de 1280px e `text-align: center`) e passou a ocupar a largura toda, como as telas do Flutter. |
| **Dashboard** | `src/components/pages/Dashboard.tsx`, `src/constants/texts.ts` | Mesma saudação ("Seja bem-vindo ao VAIDAJOGO."), mesmos títulos e descrições de card (Cadastro / Check-In / Sorteio e Jogadores / Estatísticas / Campeonatos), mesmas seções ("Módulos Essenciais" e "Recursos Avançados") e mesmo rodapé de card ("Acessar"). O restante da tela já seguia o mobile: logo com "SYSTEM CORE ONLINE", guia de 3 passos e cartão de doação PIX. |
| **Check-In (presença)** | `src/components/PresenceList.tsx` | Reescrita no formato de `presence_page.dart`: título "CHECK-IN", os dois contadores do mobile (PRESENTES e PAGOS (sorteio)) sobre o total, progresso circular de presença, legenda ("Presença" / "Pago (entra no sorteio)") e linhas com o botão de digital à esquerda, apelido ou nome em destaque quando presente, posições como subtítulo e o botão de pagamento à direita. As mensagens são as do mobile, incluindo "{nome} — pago! Entra no sorteio 💚". |
| **Sorteio das Equipes** | `src/components/TeamDraw.tsx` | Mesma regra de negócio do mobile: só entra no sorteio quem tem **presença e pagamento** confirmados (`present && paid && includeInDraw`). Painel de configuração com "Efetivo disponível / N jogadores", slider de 4 a 11 jogadores por time com o selo "N v N" e botão de gerar times. Cada time exibe o selo `PWR <média>` e as linhas mostram apelido ou nome com `N ★`, com ícone próprio para goleiro. Estado vazio com o texto e os dois atalhos do mobile. |
| **Jogadores** | `src/components/PlayerList.tsx` | Reescrita no formato de `player_card.dart`: avatar com a inicial, borda acesa quando o jogador está presente, apelido ou nome, "Classificação: N/5 ★", posições em roxo e os dois selos do mobile (PRESENTE/OFFLINE e PAGO/PENDENTE). Cabeçalho equivalente à AppBar "JOGADORES" com o atalho de cadastro. Estado vazio "Nenhum registro encontrado." |
| **Voltar (AppBar)** | `src/components/BackToDashboard.tsx` | Era um botão fixo em inglês ("Back to Dashboard") sobreposto ao conteúdo. Agora fica no fluxo da página, no topo, e acompanha o idioma — equivalente à seta de voltar da AppBar do mobile. |
| **Estatísticas** | `src/components/Statistics.tsx` | Cartões, gráficos e controles passaram a usar os tokens do tema escuro, e a paleta dos gráficos passou a ser a do mobile (ciano, roxo, vermelho e verde de `AppColors`). |
| **Campeonatos** | `src/components/pages/Championship.tsx` | Todas as superfícies claras fixas foram trocadas pelos tokens do tema, de modo que a tela acompanha o tema escuro sem perder contraste. |
| **Cadastro de Jogador** | `src/components/PlayerForm.tsx` | Mesma conversão: cabeçalhos, campos, avisos e botões passaram a usar os tokens do tema escuro. |
| **Traduções** | `src/i18n/locales/texts/*.json` | Todos os textos novos ou alterados foram traduzidos para inglês e espanhol; o teste de paridade da árvore continua passando. |

## 2. Em andamento

_(nada em andamento — os ciclos 1 a 4 foram concluídos)_

## 3. Falhas ou incompatibilidades encontradas

- **Fontes não verificáveis neste ambiente.** *Chakra Petch* e *Jura* vêm do Google Fonts e o proxy
  de saída do container bloqueia `fonts.googleapis.com`, então as capturas de tela usam a fonte de
  fallback. O `index.html` carrega as duas fontes normalmente e o Tailwind já as mapeia em
  `fontFamily.heading` / `fontFamily.body`, então em produção a tipografia é a mesma do mobile —
  mas isso não pôde ser confirmado visualmente aqui.
- **Goleiros no sorteio: divergência mantida de propósito.** No mobile os goleiros entram no sorteio
  como qualquer outro jogador; na web eles são listados à parte e ficam fora do sorteio dos jogadores
  de linha. Essa separação já existia na web e é útil na prática (o goleiro costuma ser fixo), então
  ela foi mantida e a regra do pagamento foi aplicada também a eles. **Se preferir a regra do mobile
  exatamente como está lá, basta dizer — é uma linha de código.**
- **`Championship.tsx` repete o título "Configuração do Torneio"** (uma vez no cabeçalho do cartão e
  outra no bloco interno). É um problema anterior a este trabalho e não tem contraparte no mobile,
  então ficou como está para não misturar refatoração com equiparação.
- **`DashboardHeader.tsx` e `DashboardMenu.tsx` continuam com a paleta clara antiga.** Nenhum dos dois
  é importado por nenhuma tela (código morto), então não afetam o que o usuário vê e não foram
  convertidos.

## 4. Fora do escopo

- **Qualquer alteração no app mobile** (`mobile/`): o mobile é a referência, não o alvo.
- **Backend e regras de banco**: proibido por instrução do usuário.
- **Dependências nativas do mobile sem equivalente na web** (`shared_preferences`, `flutter_modular`,
  `hive`): a web já tem equivalentes próprios (`localStorage`, `react-router-dom`, `zustand`), então a
  equiparação é de comportamento, não de biblioteca.
- **Telas protótipo do campeonato** (`bracket_prototype_page.dart`, `groups_prototype_page.dart`,
  `scoreboard_page.dart`): são protótipos no mobile, sem contrapartida estável na web.
- **Recursos que só existem na web** (busca, filtros, ações em lote no Check-In, edição e exclusão na
  lista de jogadores, gráficos configuráveis em Estatísticas): foram mantidos e apenas repaginados no
  tema escuro. Eles não existem no mobile, mas são particularidades legítimas da plataforma web.
