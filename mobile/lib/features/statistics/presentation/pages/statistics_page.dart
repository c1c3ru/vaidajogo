import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'package:fl_chart/fl_chart.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../domain/models/player.dart';
import '../../../players/presentation/bloc/player_bloc.dart';
import '../../../players/presentation/bloc/player_state.dart' as p;

class StatisticsPage extends StatefulWidget {
  const StatisticsPage({super.key});

  @override
  State<StatisticsPage> createState() => _StatisticsPageState();
}

class _StatisticsPageState extends State<StatisticsPage> {
  final _playerBloc = Modular.get<PlayerBloc>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'TELEMETRIA / ESTATÍSTICAS',
          style: TextStyle(
            fontFamily: 'Chakra Petch',
            fontWeight: FontWeight.bold,
            letterSpacing: 1.5,
          ),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: AppColors.primary),
          onPressed: () => Modular.to.pop(),
        ),
      ),
      body: BlocBuilder<PlayerBloc, p.PlayerState>(
        bloc: _playerBloc,
        builder: (context, state) {
          final players = state.players;

          // Process the rating distribution
          final ratingsDist = <int, int>{};
          for (var p in players) {
            ratingsDist[p.rating] = (ratingsDist[p.rating] ?? 0) + 1;
          }

          // Process position distribution
          final posDist = <String, int>{};
          for (var p in players) {
            for (var pos in p.selectedPositions) {
              posDist[pos] = (posDist[pos] ?? 0) + 1;
            }
          }

          return CustomScrollView(
            physics: const BouncingScrollPhysics(),
            slivers: [
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _buildSummary(players),
                      const SizedBox(height: 30),
                      if (players.isNotEmpty) _buildRatingChart(ratingsDist),
                      const SizedBox(height: 30),
                      if (posDist.isNotEmpty)
                        _buildPositionDistribution(posDist),
                    ],
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _buildSummary(List<Player> players) {
    final present = players.where((p) => p.present).length;

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.cardBackground.withValues(alpha: 0.8),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.primary.withValues(alpha: 0.3)),
        boxShadow: [
          BoxShadow(
            color: AppColors.primary.withValues(alpha: 0.05),
            blurRadius: 15,
            spreadRadius: 2,
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _buildStatItem('OPERADORES', '${players.length}', AppColors.primary),
          Container(width: 1, height: 40, color: AppColors.border),
          _buildStatItem('ATIVOS', '$present', AppColors.secondary),
        ],
      ),
    );
  }

  Widget _buildStatItem(String label, String value, Color color) {
    return Column(
      children: [
        Text(
          value,
          style: TextStyle(
            fontSize: 32,
            fontFamily: 'Chakra Petch',
            fontWeight: FontWeight.bold,
            color: color,
          ),
        ),
        Text(
          label,
          style: const TextStyle(
            fontSize: 10,
            fontFamily: 'Jura',
            letterSpacing: 1,
            color: AppColors.muted,
          ),
        ),
      ],
    );
  }

  Widget _buildRatingChart(Map<int, int> ratingsDist) {
    List<BarChartGroupData> barGroups = [];
    int maxCount = 0;

    for (int i = 1; i <= 10; i++) {
      final count = ratingsDist[i] ?? 0;
      if (count > maxCount) maxCount = count;
      barGroups.add(
        BarChartGroupData(
          x: i,
          barRods: [
            BarChartRodData(
              toY: count.toDouble(),
              color: AppColors.secondary,
              width: 14,
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(4),
                topRight: Radius.circular(4),
              ),
            ),
          ],
        ),
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'DISTRIBUIÇÃO DE NÍVEL DE AMEAÇA',
          style: TextStyle(
            color: AppColors.primary,
            fontFamily: 'Chakra Petch',
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 20),
        SizedBox(
          height: 200,
          child: BarChart(
            BarChartData(
              alignment: BarChartAlignment.spaceAround,
              maxY: maxCount.toDouble() + 1,
              barTouchData: BarTouchData(enabled: false),
              titlesData: FlTitlesData(
                show: true,
                bottomTitles: AxisTitles(
                  sideTitles: SideTitles(
                    showTitles: true,
                    getTitlesWidget: (value, meta) => Padding(
                      padding: const EdgeInsets.only(top: 8.0),
                      child: Text(
                        value.toInt().toString(),
                        style: const TextStyle(
                          color: AppColors.muted,
                          fontSize: 10,
                          fontFamily: 'Jura',
                        ),
                      ),
                    ),
                  ),
                ),
                leftTitles: const AxisTitles(
                  sideTitles: SideTitles(showTitles: false),
                ),
                rightTitles: const AxisTitles(
                  sideTitles: SideTitles(showTitles: false),
                ),
                topTitles: const AxisTitles(
                  sideTitles: SideTitles(showTitles: false),
                ),
              ),
              gridData: const FlGridData(show: false),
              borderData: FlBorderData(show: false),
              barGroups: barGroups,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildPositionDistribution(Map<String, int> posDist) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'TOPOLOGIA DE COMBATE (POSIÇÕES)',
          style: TextStyle(
            color: AppColors.primary,
            fontFamily: 'Chakra Petch',
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 16),
        Wrap(
          spacing: 12,
          runSpacing: 12,
          children: posDist.entries.map((e) {
            return Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              decoration: BoxDecoration(
                color: AppColors.background,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppColors.border),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    e.key,
                    style: const TextStyle(
                      color: AppColors.foreground,
                      fontFamily: 'Chakra Petch',
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 6,
                      vertical: 2,
                    ),
                    decoration: BoxDecoration(
                      color: AppColors.primary.withValues(alpha: 0.2),
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      '${e.value}',
                      style: const TextStyle(
                        color: AppColors.primary,
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
            );
          }).toList(),
        ),
      ],
    );
  }
}
