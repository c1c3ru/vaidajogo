import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_modular/flutter_modular.dart';
import '../../../../core/theme/app_theme.dart';
import '../bloc/player_bloc.dart';
import '../bloc/player_event.dart';
import '../bloc/player_state.dart';

class PresencePage extends StatefulWidget {
  const PresencePage({super.key});

  @override
  State<PresencePage> createState() => _PresencePageState();
}

class _PresencePageState extends State<PresencePage> {
  final PlayerBloc _playerBloc = Modular.get<PlayerBloc>();

  @override
  void initState() {
    super.initState();
    _playerBloc.add(LoadPlayersEvent());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'CHECK-IN',
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
      body: BlocBuilder<PlayerBloc, PlayerState>(
        bloc: _playerBloc,
        builder: (context, state) {
          if (state is PlayerLoadingState && state.players.isEmpty) {
            return const Center(
              child: CircularProgressIndicator(color: AppColors.primary),
            );
          }

          final players = state.players;
          final presentCount = players.where((p) => p.present).length;

          return Column(
            children: [
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: AppColors.cardBackground,
                  border: const Border(
                    bottom: BorderSide(color: AppColors.border),
                  ),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'SITUAÇÃO DOS JOGADORES',
                          style: TextStyle(
                            color: AppColors.muted,
                            fontSize: 12,
                            fontFamily: 'Jura',
                            letterSpacing: 1,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Row(
                          children: [
                            Text(
                              '$presentCount',
                              style: const TextStyle(
                                color: AppColors.primary,
                                fontSize: 32,
                                fontFamily: 'Chakra Petch',
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Text(
                              ' / ${players.length} Ativos',
                              style: const TextStyle(
                                color: AppColors.foreground,
                                fontSize: 16,
                                fontFamily: 'Jura',
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                    CircularProgressIndicator(
                      value: players.isEmpty
                          ? 0
                          : presentCount / players.length,
                      backgroundColor: AppColors.background,
                      color: AppColors.primary,
                      strokeWidth: 8,
                    ),
                  ],
                ),
              ),
              Expanded(
                child: ListView.separated(
                  physics: const BouncingScrollPhysics(),
                  padding: const EdgeInsets.symmetric(vertical: 10),
                  itemCount: players.length,
                  separatorBuilder: (context, index) =>
                      const Divider(color: AppColors.border, height: 1),
                  itemBuilder: (context, index) {
                    final player = players[index];
                    return CheckboxListTile(
                      activeColor: AppColors.primary,
                      checkColor: AppColors.background,
                      side: const BorderSide(color: AppColors.muted),
                      title: Text(
                        player.nickname ?? player.name,
                        style: TextStyle(
                          fontFamily: 'Chakra Petch',
                          fontWeight: FontWeight.bold,
                          fontSize: 18,
                          color: player.present
                              ? AppColors.primary
                              : AppColors.foreground,
                        ),
                      ),
                      subtitle: Text(
                        player.selectedPositions.join(', '),
                        style: const TextStyle(
                          color: AppColors.muted,
                          fontSize: 12,
                          fontFamily: 'Jura',
                        ),
                      ),
                      value: player.present,
                      onChanged: (val) {
                        _playerBloc.add(TogglePlayerPresenceEvent(player.id));
                      },
                      secondary: Container(
                        width: 40,
                        height: 40,
                        decoration: BoxDecoration(
                          color: player.present
                              ? AppColors.primary.withValues(alpha: 0.1)
                              : Colors.transparent,
                          shape: BoxShape.circle,
                          border: Border.all(
                            color: player.present
                                ? AppColors.primary
                                : AppColors.border,
                          ),
                        ),
                        child: Icon(
                          player.present
                              ? Icons.fingerprint
                              : Icons.fingerprint_outlined,
                          color: player.present
                              ? AppColors.primary
                              : AppColors.muted,
                          size: 20,
                        ),
                      ),
                    );
                  },
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}
