/**
 * utils/pdf.ts
 *
 * Este arquivo contém funções para gerar documentos PDF usando jsPDF.
 * Inclui relatórios de presença e resumos de torneios.
 */

import jsPDF from 'jspdf';
import { Group, KnockoutMatches, Player, Team, Match } from '@/utils/types'; // Importando todos os tipos necessários
import { MatchType } from './enums'; // Importando MatchType para clareza

/**
 * Gera um relatório de presença em formato PDF.
 * @param {string} eventName - O nome do evento ou da sessão.
 * @param {string} date - A data do relatório (já formatada como string).
 * @param {Player[]} players - A lista de jogadores a ser incluída no relatório.
 * @param {number} presentCount - O número total de jogadores presentes.
 * @param {number} paidCount - O número total de pagamentos registrados.
 */
export const generatePresencePDF = (
  eventName: string,
  date: string,
  players: Player[],
  presentCount: number,
  paidCount: number
) => {
  const doc = new jsPDF();
  const margin = 20;
  const lineSpacing = 10;
  let yPosition = margin;

  // Título do Relatório
  doc.setFontSize(22);
  doc.text("Relatório de Presença", margin, yPosition);
  yPosition += lineSpacing * 2;

  // Informações do Evento/Data
  doc.setFontSize(14);
  doc.text(`Evento: ${eventName}`, margin, yPosition);
  yPosition += lineSpacing;
  doc.text(`Data: ${date}`, margin, yPosition);
  yPosition += lineSpacing * 2;

  // Estatísticas de Resumo
  doc.setFontSize(12);
  doc.text(`Total de Jogadores: ${players.length}`, margin, yPosition);
  yPosition += lineSpacing;
  doc.text(`Total de Presentes: ${presentCount}`, margin, yPosition);
  yPosition += lineSpacing;
  doc.text(`Total de Pagamentos Recebidos: ${paidCount}`, margin, yPosition);
  yPosition += lineSpacing * 2;

  // Tabela de Jogadores
  doc.setFontSize(16);
  doc.text("Lista de Jogadores:", margin, yPosition);
  yPosition += lineSpacing;

  // Cabeçalho da Tabela
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Nome do Jogador", margin, yPosition);
  doc.text("Presença", margin + 80, yPosition);
  doc.text("Pagamento", margin + 130, yPosition);
  yPosition += lineSpacing;
  doc.setLineWidth(0.1);
  doc.line(margin, yPosition, doc.internal.pageSize.width - margin, yPosition); // Linha separadora
  yPosition += 5; // Espaçamento após a linha

  // Dados dos Jogadores
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  players.forEach((player) => {
    const presenceText = player.present ? '✅ Presente' : '❌ Ausente';
    const paymentText = player.paid ? '✔️ Pago' : '⚠️ Pendente';

    doc.text(player.name, margin, yPosition);
    doc.text(presenceText, margin + 80, yPosition);
    doc.text(paymentText, margin + 130, yPosition);
    yPosition += lineSpacing;

    // Adicionar nova página se o conteúdo exceder a altura da página
    if (yPosition > doc.internal.pageSize.height - margin) {
      doc.addPage();
      yPosition = margin; // Reinicia a posição Y na nova página
      // Repete o cabeçalho da tabela em novas páginas para clareza
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Nome do Jogador", margin, yPosition);
      doc.text("Presença", margin + 80, yPosition);
      doc.text("Pagamento", margin + 130, yPosition);
      yPosition += lineSpacing;
      doc.setLineWidth(0.1);
      doc.line(margin, yPosition, doc.internal.pageSize.width - margin, yPosition);
      yPosition += 5;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
    }
  });

  // Salvar o PDF
  doc.save(`relatorio_presenca_${eventName.replace(/\s/g, '_')}_${date.replace(/\//g, '-')}.pdf`);
};

/**
 * Gera um resumo de torneio em formato PDF.
 * @param {string} tournamentName - O nome do torneio.
 * @param {Group[]} groups - Os grupos do torneio (se aplicável).
 * @param {KnockoutMatches} [knockoutMatches] - As fases eliminatórias do torneio (opcional).
 */
export const generateTournamentPDF = (
  tournamentName: string,
  groups: Group[],
  knockoutMatches?: KnockoutMatches
) => {
  const doc = new jsPDF();
  const margin = 20;
  const lineSpacing = 10;
  let yPosition = margin;

  // Título do Torneio
  doc.setFontSize(22);
  doc.text(`Torneio: ${tournamentName}`, margin, yPosition);
  yPosition += lineSpacing * 2;

  // Fase de Grupos
  if (groups && groups.length > 0) {
    doc.setFontSize(16);
    doc.text('Fase de Grupos', margin, yPosition);
    yPosition += lineSpacing;

    groups.forEach((group) => {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`Grupo: ${group.name}`, margin + 5, yPosition);
      yPosition += lineSpacing;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      group.matches.forEach((match) => {
        doc.text(`${match.team1.name} ${match.score1 || '-'} x ${match.score2 || '-'} ${match.team2.name}`, margin + 10, yPosition);
        yPosition += lineSpacing;
      });
      yPosition += lineSpacing; // Espaço entre grupos

      if (yPosition > doc.internal.pageSize.height - margin) {
        doc.addPage();
        yPosition = margin;
      }
    });
  }

  // Fases Eliminatórias
  if (knockoutMatches) {
    doc.setFontSize(16);
    doc.text('Fase Eliminatória', margin, yPosition);
    yPosition += lineSpacing * 2;

    const renderStage = (stageName: string, matches: Match[]) => {
      if (matches && matches.length > 0) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`${stageName}`, margin + 5, yPosition);
        yPosition += lineSpacing;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        matches.forEach((match) => {
          doc.text(`${match.team1.name} ${match.score1 || '-'} x ${match.score2 || '-'} ${match.team2.name}`, margin + 10, yPosition);
          yPosition += lineSpacing;
        });
        yPosition += lineSpacing; // Espaço entre as rodadas

        if (yPosition > doc.internal.pageSize.height - margin) {
          doc.addPage();
          yPosition = margin;
        }
      }
    };

    renderStage('Oitavas de Final', knockoutMatches.roundOf16);
    renderStage('Quartas de Final', knockoutMatches.quarterFinals);
    renderStage('Semifinais', knockoutMatches.semiFinals);
    renderStage('Disputa pelo 3º Lugar', [knockoutMatches.thirdPlace]); // thirdPlace é um único Match
    renderStage('Final', [knockoutMatches.final]); // final é um único Match
  }

  // Salvar o PDF
  doc.save(`${tournamentName.replace(/\s/g, '_')}_campeonato.pdf`);
};

// A função 'toast' não deve ser definida aqui, pois é um efeito colateral da UI.
// Ela deve ser chamada no componente React que usa generatePresencePDF/generateTournamentPDF.
// Removido o exemplo de handleGeneratePDF que estava duplicado e com 'toast' não definido.
