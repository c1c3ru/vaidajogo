import 'package:flutter/material.dart';
import '../../../../core/theme/app_theme.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'dart:math';

class MatchInfo {
  String team1;
  String team2;
  String score1;
  String score2;
  bool isLive;

  MatchInfo({
    required this.team1,
    required this.team2,
    this.score1 = '0',
    this.score2 = '0',
    this.isLive = false,
  });
}

class BracketPrototypePage extends StatefulWidget {
  const BracketPrototypePage({super.key});

  @override
  State<BracketPrototypePage> createState() => _BracketPrototypePageState();
}

class _BracketPrototypePageState extends State<BracketPrototypePage> {
  int _teamCount = 8; // Potências de 2: 4, 8, 16
  late List<List<MatchInfo>> _rounds;

  @override
  void initState() {
    super.initState();
    _generateBrackets(_teamCount);
  }

  void _generateBrackets(int teams) {
    _rounds = [];
    int currentTeams = teams;

    while (currentTeams >= 2) {
      int matchesInRound = currentTeams ~/ 2;
      List<MatchInfo> roundMatches = [];
      for (int i = 0; i < matchesInRound; i++) {
        roundMatches.add(
          MatchInfo(
            team1: 'A Definir',
            team2: 'A Definir',
            score1: '-',
            score2: '-',
          ),
        );
      }
      _rounds.add(roundMatches);
      currentTeams = matchesInRound;
    }
  }

