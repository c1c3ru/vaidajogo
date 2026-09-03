import 'package:flutter/material.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../core/theme/app_theme.dart';

/// Banner de primeiro acesso exibido no topo do Dashboard.
/// Pode ser fechado pelo usuário; o estado é persistido em SharedPreferences.
class OnboardingWidget extends StatefulWidget {
  const OnboardingWidget({super.key});

  @override
  State<OnboardingWidget> createState() => _OnboardingWidgetState();
}

class _OnboardingWidgetState extends State<OnboardingWidget> {
  static const _prefKey = 'vaidajogo_onboarding_dismissed';
  bool _isDismissed = false;
  bool _isLoaded = false;

  final List<_OnboardingStep> _steps = [
    _OnboardingStep(
      number: '1',
      title: 'Cadastre',
      description: 'Adicione jogadores com posição e nível.',
      icon: Icons.person_add_outlined,
      color: AppColors.primary,
      route: '/players/form',
    ),
    _OnboardingStep(
      number: '2',
      title: 'Check-In',
      description: 'Confirme quem vai jogar hoje.',
      icon: Icons.how_to_reg_outlined,
      color: AppColors.secondary,
      route: '/players/presence',
    ),
    _OnboardingStep(
      number: '3',
      title: 'Sortear',
      description: 'Gere times equilibrados.',
      icon: Icons.shuffle_outlined,
      color: AppColors.accent,
      route: '/team-draw',
    ),
  ];

  @override
  void initState() {
    super.initState();
    _loadDismissState();
  }

  Future<void> _loadDismissState() async {
    final prefs = await SharedPreferences.getInstance();
    if (mounted) {
      setState(() {
        _isDismissed = prefs.getBool(_prefKey) ?? false;
        _isLoaded = true;
      });
    }
  }

  Future<void> _dismiss() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_prefKey, true);
    if (mounted) setState(() => _isDismissed = true);
  }

  Future<void> _reset() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_prefKey);
    if (mounted) setState(() => _isDismissed = false);
  }

  @override
  Widget build(BuildContext context) {
    if (!_isLoaded) return const SizedBox.shrink();

    if (_isDismissed) {
      return Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 4),
        child: GestureDetector(
          onTap: _reset,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              Icon(Icons.help_outline,
                  size: 14, color: AppColors.muted.withValues(alpha: 0.6)),
              const SizedBox(width: 4),
              Text(
                'Ver guia de início (3 passos)',
                style: TextStyle(
                  color: AppColors.muted.withValues(alpha: 0.6),
                  fontFamily: 'Jura',
                  fontSize: 11,
                ),
              ),
            ],
          ),
        ),
      );
    }

    return AnimatedOpacity(
      opacity: 1,
      duration: const Duration(milliseconds: 300),
      child: Container(
        margin: const EdgeInsets.fromLTRB(20, 0, 20, 20),
        decoration: BoxDecoration(
          color: AppColors.cardBackground,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: AppColors.primary.withValues(alpha: 0.3),
          ),
          boxShadow: [
            BoxShadow(
              color: AppColors.primary.withValues(alpha: 0.08),
              blurRadius: 20,
              spreadRadius: 2,
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 14, 8, 0),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(6),
                    decoration: BoxDecoration(
                      color: AppColors.primary.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(
                        color: AppColors.primary.withValues(alpha: 0.3),
                      ),
                    ),
                    child: const Icon(
                      Icons.bolt,
                      size: 16,
                      color: AppColors.primary,
                    ),
                  ),
                  const SizedBox(width: 10),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'COMO ORGANIZAR SUA PELADA',
                          style: TextStyle(
                            color: AppColors.foreground,
                            fontFamily: 'Chakra Petch',
                            fontWeight: FontWeight.bold,
                            fontSize: 12,
                            letterSpacing: 1,
                          ),
                        ),
                        Text(
                          'Siga estes 3 passos na primeira vez',
                          style: TextStyle(
                            color: AppColors.muted,
                            fontFamily: 'Jura',
                            fontSize: 11,
                          ),
                        ),
                      ],
                    ),
                  ),
                  IconButton(
                    onPressed: _dismiss,
                    icon: Icon(
                      Icons.close,
                      size: 18,
                      color: AppColors.muted.withValues(alpha: 0.7),
                    ),
                    tooltip: 'Fechar guia',
                  ),
                ],
              ),
            ),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 10),
              child: Divider(color: AppColors.border, height: 1),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(12, 0, 12, 16),
              child: Row(
                children: _steps.map((step) {
                  final isLast = _steps.last == step;
                  return Expanded(
                    child: Row(
                      children: [
                        Expanded(child: _buildStepCard(step)),
                        if (!isLast)
                          Icon(
                            Icons.arrow_forward_ios,
                            size: 10,
                            color: AppColors.muted.withValues(alpha: 0.4),
                          ),
                      ],
                    ),
                  );
                }).toList(),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStepCard(_OnboardingStep step) {
    return GestureDetector(
      onTap: () => Modular.to.pushNamed(step.route),
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 4),
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: AppColors.background,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: step.color.withValues(alpha: 0.25)),
        ),
        child: Column(
          children: [
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: step.color.withValues(alpha: 0.1),
                shape: BoxShape.circle,
                border: Border.all(color: step.color.withValues(alpha: 0.5)),
              ),
              child: Center(
                child: Text(
                  step.number,
                  style: TextStyle(
                    color: step.color,
                    fontFamily: 'Chakra Petch',
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 8),
            Icon(step.icon, size: 20, color: step.color),
            const SizedBox(height: 6),
            Text(
              step.title,
              style: TextStyle(
                color: step.color,
                fontFamily: 'Chakra Petch',
                fontWeight: FontWeight.bold,
                fontSize: 12,
                letterSpacing: 0.5,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              step.description,
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: AppColors.muted,
                fontFamily: 'Jura',
                fontSize: 10,
                height: 1.4,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _OnboardingStep {
  final String number;
  final String title;
  final String description;
  final IconData icon;
  final Color color;
  final String route;

  const _OnboardingStep({
    required this.number,
    required this.title,
    required this.description,
    required this.icon,
    required this.color,
    required this.route,
  });
}
