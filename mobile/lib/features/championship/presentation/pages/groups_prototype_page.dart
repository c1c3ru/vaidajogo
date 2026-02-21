import 'package:flutter/material.dart';
import '../../../../core/theme/app_theme.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'dart:math';

class TeamInfo {
  final String name;
  final String code;

  TeamInfo({required this.name, required this.code});
}

class GroupInfo {
  final String name;
  final List<TeamInfo> teams;

  GroupInfo({required this.name, required this.teams});
}

class GroupsPrototypePage extends StatefulWidget {
  const GroupsPrototypePage({super.key});

  @override
  State<GroupsPrototypePage> createState() => _GroupsPrototypePageState();
}

class _GroupsPrototypePageState extends State<GroupsPrototypePage> {
  late List<GroupInfo> _groups;

  @override
  void initState() {
    super.initState();
    _groups = _generateMockGroups();
  }

  List<GroupInfo> _generateMockGroups() {
    // Simulando uma estrutura das chaves de grupos baseada em esportes
    final data = {
      'GRUPO A': ['Alpha Team', 'Bravos FC', 'Cyber Squad', 'Delta Force'],
      'GRUPO B': ['Echo United', 'Falcons', 'Gladiadores', 'Gaviões'],
      'GRUPO C': ['Ice Wolves', 'Jaguars', 'K-Knights', 'Lions FC'],
      'GRUPO D': ['Matrix', 'Nexus', 'Omega', 'Panthers'],
      'GRUPO E': ['Quasares', 'Red Bulls', 'Spartans', 'Titans'],
      'GRUPO F': ['Unicorns', 'Vipers', 'Warriors', 'X-Men'],
      'GRUPO G': ['Yeti Team', 'Zeus', 'Apollo', 'Atena'],
      'GRUPO H': ['Poseidon', 'Hades', 'Ares FC', 'Hermes United'],
    };

    return data.entries.map((entry) {
      return GroupInfo(
        name: entry.key,
        teams: entry.value
            .map(
              (t) => TeamInfo(
                name: t,
                code: t.substring(0, min(3, t.length)).toUpperCase(),
              ),
            )
            .toList(),
      );
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text(
          'FASE DE GRUPOS',
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
      body: CustomScrollView(
        physics: const BouncingScrollPhysics(),
        slivers: [
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                children: [
                  const Icon(
                    Icons.emoji_events,
                    size: 80,
                    color: AppColors.secondary,
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'CAMPEONATO OFICIAL - 2026',
                    style: TextStyle(
                      color: AppColors.foreground,
                      fontFamily: 'Chakra Petch',
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 2,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Tabelas de Classificação por Grupos',
                    style: TextStyle(
                      color: AppColors.muted.withValues(alpha: 0.8),
                      fontFamily: 'Jura',
                      fontSize: 14,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          ),
          SliverPadding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            sliver: SliverGrid(
              gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
                maxCrossAxisExtent: 350,
                mainAxisExtent: 260, // Altura estimada para o Header + 4 Linhas
                mainAxisSpacing: 16,
                crossAxisSpacing: 16,
              ),
              delegate: SliverChildBuilderDelegate((context, index) {
                return _buildGroupCard(_groups[index]);
              }, childCount: _groups.length),
            ),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 40)),
        ],
      ),
    );
  }

  Widget _buildGroupCard(GroupInfo group) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.cardBackground.withValues(alpha: 0.8),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.primary.withValues(alpha: 0.3)),
        boxShadow: [
          BoxShadow(
            color: AppColors.primary.withValues(alpha: 0.05),
            blurRadius: 10,
            spreadRadius: 1,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // CABEÇALHO DO GRUPO
          Container(
            padding: const EdgeInsets.symmetric(vertical: 14),
            decoration: BoxDecoration(
              color: AppColors.primary.withValues(alpha: 0.15),
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(15),
                topRight: Radius.circular(15),
              ),
              border: const Border(
                bottom: BorderSide(color: AppColors.primary, width: 2),
              ),
            ),
            child: Text(
              group.name,
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: AppColors.primary,
                fontFamily: 'Chakra Petch',
                fontSize: 18,
                fontWeight: FontWeight.bold,
                letterSpacing: 2,
              ),
            ),
          ),
          // LINHAS DAS EQUIPES
          Expanded(
            child: Column(
              children: group.teams.asMap().entries.map((entry) {
                final isLast = entry.key == group.teams.length - 1;
                final team = entry.value;
                return Expanded(
                  child: Container(
                    decoration: BoxDecoration(
                      border: isLast
                          ? null
                          : const Border(
                              bottom: BorderSide(color: AppColors.border),
                            ),
                    ),
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: Row(
                      children: [
                        // Simulação de Escudo/Bandeira
                        Container(
                          width: 32,
                          height: 32,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: AppColors.secondary.withValues(alpha: 0.2),
                            border: Border.all(
                              color: AppColors.secondary.withValues(alpha: 0.5),
                            ),
                          ),
                          alignment: Alignment.center,
                          child: Text(
                            team.code,
                            style: const TextStyle(
                              color: AppColors.secondary,
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Chakra Petch',
                            ),
                          ),
                        ),
                        const SizedBox(width: 16),
                        // Nome da Equipe
                        Expanded(
                          child: Text(
                            team.name,
                            style: const TextStyle(
                              color: AppColors.foreground,
                              fontFamily: 'Jura',
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                            ),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        // Simulação de check para destacar algo (ex: classificado)
                        if (entry.key < 2) // Os dois primeiros classificados
                          const Icon(
                            Icons.check_circle_outline,
                            color: AppColors.primary,
                            size: 16,
                          ),
                      ],
                    ),
                  ),
                );
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }
}
