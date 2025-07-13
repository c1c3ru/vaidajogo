# 🏆 Melhoria: Avanço Automático em Competições (Grupos + Eliminatória)

## Funcionalidade

O sistema agora suporta automaticamente todo o fluxo de competições com:

- **Fase de Grupos:**  
  - O usuário pode escolher o número de grupos ao configurar o torneio.
  - Os times são distribuídos de forma equilibrada entre os grupos.
  - Todos os times de um grupo jogam entre si (todos contra todos).
  - A tabela de classificação de cada grupo é exibida e atualizada em tempo real conforme os resultados são preenchidos.

- **Classificação e Avanço Automático:**  
  - Quando todos os jogos dos grupos são preenchidos, o sistema identifica automaticamente os classificados (ex: 1º e 2º de cada grupo).
  - Os classificados avançam para a fase eliminatória (mata-mata) sem intervenção manual.

- **Fase Eliminatória (Mata-mata):**  
  - Os confrontos da fase eliminatória são gerados automaticamente com os classificados dos grupos.
  - O avanço de fases é automático: ao preencher todos os resultados de uma rodada, a próxima é criada até restar apenas o campeão.
  - O campeão é exibido em destaque ao final.

## Critérios e Regras

- **Classificação nos Grupos:**  
  - Pontuação: vitória = 3 pontos, empate = 1 ponto, derrota = 0 ponto.
  - Critérios de desempate: pontos, saldo de gols, gols marcados (pode ser expandido).
  - Os dois melhores de cada grupo avançam (padrão, pode ser customizado).

- **Fase Eliminatória:**  
  - Suporta jogo único ou ida/volta.
  - Critérios de desempate podem ser expandidos (gols fora, pênaltis, etc).

## Como Usar

1. **Configuração:**  
   - Escolha o formato “Grupos + Eliminatória” e o número de grupos ao criar o torneio.
2. **Cadastro de Times:**  
   - Adicione os times normalmente.
3. **Geração de Confrontos:**  
   - Clique para gerar confrontos. Os grupos e partidas são criados automaticamente.
4. **Preenchimento de Resultados:**  
   - Preencha os resultados dos jogos dos grupos.
   - Ao finalizar todos os jogos, os classificados avançam automaticamente para o mata-mata.
   - Continue preenchendo os resultados até o sistema exibir o campeão.

## Arquivos Alterados

- `src/components/tournament/TournamentForm.tsx` — Campo para número de grupos.
- `src/utils/tournament.ts` — Funções para geração de grupos, classificação e avanço automático.
- `src/stores/useTournamentStore.ts` — Lógica de geração de grupos, avanço automático e integração do fluxo.
- `src/components/pages/Championship.tsx` — Exibição das tabelas de grupos, integração do avanço automático e exibição do campeão.

---

Se quiser expandir para outros formatos, critérios de desempate personalizados ou mais opções de configuração, é só pedir! 