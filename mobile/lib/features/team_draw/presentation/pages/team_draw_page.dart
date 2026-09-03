import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_modular/flutter_modular.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../domain/models/player.dart';
import '../../../players/presentation/bloc/player_bloc.dart';
import '../../../players/presentation/bloc/player_state.dart' as p;
import '../bloc/team_draw_bloc.dart';
import '../bloc/team_draw_event.dart';
import '../bloc/team_draw_state.dart';

class TeamDrawPage extends StatefulWidget {
  const TeamDrawPage({super.key});

  @override
  State<TeamDrawPage> createState() => _TeamDrawPageState();
}

class _TeamDrawPageState extends State<TeamDrawPage> {
  int _playersPerTeam = 5;
  final _teamDrawBloc = Modular.get<TeamDrawBloc>();
  final _playerBloc = Modular.get<PlayerBloc>();

  @override
  void dispose() {
    _teamDrawBloc.add(ClearTeamsEvent());
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'SORTEIO DAS EQUIPES',
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
        builder: (context, playerState) {
          // Filtro: presente + pago + incluído no sorteio.
          // Regra de negócio: apenas jogadores com pagamento confirmado
          // participam do sorteio. O toggle de pagamento fica na tela de Check-In.
          final presentPlayers = playerState.players
              .where((p) => p.present && p.paid && p.includeInDraw)
              .toList();

          return Column(
            children: [
              _buildConfigPanel(presentPlayers),
              Expanded(
                child: BlocBuilder<TeamDrawBloc, TeamDrawState>(
                  bloc: _teamDrawBloc,
                  builder: (context, drawState) {
                    if (drawState is TeamDrawLoading) {
                      return const Center(
                        child: CircularProgressIndicator(
                          color: AppColors.primary,
                        ),
                      );
                    } else if (drawState is TeamDrawError) {
                      return Center(
                        child: Text(
                          drawState.message,
                          style: const TextStyle(
                            color: AppColors.accent,
                            fontFamily: 'Jura',
                            fontSize: 16,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      );
                    } else if (drawState is TeamDrawSuccess) {
                      return _buildGeneratedTeams(drawState.teams);
                    }

                    return _buildNoPlayersState();
                  },
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _buildConfigPanel(List<Player> presentPlayers) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: const BoxDecoration(
        color: AppColors.cardBackground,
        border: Border(bottom: BorderSide(color: AppColors.border)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'EFETIVO DISPONÍVEL',
                style: TextStyle(
                  color: AppColors.muted,
                  fontSize: 12,
                  fontFamily: 'Jura',
                  letterSpacing: 1,
                ),
              ),
              Text(
                '${presentPlayers.length} JOGADORES',
                style: const TextStyle(
                  color: AppColors.primary,
                  fontSize: 16,
                  fontFamily: 'Chakra Petch',
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          const Text(
            'JOGADORES POR TIME',
            style: TextStyle(
              color: AppColors.muted,
              fontSize: 12,
              fontFamily: 'Jura',
              letterSpacing: 1,
            ),
          ),
          Row(
            children: [
              Expanded(
                child: Slider(
                  value: _playersPerTeam.toDouble(),
                  min: 4,
                  max: 11,
                  divisions: 7,
                  activeColor: AppColors.secondary,
                  onChanged: (val) {
                    setState(() => _playersPerTeam = val.toInt());
                  },
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 8,
                ),
                decoration: BoxDecoration(
                  color: AppColors.background,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: AppColors.border),
                ),
                child: Text(
                  '$_playersPerTeam v $_playersPerTeam',
                  style: const TextStyle(
                    color: AppColors.foreground,
                    fontFamily: 'Chakra Petch',
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          SizedBox(
            width: double.infinity,
            height: 50,
            child: ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary.withValues(alpha: 0.1),
                foregroundColor: AppColors.primary,
                side: const BorderSide(color: AppColors.primary, width: 2),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              onPressed: () {
                _teamDrawBloc.add(
                  GenerateTeamsEvent(
                    availablePlayers: presentPlayers,
                    playersPerTeam: _playersPerTeam,
                  ),
                );
              },
              icon: const Icon(Icons.flash_on),
              label: const Text(
                'FORMAR TIMES',
                style: TextStyle(
                  fontFamily: 'Chakra Petch',
                  fontWeight: FontWeight.bold,
                  letterSpacing: 2,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  /// Estado vazio: exibido quando nenhum jogador está confirmado para o sorteio.
  Widget _buildNoPlayersState() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppColors.primary.withValues(alpha: 0.1),
                shape: BoxShape.circle,
                border: Border.all(
                  color: AppColors.primary.withValues(alpha: 0.3),
                ),
              ),
              child: const Icon(
                Icons.people_outline,
                size: 48,
                color: AppColors.primary,
              ),
            ),
            const SizedBox(height: 24),
            const Text(
              'NENHUM JOGADOR\nCONFIRMADO',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: AppColors.foreground,
                fontFamily: 'Chakra Petch',
                fontSize: 20,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.5,
              ),
            ),
            const SizedBox(height: 12),
            const Text(
              'Antes de sortear, confirme a presença dos jogadores na tela de Check-In.',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: AppColors.muted,
                fontFamily: 'Jura',
                fontSize: 13,
                height: 1.5,
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'Passo 1: Cadastrar  ·  Passo 2: Check-In  ·  Passo 3: Sortear',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: AppColors.muted,
                fontFamily: 'Jura',
                fontSize: 11,
              ),
            ),
            const SizedBox(height: 32),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  foregroundColor: AppColors.background,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                onPressed: () => Modular.to.pushNamed('/players/presence'),
                icon: const Icon(Icons.how_to_reg_outlined),
                label: const Text(
                  'IR PARA CHECK-IN',
                  style: TextStyle(
                    fontFamily: 'Chakra Petch',
                    fontWeight: FontWeight.bold,
                    letterSpacing: 2,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 12),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                style: OutlinedButton.styleFrom(
                  foregroundColor: AppColors.muted,
                  side: BorderSide(
                    color: AppColors.muted.withValues(alpha: 0.4),
                  ),
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                onPressed: () => Modular.to.pushNamed('/players/form'),
                icon: const Icon(Icons.person_add_outlined, size: 18),
                label: const Text(
                  'CADASTRAR JOGADORES',
                  style: TextStyle(
                    fontFamily: 'Chakra Petch',
                    fontSize: 12,
                    letterSpacing: 1.5,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildGeneratedTeams(List<List<Player>> teams) {
    return ListView.builder(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.all(20),
      itemCount: teams.length,
      itemBuilder: (context, index) {
        final team = teams[index];
        final totalRating = team.fold<double>(0.0, (sum, p) => sum + p.rating);
        final averageRating = (totalRating / team.length).toStringAsFixed(1);

        return Container(
          margin: const EdgeInsets.only(bottom: 20),
          decoration: BoxDecoration(
            color: AppColors.background,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: AppColors.primary.withValues(alpha: 0.5)),
            boxShadow: [
              BoxShadow(
                color: AppColors.primary.withValues(alpha: 0.1),
                blurRadius: 10,
                spreadRadius: 2,
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppColors.cardBackground,
                  borderRadius: const BorderRadius.only(
                    topLeft: Radius.circular(15),
                    topRight: Radius.circular(15),
                  ),
                  border: const Border(
                    bottom: BorderSide(color: AppColors.border),
                  ),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'TIME ${index + 1}',
                      style: const TextStyle(
                        color: AppColors.primary,
                        fontFamily: 'Chakra Petch',
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 4,
                      ),
                      decoration: BoxDecoration(
                        color: AppColors.secondary.withValues(alpha: 0.2),
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: Text(
                        'PWR $averageRating',
                        style: const TextStyle(
                          color: AppColors.secondary,
                          fontFamily: 'Chakra Petch',
                          fontWeight: FontWeight.bold,
                          fontSize: 12,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              ...team.map(
                (player) => Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 8,
                  ),
                  child: Row(
                    children: [
                      Icon(
                        player.selectedPositions.contains('GOL')
                            ? Icons.sports_handball
                            : Icons.sports_soccer,
                        size: 16,
                        color: player.selectedPositions.contains('GOL')
                            ? AppColors.accent
                            : AppColors.muted,
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Text(
                          player.nickname ?? player.name,
                          style: const TextStyle(
                            color: AppColors.foreground,
                            fontFamily: 'Jura',
                            fontSize: 14,
                          ),
                        ),
                      ),
                      Text(
                        '${player.rating} ★',
                        style: const TextStyle(
                          color: AppColors.secondary,
                          fontSize: 12,
                          fontFamily: 'Jura',
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 8),
            ],
          ),
        );
      },
    );
  }
}
