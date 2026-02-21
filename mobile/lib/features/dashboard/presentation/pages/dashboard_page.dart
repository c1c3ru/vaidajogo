import 'package:flutter/material.dart';
import 'package:flutter_modular/flutter_modular.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../shared/widgets/logo_widget.dart';

class DashboardPage extends StatefulWidget {
  const DashboardPage({super.key});

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage>
    with SingleTickerProviderStateMixin {
  final List<Map<String, dynamic>> menuItems = [
    {
      'title': 'Cadastro',
      'description': 'Inicialize o cadastro de novos jogadores no núcleo',
      'icon': Icons.person_add_outlined,
      'color': AppColors.primary,
      'route': '/player-form',
    },
    {
      'title': 'Jogadores',
      'description': 'Visualize dados biométricos de todos os jogadores',
      'icon': Icons.group_outlined,
      'color': AppColors.secondary,
      'route': '/players',
    },
    {
      'title': 'Presença',
      'description': 'Registre a assinatura térmica (presença) e pagamentos',
      'icon': Icons.check_circle_outline,
      'color': AppColors.accent,
      'route': '/presence',
    },
    {
      'title': 'Sorteio',
      'description': 'Algoritmo de balanceamento matricial de esquadrões',
      'icon': Icons.shuffle_outlined,
      'color': AppColors.primary,
      'route': '/team-draw',
    },
    {
      'title': 'Estatísticas',
      'description': 'Métricas preditivas avançadas do sistema',
      'icon': Icons.bar_chart_outlined,
      'color': AppColors.secondary,
      'route': '/statistics',
    },
    {
      'title': 'Campeonatos',
      'description': 'Supervisione simulações e torneios de combate virtual',
      'icon': Icons.emoji_events_outlined,
      'color': AppColors.accent,
      'route': '/championship',
    },
  ];

  late AnimationController _staggerController;

  @override
  void initState() {
    super.initState();
    _staggerController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    );
    _staggerController.forward();
  }

  @override
  void dispose() {
    _staggerController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Background Cyberpunk Elements (simplified for Flutter)
          Positioned(
            top: -100,
            right: -100,
            child: Container(
              width: 300,
              height: 300,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: AppColors.primary.withValues(alpha: 0.05),
                boxShadow: [
                  BoxShadow(
                    color: AppColors.primary.withValues(alpha: 0.1),
                    blurRadius: 100,
                    spreadRadius: 50,
                  ),
                ],
              ),
            ),
          ),
          SafeArea(
            child: CustomScrollView(
              physics: const BouncingScrollPhysics(),
              slivers: [
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(20, 40, 20, 30),
                    child: Column(
                      children: [
                        const LogoWidget(),
                        const SizedBox(height: 16),
                        Text(
                          'Acesso ao Mainframe Estratégico Autorizado. Seja bem-vindo ao Hub.',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            color: AppColors.muted,
                            fontSize: 14,
                            letterSpacing: 1.1,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                SliverPadding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  sliver: SliverGrid(
                    gridDelegate:
                        const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          crossAxisSpacing: 16,
                          mainAxisSpacing: 16,
                          childAspectRatio: 0.8,
                        ),
                    delegate: SliverChildBuilderDelegate((context, index) {
                      final item = menuItems[index];
                      final animation = Tween<double>(begin: 0, end: 1).animate(
                        CurvedAnimation(
                          parent: _staggerController,
                          curve: Interval(
                            index * 0.1,
                            1.0,
                            curve: Curves.easeOutCubic,
                          ),
                        ),
                      );
                      return _buildCyberCard(item, animation);
                    }, childCount: menuItems.length),
                  ),
                ),
                const SliverToBoxAdapter(child: SizedBox(height: 40)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCyberCard(
    Map<String, dynamic> item,
    Animation<double> animation,
  ) {
    final color = item['color'] as Color;
    return FadeTransition(
      opacity: animation,
      child: SlideTransition(
        position: Tween<Offset>(
          begin: const Offset(0, 0.2),
          end: Offset.zero,
        ).animate(animation),
        child: Container(
          decoration: BoxDecoration(
            color: AppColors.cardBackground.withValues(alpha: 0.6),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: color.withValues(alpha: 0.3), width: 1),
            boxShadow: [
              BoxShadow(
                color: color.withValues(alpha: 0.05),
                blurRadius: 15,
                spreadRadius: 2,
              ),
            ],
          ),
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              borderRadius: BorderRadius.circular(16),
              splashColor: color.withValues(alpha: 0.2),
              highlightColor: color.withValues(alpha: 0.1),
              onTap: () {
                Modular.to.pushNamed(item['route']);
              },
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: AppColors.background,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: color.withValues(alpha: 0.5)),
                        boxShadow: [
                          BoxShadow(
                            color: color.withValues(alpha: 0.2),
                            blurRadius: 8,
                          ),
                        ],
                      ),
                      child: Icon(item['icon'], color: color, size: 28),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      item['title'],
                      style: const TextStyle(
                        fontFamily: 'Chakra Petch',
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: AppColors.foreground,
                        letterSpacing: 1,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Expanded(
                      child: Text(
                        item['description'],
                        style: const TextStyle(
                          fontSize: 12,
                          color: AppColors.muted,
                          height: 1.4,
                        ),
                      ),
                    ),
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.symmetric(vertical: 8),
                      decoration: BoxDecoration(
                        border: Border.all(color: color.withValues(alpha: 0.3)),
                        borderRadius: BorderRadius.circular(4),
                      ),
                      alignment: Alignment.center,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.fingerprint, size: 14, color: color),
                          const SizedBox(width: 4),
                          Text(
                            'ACESSAR MÓDULO',
                            style: TextStyle(
                              color: color,
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                              letterSpacing: 1,
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
        ),
      ),
    );
  }
}
