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

  void _showFeedback(String message, {bool isSuccess = true}) {
    ScaffoldMessenger.of(context).clearSnackBars();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(
              isSuccess ? Icons.check_circle : Icons.info_outline,
              color: Colors.white,
              size: 16,
            ),
            const SizedBox(width: 8),
            Text(
              message,
              style: const TextStyle(fontFamily: 'Jura', fontSize: 13),
            ),
          ],
        ),
        backgroundColor: isSuccess
            ? AppColors.primary.withValues(alpha: 0.9)
            : AppColors.muted.withValues(alpha: 0.85),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        duration: const Duration(seconds: 2),
        margin: const EdgeInsets.fromLTRB(16, 0, 16, 16),
      ),
    );
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
          final paidCount = players.where((p) => p.paid).length;

          return Column(
            children: [
              // Header de resumo com presença E pagamento
              Container(
                padding: const EdgeInsets.all(20),
                decoration: const BoxDecoration(
                  color: AppColors.cardBackground,
                  border: Border(bottom: BorderSide(color: AppColors.border)),
                ),
                child: Row(
                  children: [
                    // Coluna: presentes
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'PRESENTES',
                            style: TextStyle(
                              color: AppColors.muted,
                              fontSize: 11,
                              fontFamily: 'Jura',
                              letterSpacing: 1,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              Text(
                                '$presentCount',
                                style: const TextStyle(
                                  color: AppColors.primary,
                                  fontSize: 28,
                                  fontFamily: 'Chakra Petch',
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              Text(
                                ' / ${players.length}',
                                style: const TextStyle(
                                  color: AppColors.foreground,
                                  fontSize: 14,
                                  fontFamily: 'Jura',
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    // Coluna: pagos (entram no sorteio)
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'PAGOS (sorteio)',
                            style: TextStyle(
                              color: AppColors.muted,
                              fontSize: 11,
                              fontFamily: 'Jura',
                              letterSpacing: 1,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              Text(
                                '$paidCount',
                                style: const TextStyle(
                                  color: Color(0xFF4CAF50),
                                  fontSize: 28,
                                  fontFamily: 'Chakra Petch',
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              Text(
                                ' / ${players.length}',
                                style: const TextStyle(
                                  color: AppColors.foreground,
                                  fontSize: 14,
                                  fontFamily: 'Jura',
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    CircularProgressIndicator(
                      value: players.isEmpty ? 0 : presentCount / players.length,
                      backgroundColor: AppColors.background,
                      color: AppColors.primary,
                      strokeWidth: 6,
                    ),
                  ],
                ),
              ),

              // Legenda dos ícones
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
                color: AppColors.background,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Icon(Icons.fingerprint, size: 13,
                        color: AppColors.muted.withValues(alpha: 0.6)),
                    const SizedBox(width: 4),
                    Text('Presença',
                        style: TextStyle(
                            color: AppColors.muted.withValues(alpha: 0.6),
                            fontFamily: 'Jura',
                            fontSize: 11)),
                    const SizedBox(width: 16),
                    Icon(Icons.attach_money, size: 13,
                        color: const Color(0xFF4CAF50).withValues(alpha: 0.7)),
                    const SizedBox(width: 4),
                    Text('Pago (entra no sorteio)',
                        style: TextStyle(
                            color: AppColors.muted.withValues(alpha: 0.6),
                            fontFamily: 'Jura',
                            fontSize: 11)),
                  ],
                ),
              ),

              // Lista de jogadores
              Expanded(
                child: players.isEmpty
                    ? Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.group_off,
                                size: 48,
                                color: AppColors.muted.withValues(alpha: 0.4)),
                            const SizedBox(height: 16),
                            const Text(
                              'Nenhum jogador cadastrado',
                              style: TextStyle(
                                  color: AppColors.muted, fontFamily: 'Jura'),
                            ),
                            const SizedBox(height: 12),
                            OutlinedButton.icon(
                              onPressed: () =>
                                  Modular.to.pushNamed('/players/form'),
                              icon: const Icon(Icons.person_add_outlined,
                                  size: 16),
                              label: const Text(
                                'CADASTRAR JOGADORES',
                                style: TextStyle(
                                    fontFamily: 'Chakra Petch',
                                    fontSize: 12,
                                    letterSpacing: 1),
                              ),
                              style: OutlinedButton.styleFrom(
                                foregroundColor: AppColors.primary,
                                side: BorderSide(
                                    color:
                                        AppColors.primary.withValues(alpha: 0.5)),
                              ),
                            ),
                          ],
                        ),
                      )
                    : ListView.separated(
                        physics: const BouncingScrollPhysics(),
                        padding: const EdgeInsets.symmetric(vertical: 8),
                        itemCount: players.length,
                        separatorBuilder: (context, index) =>
                            const Divider(color: AppColors.border, height: 1),
                        itemBuilder: (context, index) {
                          final player = players[index];
                          return ListTile(
                            contentPadding: const EdgeInsets.symmetric(
                                horizontal: 16, vertical: 6),
                            // Ícone de presença (lado esquerdo)
                            leading: GestureDetector(
                              onTap: () {
                                _playerBloc
                                    .add(TogglePlayerPresenceEvent(player.id));
                                final nowPresent = !player.present;
                                _showFeedback(
                                  nowPresent
                                      ? '${player.nickname ?? player.name} confirmado!'
                                      : '${player.nickname ?? player.name} removido da lista',
                                  isSuccess: nowPresent,
                                );
                              },
                              child: Container(
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
                            ),
                            title: Text(
                              player.nickname ?? player.name,
                              style: TextStyle(
                                fontFamily: 'Chakra Petch',
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
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
                            // Ícone de pagamento (lado direito)
                            trailing: GestureDetector(
                              onTap: () {
                                _playerBloc
                                    .add(TogglePlayerPaidEvent(player.id));
                                final nowPaid = !player.paid;
                                _showFeedback(
                                  nowPaid
                                      ? '${player.nickname ?? player.name} — pago! Entra no sorteio 💚'
                                      : '${player.nickname ?? player.name} — pagamento removido',
                                  isSuccess: nowPaid,
                                );
                              },
                              child: Container(
                                padding: const EdgeInsets.all(8),
                                decoration: BoxDecoration(
                                  color: player.paid
                                      ? const Color(0xFF4CAF50)
                                          .withValues(alpha: 0.15)
                                      : Colors.transparent,
                                  borderRadius: BorderRadius.circular(8),
                                  border: Border.all(
                                    color: player.paid
                                        ? const Color(0xFF4CAF50)
                                            .withValues(alpha: 0.6)
                                        : AppColors.border,
                                  ),
                                ),
                                child: Icon(
                                  player.paid
                                      ? Icons.attach_money
                                      : Icons.money_off_outlined,
                                  size: 20,
                                  color: player.paid
                                      ? const Color(0xFF4CAF50)
                                      : AppColors.muted,
                                ),
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
