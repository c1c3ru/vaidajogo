/**
 * utils/pageNames.ts
 *
 * Este arquivo mapeia caminhos de URL para nomes de página amigáveis,
 * usado para exibir títulos na UI.
 */

/**
 * Objeto que mapeia caminhos de URL para seus nomes de exibição.
 */
const pageNames: { [key: string]: string } = {
  "/": "Menu Inicial",
  "/menu": "Menu Inicial",
  "/player/new": "Cadastrar Jogador", // Ajustado para singular
  "/players": "Lista de Jogadores",
  "/teams/draw": "Sorteio de Times", // Ajustado para plural
  "/presence": "Lista de Presença",
  "/statistics": "Estatísticas",
  "/championship": "Campeonato" // Ajustado para singular
};

export default pageNames;
