import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_modular/flutter_modular.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../shared/widgets/logo_widget.dart';
import '../../../shared/widgets/onboarding_widget.dart';

class DashboardPage extends StatefulWidget {
  const DashboardPage({super.key});

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage>
    with SingleTickerProviderStateMixin {

  // Módulos essenciais: o fluxo principal que o usuário faz em toda pelada
  final List<Map<String, dynamic>> coreMenuItems = [
    {
      'title': 'Cadastro',
      'description': 'Cadastre novos jogadores com posição e nível',
      'icon': Icons.person_add_outlined,
      'color': AppColors.primary,
      'route': '/players/form',
    },
    {
      'title': 'Check-In',
      'description': 'Confirme presença e pagamentos do dia',
      'icon': Icons.how_to_reg_outlined,
      'color': AppColors.accent,
      'route': '/players/presence',
    },
    {
      'title': 'Sorteio',
      'description': 'Gere times equilibrados automaticamente',
      'icon': Icons.shuffle_outlined,
      'color': AppColors.primary,
      'route': '/team-draw',
    },
  ];

  // Módulos avançados: recursos complementares
  final List<Map<String, dynamic>> advancedMenuItems = [
    {
      'title': 'Jogadores',
      'description': 'Gerencie todos os atletas cadastrados',
      'icon': Icons.group_outlined,
      'color': AppColors.secondary,
      'route': '/players',
    },
    {
      'title': 'Estatísticas',
      'description': 'Métricas de frequência e desempenho',
      'icon': Icons.bar_chart_outlined,
      'color': AppColors.secondary,
      'route': '/statistics',
    },
    {
      'title': 'Campeonatos',
      'description': 'Controle de torneios e fases',
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
      duration: const Duration(milliseconds: 900),
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
          // Background Cyberpunk glow
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
                // Header / Logo
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(20, 40, 20, 24),
                    child: Column(
                      children: [
                        const LogoWidget(),
                        const SizedBox(height: 16),
                        Text(
                          'Seja bem-vindo ao VAIDAJOGO.',
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

                // Onboarding — banner dismissível de primeiro acesso
                const SliverToBoxAdapter(
                  child: OnboardingWidget(),
                ),

                // Seção: Módulos Essenciais
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(20, 8, 20, 12),
                    child: Row(
                      children: [
                        Container(
                          width: 20,
                          height: 1,
                          color: AppColors.primary.withValues(alpha: 0.5),
                        ),
                        const SizedBox(width: 8),
                        Text(
                          'MÓDULOS ESSENCIAIS',
                          style: TextStyle(
                            color: AppColors.muted,
                            fontSize: 11,
                            fontFamily: 'Jura',
                            letterSpacing: 1.5,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Container(
                            height: 1,
                            color: AppColors.primary.withValues(alpha: 0.2),
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
                          childAspectRatio: 0.82,
                        ),
                    delegate: SliverChildBuilderDelegate(
                      (context, index) {
                        final item = coreMenuItems[index];
                        final animation = Tween<double>(begin: 0, end: 1).animate(
                          CurvedAnimation(
                            parent: _staggerController,
                            curve: Interval(
                              index * 0.12,
                              1.0,
                              curve: Curves.easeOutCubic,
                            ),
                          ),
                        );
                        return _buildCyberCard(item, animation, isCore: true);
                      },
                      childCount: coreMenuItems.length,
                    ),
                  ),
                ),

                // Seção: Recursos Avançados
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(20, 28, 20, 12),
                    child: Row(
                      children: [
                        Container(
                          width: 20,
                          height: 1,
                          color: AppColors.secondary.withValues(alpha: 0.4),
                        ),
                        const SizedBox(width: 8),
                        Text(
                          'RECURSOS AVANÇADOS',
                          style: TextStyle(
                            color: AppColors.muted,
                            fontSize: 11,
                            fontFamily: 'Jura',
                            letterSpacing: 1.5,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Container(
                            height: 1,
                            color: AppColors.secondary.withValues(alpha: 0.15),
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
                          crossAxisCount: 3,
                          crossAxisSpacing: 12,
                          mainAxisSpacing: 12,
                          childAspectRatio: 0.75,
                        ),
                    delegate: SliverChildBuilderDelegate(
                      (context, index) {
                        final item = advancedMenuItems[index];
                        final animation = Tween<double>(begin: 0, end: 1).animate(
                          CurvedAnimation(
                            parent: _staggerController,
                            curve: Interval(
                              0.3 + index * 0.1,
                              1.0,
                              curve: Curves.easeOutCubic,
                            ),
                          ),
                        );
                        return _buildCyberCard(item, animation, isCore: false);
                      },
                      childCount: advancedMenuItems.length,
                    ),
                  ),
                ),

                // PIX — rodapé, após o usuário já ver o valor do app
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(20, 32, 20, 40),
                    child: _buildPixCard(context),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCyberCard(
    Map<String, dynamic> item,
    Animation<double> animation, {
    required bool isCore,
  }) {
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
            color: isCore
                ? AppColors.cardBackground.withValues(alpha: 0.7)
                : AppColors.cardBackground.withValues(alpha: 0.45),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: color.withValues(alpha: isCore ? 0.3 : 0.15),
              width: 1,
            ),
            boxShadow: [
              BoxShadow(
                color: color.withValues(alpha: isCore ? 0.06 : 0.02),
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
              onTap: () => Modular.to.pushNamed(item['route']),
              child: Padding(
                padding: EdgeInsets.all(isCore ? 16.0 : 12.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      padding: EdgeInsets.all(isCore ? 10 : 8),
                      decoration: BoxDecoration(
                        color: AppColors.background,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: color.withValues(alpha: isCore ? 0.5 : 0.3),
                        ),
                        boxShadow: [
                          BoxShadow(
                            color: color.withValues(alpha: isCore ? 0.2 : 0.1),
                            blurRadius: 8,
                          ),
                        ],
                      ),
                      child: Icon(
                        item['icon'],
                        color: color.withValues(alpha: isCore ? 1.0 : 0.7),
                        size: isCore ? 26 : 20,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      item['title'],
                      style: TextStyle(
                        fontFamily: 'Chakra Petch',
                        fontSize: isCore ? 16 : 13,
                        fontWeight: FontWeight.bold,
                        color: isCore
                            ? AppColors.foreground
                            : AppColors.foreground.withValues(alpha: 0.75),
                        letterSpacing: 0.8,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Expanded(
                      child: Text(
                        item['description'],
                        style: TextStyle(
                          fontSize: isCore ? 11 : 10,
                          color: AppColors.muted,
                          height: 1.4,
                        ),
                      ),
                    ),
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.symmetric(vertical: 6),
                      decoration: BoxDecoration(
                        border: Border.all(
                          color: color.withValues(alpha: isCore ? 0.3 : 0.15),
                        ),
                        borderRadius: BorderRadius.circular(4),
                      ),
                      alignment: Alignment.center,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.fingerprint,
                              size: isCore ? 13 : 11, color: color),
                          const SizedBox(width: 4),
                          Text(
                            'ACESSAR',
                            style: TextStyle(
                              color: color.withValues(alpha: isCore ? 1.0 : 0.7),
                              fontSize: isCore ? 9 : 8,
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

  void _copiarPix(BuildContext context) {
    Clipboard.setData(
        const ClipboardData(text: 'ed6bc858-5f8b-466d-b212-d0f59b583238'));
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Row(
          children: [
            Icon(Icons.check_circle, color: Colors.white, size: 18),
            SizedBox(width: 8),
            Text('Chave Pix copiada! 💚'),
          ],
        ),
        backgroundColor: const Color(0xFF2E7D32),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  Widget _buildPixCard(BuildContext context) {
    return Opacity(
      opacity: 0.75,
      child: Container(
        decoration: BoxDecoration(
          color: AppColors.cardBackground.withValues(alpha: 0.4),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
              color: Colors.green.withValues(alpha: 0.2), width: 1),
        ),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            borderRadius: BorderRadius.circular(12),
            splashColor: Colors.green.withValues(alpha: 0.15),
            onTap: () => _copiarPix(context),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Colors.green.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(10),
                      border:
                          Border.all(color: Colors.green.withValues(alpha: 0.2)),
                    ),
                    child: const Text('💚', style: TextStyle(fontSize: 18)),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Apoie o Projeto',
                          style: TextStyle(
                            fontFamily: 'Chakra Petch',
                            color: AppColors.foreground,
                            fontWeight: FontWeight.bold,
                            fontSize: 13,
                            letterSpacing: 0.5,
                          ),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          'ed6bc858-5f8b-466d-b212-d0f59b583238',
                          style: TextStyle(
                            color: Colors.green.shade400,
                            fontSize: 10,
                            fontFamily: 'monospace',
                            letterSpacing: 0.5,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                        Text(
                          '👆 Toque para copiar a chave PIX',
                          style: TextStyle(
                            color: AppColors.muted,
                            fontSize: 10,
                            fontStyle: FontStyle.italic,
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
    );
  }
}
