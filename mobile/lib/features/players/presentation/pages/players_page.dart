import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_modular/flutter_modular.dart';
import '../../../../core/theme/app_theme.dart';
import '../bloc/player_bloc.dart';
import '../bloc/player_event.dart';
import '../bloc/player_state.dart';
import '../widgets/player_card.dart';

class PlayersPage extends StatefulWidget {
  const PlayersPage({super.key});

  @override
  State<PlayersPage> createState() => _PlayersPageState();
}

class _PlayersPageState extends State<PlayersPage> {
  final PlayerBloc _playerBloc = Modular.get<PlayerBloc>();

  @override
  void initState() {
    super.initState();
    // Dispara carregamento assim que a tela abre
    _playerBloc.add(LoadPlayersEvent());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'JOGADORES',
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
        actions: [
          IconButton(
            icon: const Icon(Icons.person_add, color: AppColors.secondary),
            onPressed: () {
              Modular.to.pushNamed('/players/form');
            },
          ),
        ],
      ),
      body: BlocBuilder<PlayerBloc, PlayerState>(
        bloc: _playerBloc,
        builder: (context, state) {
          if (state is PlayerLoadingState && state.players.isEmpty) {
            return const Center(
              child: CircularProgressIndicator(color: AppColors.primary),
            );
          }

          if (state is PlayerErrorState) {
            return Center(
              child: Text(
                'Falha Crítica no app:\n${state.message}',
                textAlign: TextAlign.center,
                style: const TextStyle(
                  color: AppColors.accent,
                  fontFamily: 'Chakra Petch',
                ),
              ),
            );
          }

          final players = state.players;

          // Exibe os jogadores se a base estiver populada
          if (players.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.person_off_outlined,
                    size: 60,
                    color: AppColors.muted.withValues(alpha: 0.5),
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Nenhum registro encontrado.',
                    style: TextStyle(
                      color: AppColors.muted,
                      fontFamily: 'Jura',
                    ),
                  ),
                ],
              ),
            );
          }

          return ListView.builder(
            padding: const EdgeInsets.all(20),
            physics: const BouncingScrollPhysics(),
            itemCount: players.length,
            itemBuilder: (context, index) {
              final player = players[index];
              return PlayerCard(
                player: player,
                onTogglePresence: () {
                  _playerBloc.add(TogglePlayerPresenceEvent(player.id));
                },
              );
            },
          );
        },
      ),
    );
  }
}