  void _editMatch(MatchInfo match, int roundIndex, int matchIndex) {
    TextEditingController team1Controller = TextEditingController(
      text: match.team1 == 'A Definir' ? '' : match.team1,
    );
    TextEditingController team2Controller = TextEditingController(
      text: match.team2 == 'A Definir' ? '' : match.team2,
    );
    TextEditingController score1Controller = TextEditingController(
      text: match.score1 == '-' ? '' : match.score1,
    );
    TextEditingController score2Controller = TextEditingController(
      text: match.score2 == '-' ? '' : match.score2,
    );

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.cardBackground,
        title: const Text(
          'Editar Chave',
          style: TextStyle(
            color: AppColors.primary,
            fontFamily: 'Chakra Petch',
          ),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: team1Controller,
                    style: const TextStyle(color: AppColors.foreground),
                    decoration: const InputDecoration(
                      labelText: 'Time 1',
                      labelStyle: TextStyle(color: AppColors.muted),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                SizedBox(
                  width: 60,
                  child: TextField(
                    controller: score1Controller,
                    keyboardType: TextInputType.number,
                    style: const TextStyle(color: AppColors.primary),
                    decoration: const InputDecoration(
                      labelText: 'Placar',
                      labelStyle: TextStyle(color: AppColors.muted),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: team2Controller,
                    style: const TextStyle(color: AppColors.foreground),
                    decoration: const InputDecoration(
                      labelText: 'Time 2',
                      labelStyle: TextStyle(color: AppColors.muted),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                SizedBox(
                  width: 60,
                  child: TextField(
                    controller: score2Controller,
                    keyboardType: TextInputType.number,
                    style: const TextStyle(color: AppColors.muted),
                    decoration: const InputDecoration(
                      labelText: 'Placar',
                      labelStyle: TextStyle(color: AppColors.muted),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text(
              'Cancelar',
              style: TextStyle(color: AppColors.muted),
            ),
          ),
          TextButton(
            onPressed: () {
              setState(() {
                match.team1 = team1Controller.text.trim().isEmpty
                    ? 'A Definir'
                    : team1Controller.text.trim();
                match.team2 = team2Controller.text.trim().isEmpty
                    ? 'A Definir'
                    : team2Controller.text.trim();
                match.score1 = score1Controller.text.trim().isEmpty
                    ? '-'
                    : score1Controller.text.trim();
                match.score2 = score2Controller.text.trim().isEmpty
                    ? '-'
                    : score2Controller.text.trim();
              });
              Navigator.pop(ctx);
            },
            child: const Text(
              'Salvar',
              style: TextStyle(color: AppColors.primary),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    // Calculando a altura baseada na quantidade máxima de times
    double cardHeight = 60.0;
    double verticalPadding = 20.0;
    double totalHeight =
        (_teamCount / 2) * (cardHeight + verticalPadding) + 100;

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text(
          'CHAVEAMENTO ESPORTIVO',
          style: TextStyle(
            fontFamily: 'Chakra Petch',
            fontWeight: FontWeight.bold,
          ),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: AppColors.primary),
          onPressed: () => Modular.to.pop(),
        ),
        actions: [
          PopupMenuButton<int>(
            icon: const Icon(Icons.group, color: AppColors.primary),
            tooltip: 'Quantidade de Times',
            onSelected: (value) {
              setState(() {
                _teamCount = value;
                _generateBrackets(value);
              });
            },
            itemBuilder: (context) => [
              const PopupMenuItem(value: 4, child: Text('4 Times')),
              const PopupMenuItem(value: 8, child: Text('8 Times')),
              const PopupMenuItem(value: 16, child: Text('16 Times')),
              const PopupMenuItem(value: 32, child: Text('32 Times')),
            ],
          ),
        ],
      ),
      body: InteractiveViewer(
        boundaryMargin: const EdgeInsets.all(40),
        minScale: 0.5,
        maxScale: 2.0,
        child: SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          physics: const BouncingScrollPhysics(),
          child: SingleChildScrollView(
            scrollDirection: Axis.vertical,
            physics: const BouncingScrollPhysics(),
            child: SizedBox(
              height: max(
                totalHeight,
                MediaQuery.of(context).size.height - 100,
              ),
              child: CustomPaint(
                painter: _BracketPainter(
                  rounds: _rounds,
                  cardWidth: 160.0,
                  cardHeight: 60.0,
                  columnWidth: 220.0,
                ),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: List.generate(_rounds.length, (roundIndex) {
                    return SizedBox(
                      width: 220.0, // Space between columns
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: List.generate(_rounds[roundIndex].length, (
                          matchIndex,
                        ) {
                          return _buildMatchCard(
                            _rounds[roundIndex][matchIndex],
                            roundIndex,
                            matchIndex,
                          );
                        }),
                      ),
                    );
                  }),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildMatchCard(MatchInfo match, int roundIndex, int matchIndex) {
    return GestureDetector(
      onTap: () => _editMatch(match, roundIndex, matchIndex),
      child: Container(
        width: 160,
        height: 60,
        decoration: BoxDecoration(
          color: AppColors.cardBackground.withValues(alpha: 0.9),
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: AppColors.primary.withValues(alpha: 0.3)),
          boxShadow: [
            BoxShadow(
              color: AppColors.primary.withValues(alpha: 0.1),
              blurRadius: 4,
              spreadRadius: 1,
            ),
          ],
        ),
        child: Column(
          children: [
            Expanded(
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 8),
                decoration: const BoxDecoration(
                  border: Border(
                    bottom: BorderSide(color: AppColors.border, width: 1),
                  ),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Text(
                        match.team1,
                        style: TextStyle(
                          color: match.team1 == 'A Definir'
                              ? AppColors.muted.withValues(alpha: 0.5)
                              : AppColors.foreground,
                          fontFamily: 'Jura',
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    Text(
                      match.score1,
                      style: const TextStyle(
                        color: AppColors.primary,
                        fontFamily: 'Chakra Petch',
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Expanded(
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 8),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Text(
                        match.team2,
                        style: TextStyle(
                          color: match.team2 == 'A Definir'
                              ? AppColors.muted.withValues(alpha: 0.5)
                              : AppColors.foreground,
                          fontFamily: 'Jura',
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    Text(
                      match.score2,
                      style: const TextStyle(
                        color: AppColors.muted,
                        fontFamily: 'Chakra Petch',
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _BracketPainter extends CustomPainter {
  final List<List<MatchInfo>> rounds;
  final double cardWidth;
  final double cardHeight;
  final double columnWidth;

  _BracketPainter({
    required this.rounds,
    required this.cardWidth,
    required this.cardHeight,
    required this.columnWidth,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = AppColors.primary.withValues(alpha: 0.5)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.0;

    for (int r = 0; r < rounds.length - 1; r++) {
      int matchesInRound = rounds[r].length;

      // The horizontal space per column is columnWidth.
      // Card takes cardWidth, leaving (columnWidth - cardWidth) for spacing.
      // Centers dynamically based on spaceAround calculation:
      double yStepCurrent = size.height / matchesInRound;
      double yStepNext = size.height / (matchesInRound / 2);

      for (int i = 0; i < matchesInRound; i++) {
        // Calculate coordinates for the connecting lines
        double startX = (r * columnWidth) + (columnWidth / 2) + (cardWidth / 2);
        double startY = (i * yStepCurrent) + (yStepCurrent / 2);

        int nextMatchIndex = i ~/ 2;
        double endX =
            ((r + 1) * columnWidth) + (columnWidth / 2) - (cardWidth / 2);
        double endY = (nextMatchIndex * yStepNext) + (yStepNext / 2);

        // Draw horizontal line out of the current match
        double midX = startX + (endX - startX) / 2;
        canvas.drawLine(Offset(startX, startY), Offset(midX, startY), paint);

        // Draw vertical connecting line
        canvas.drawLine(Offset(midX, startY), Offset(midX, endY), paint);

        // Draw horizontal line into the next match
        canvas.drawLine(Offset(midX, endY), Offset(endX, endY), paint);
      }
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
