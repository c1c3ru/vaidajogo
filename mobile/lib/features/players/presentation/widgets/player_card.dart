import 'package:flutter/material.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../domain/models/player.dart';

class PlayerCard extends StatelessWidget {
  final Player player;
  final VoidCallback onTogglePresence;

  const PlayerCard({
    super.key,
    required this.player,
    required this.onTogglePresence,
  });

  @override
  Widget build(BuildContext context) {
    final borderColor = player.present ? AppColors.primary : AppColors.border;
    final shadowColor = player.present
        ? AppColors.primary.withOpacity(0.3)
        : Colors.transparent;

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: AppColors.cardBackground.withOpacity(0.8),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: borderColor, width: player.present ? 2 : 1),
        boxShadow: [
          BoxShadow(color: shadowColor, blurRadius: 10, spreadRadius: 1),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(12),
          onTap: onTogglePresence,
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              children: [
                // Cyber Avatar or initial
                Container(
                  width: 50,
                  height: 50,
                  decoration: BoxDecoration(
                    color: AppColors.background,
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: player.present
                          ? AppColors.primary
                          : AppColors.muted,
                      width: 2,
                    ),
                  ),
                  alignment: Alignment.center,
                  child: Text(
                    player.name.isNotEmpty ? player.name[0].toUpperCase() : '?',
                    style: TextStyle(
                      fontFamily: 'Chakra Petch',
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: player.present
                          ? AppColors.primary
                          : AppColors.muted,
                    ),
                  ),
                ),
                const SizedBox(width: 16),

                // Player Details
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        player.nickname ?? player.name,
                        style: const TextStyle(
                          fontFamily: 'Chakra Petch',
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: AppColors.foreground,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Classificação: ${player.rating} ★',
                        style: const TextStyle(
                          fontSize: 12,
                          color: AppColors.muted,
                          fontFamily: 'Jura',
                        ),
                      ),
                      const SizedBox(height: 2),
                      Wrap(
                        spacing: 4,
                        children: player.selectedPositions
                            .map(
                              (p) => Text(
                                p,
                                style: const TextStyle(
                                  fontSize: 10,
                                  color: AppColors.secondary,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            )
                            .toList(),
                      ),
                    ],
                  ),
                ),

                // Biometrics/Status Badge
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 6,
                  ),
                  decoration: BoxDecoration(
                    color: player.present
                        ? AppColors.primary.withOpacity(0.2)
                        : AppColors.muted.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(
                      color: player.present
                          ? AppColors.primary
                          : AppColors.muted.withOpacity(0.5),
                    ),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        player.present
                            ? Icons.check_circle
                            : Icons.radio_button_unchecked,
                        size: 14,
                        color: player.present
                            ? AppColors.primary
                            : AppColors.muted,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        player.present ? 'PRESENTE' : 'OFFLINE',
                        style: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                          fontFamily: 'Jura',
                          letterSpacing: 1,
                          color: player.present
                              ? AppColors.primary
                              : AppColors.muted,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
