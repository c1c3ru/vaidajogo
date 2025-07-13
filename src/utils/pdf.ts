import jsPDF from 'jspdf';
import { Group, KnockoutMatches, Player, Team, Match } from '@/types';
import { MatchType } from './enums';

/**
 * Gera um relatório de presença em formato PDF com melhorias visuais.
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

  // Configuração de cores
  const primaryColor = [0, 123, 255] as [number, number, number]; // Azul
  const successColor = [40, 167, 69] as [number, number, number]; // Verde
  const warningColor = [255, 193, 7] as [number, number, number]; // Amarelo
  const dangerColor = [220, 53, 69] as [number, number, number]; // Vermelho

  // Cabeçalho com logo/título
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, doc.internal.pageSize.width, 30, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text("Relatório de Presença", margin, 20);
  
  // Reset para texto normal
  doc.setTextColor(0, 0, 0);
  yPosition = 40;

  // Informações do Evento/Data
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`Evento: ${eventName}`, margin, yPosition);
  yPosition += lineSpacing;
  doc.text(`Data: ${date}`, margin, yPosition);
  yPosition += lineSpacing * 2;

  // Estatísticas de Resumo com cores
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Resumo da Sessão:", margin, yPosition);
  yPosition += lineSpacing;

  doc.setFont("helvetica", "normal");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(`Total de Jogadores: ${players.length}`, margin, yPosition);
  yPosition += lineSpacing;
  
  doc.setTextColor(successColor[0], successColor[1], successColor[2]);
  doc.text(`Total de Presentes: ${presentCount}`, margin, yPosition);
  yPosition += lineSpacing;
  
  doc.setTextColor(warningColor[0], warningColor[1], warningColor[2]);
  doc.text(`Total de Pagamentos Recebidos: ${paidCount}`, margin, yPosition);
  yPosition += lineSpacing;
  
  doc.setTextColor(dangerColor[0], dangerColor[1], dangerColor[2]);
  doc.text(`Total de Ausentes: ${players.length - presentCount}`, margin, yPosition);
  yPosition += lineSpacing * 2;

  // Reset para texto normal
  doc.setTextColor(0, 0, 0);

  // Tabela de Jogadores Melhorada
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Lista de Jogadores:", margin, yPosition);
  yPosition += lineSpacing;

  // Cabeçalho da Tabela com fundo colorido
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, yPosition - 5, doc.internal.pageSize.width - 2 * margin, 10, 'F');
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Nome do Jogador", margin, yPosition);
  doc.text("Presença", margin + 80, yPosition);
  doc.text("Pagamento", margin + 130, yPosition);
  doc.text("Avaliação", margin + 180, yPosition);
  yPosition += lineSpacing;
  
  doc.setLineWidth(0.1);
  doc.line(margin, yPosition, doc.internal.pageSize.width - margin, yPosition);
  yPosition += 5;

  // Dados dos Jogadores
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  
  players.forEach((player) => {
    const presenceText = player.present ? '✅ Presente' : '❌ Ausente';
    const paymentText = player.paid ? '✔️ Pago' : '⚠️ Pendente';
    const ratingText = player.rating ? `${player.rating}/5` : 'N/A';

    // Cores baseadas no status
    if (player.present) {
      doc.setTextColor(successColor[0], successColor[1], successColor[2]);
    } else {
      doc.setTextColor(dangerColor[0], dangerColor[1], dangerColor[2]);
    }
    
    doc.text(player.name, margin, yPosition);
    
    if (player.present) {
      doc.setTextColor(successColor[0], successColor[1], successColor[2]);
    } else {
      doc.setTextColor(dangerColor[0], dangerColor[1], dangerColor[2]);
    }
    doc.text(presenceText, margin + 80, yPosition);
    
    if (player.paid) {
      doc.setTextColor(successColor[0], successColor[1], successColor[2]);
    } else {
      doc.setTextColor(warningColor[0], warningColor[1], warningColor[2]);
    }
    doc.text(paymentText, margin + 130, yPosition);
    
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(ratingText, margin + 180, yPosition);
    
    yPosition += lineSpacing;

    // Adicionar nova página se necessário
    if (yPosition > doc.internal.pageSize.height - margin) {
      doc.addPage();
      yPosition = margin;
      
      // Repete o cabeçalho da tabela
      doc.setFillColor(240, 240, 240);
      doc.rect(margin, yPosition - 5, doc.internal.pageSize.width - 2 * margin, 10, 'F');
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Nome do Jogador", margin, yPosition);
      doc.text("Presença", margin + 80, yPosition);
      doc.text("Pagamento", margin + 130, yPosition);
      doc.text("Avaliação", margin + 180, yPosition);
      yPosition += lineSpacing;
      doc.setLineWidth(0.1);
      doc.line(margin, yPosition, doc.internal.pageSize.width - margin, yPosition);
      yPosition += 5;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
    }
  });

  // Rodapé com informações adicionais
  yPosition += lineSpacing * 2;
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text(`Relatório gerado em ${new Date().toLocaleString('pt-BR')}`, margin, yPosition);
  doc.text("Sistema Vai Dar Jogo - Gestão Esportiva", margin, yPosition + 5);

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

  doc.text(`Torneio: ${tournamentName}`, margin, margin + lineSpacing);

  let yPosition = margin + (2 * lineSpacing);
  groups.forEach((group) => {
    doc.text(`${group.name}`, margin, yPosition);
    yPosition += lineSpacing;

    group.matches.forEach((match) => {
      doc.text(`${match.team1} vs ${match.team2}`, margin + lineSpacing, yPosition);
      yPosition += lineSpacing;
    });
  });

  if (knockoutMatches) {
    doc.text("Fases Eliminatórias:", margin, yPosition);
    yPosition += lineSpacing;

    Object.entries(knockoutMatches).forEach(([phase, matches]) => {
      doc.text(`${phase}:`, margin, yPosition);
      yPosition += lineSpacing;

      matches.forEach((match) => {
        doc.text(`${match.team1} vs ${match.team2}`, margin + lineSpacing, yPosition);
        yPosition += lineSpacing;
      });
    });
  }

  doc.save(`torneio_${tournamentName.replace(/\s/g, '_')}.pdf`);
};