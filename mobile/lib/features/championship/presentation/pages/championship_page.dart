import 'package:flutter/material.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'package:lottie/lottie.dart';
import '../../../../core/theme/app_theme.dart';
import 'bracket_prototype_page.dart';
import 'groups_prototype_page.dart';

class ChampionshipPage extends StatefulWidget {
  const ChampionshipPage({super.key});

  @override
  State<ChampionshipPage> createState() => _ChampionshipPageState();
}

class _ChampionshipPageState extends State<ChampionshipPage> {
  final PageController _pageController = PageController(viewportFraction: 0.85);
  int _currentPage = 0;

  final List<Map<String, String>> _comingSoonFeatures = [
    {
      'title': 'NOVA ARENA',
      'description': 'Estamos preparando um simulador de torneios completo.',
      'asset': 'assets/lottie/Campeonato.json',
    },
    {
      'title': 'FUTEBOL DE CAMPO',
      'description':
          'Gestão completa, artilharia, cartões e estatísticas dos gramados.',
      'asset': 'assets/lottie/Futebol.json',
    },
    {
      'title': 'FUTSAL',
      'description': 'Controles dinâmicos de tempo e faltas para o salão.',
      'asset': 'assets/lottie/Futsal.json',
    },
    {
      'title': 'VÔLEI',
      'description': 'Sistema de pontuação por sets e controle de rodízio.',
      'asset': 'assets/lottie/Volleyball.json',
    },
    {
      'title': 'BASQUETEBOL',
      'description':
          'Controle de quartos, cronômetro central e sistema de faltas técnicas.',
      'asset': 'assets/lottie/Basketball.json',
    },
  ];

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'CAMPEONATOS',
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
      body: Column(
        children: [
          const SizedBox(height: 30),
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 20.0),
            child: Text(
              'MÓDULO RESTRITO',
              style: TextStyle(
                color: AppColors.accent,
                fontFamily: 'Chakra Petch',
                fontSize: 24,
                fontWeight: FontWeight.bold,
                letterSpacing: 2,
              ),
              textAlign: TextAlign.center,
            ),
          ),
          const SizedBox(height: 8),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 40.0),
            child: Text(
              'O simulador de torneios oficiais está sendo calibrado. Aguarde a liberação deste protocolo.',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: AppColors.muted.withValues(alpha: 0.8),
                fontFamily: 'Jura',
                fontSize: 14,
              ),
            ),
          ),
          const SizedBox(height: 20),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 40.0),
            child: SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary.withValues(alpha: 0.1),
                  foregroundColor: AppColors.primary,
                  side: const BorderSide(color: AppColors.primary),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) => const BracketPrototypePage(),
                    ),
                  );
                },
                child: const Text(
                  'TESTAR PROTÓTIPO DE CHAVES',
                  style: TextStyle(
                    fontFamily: 'Chakra Petch',
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(height: 10),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 40.0),
            child: SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.secondary.withValues(alpha: 0.1),
                  foregroundColor: AppColors.secondary,
                  side: const BorderSide(color: AppColors.secondary),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) => const GroupsPrototypePage(),
                    ),
                  );
                },
                child: const Text(
                  'TESTAR PROTÓTIPO FASE DE GRUPOS',
                  style: TextStyle(
                    fontFamily: 'Chakra Petch',
                    fontWeight: FontWeight.bold,
                    fontSize: 13,
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(height: 10),
          Expanded(
            child: PageView.builder(
              controller: _pageController,
              onPageChanged: (index) {
                setState(() {
                  _currentPage = index;
                });
              },
              physics: const BouncingScrollPhysics(),
              itemCount: _comingSoonFeatures.length,
              itemBuilder: (context, index) {
                final feature = _comingSoonFeatures[index];
                final bool active = index == _currentPage;
                final double margin = active ? 0 : 20.0;
                final double opacity = active ? 1.0 : 0.4;

                return AnimatedContainer(
                  duration: const Duration(milliseconds: 400),
                  curve: Curves.easeInOutCubic,
                  margin: EdgeInsets.only(
                    top: margin,
                    bottom: margin + 30, // For bottom spacing
                    right: 15,
                    left: 15,
                  ),
                  decoration: BoxDecoration(
                    color: AppColors.cardBackground,
                    borderRadius: BorderRadius.circular(24),
                    border: Border.all(
                      color: active
                          ? AppColors.primary
                          : AppColors.primary.withValues(alpha: 0.2),
                      width: active ? 2 : 1,
                    ),
                    boxShadow: active
                        ? [
                            BoxShadow(
                              color: AppColors.primary.withValues(alpha: 0.2),
                              blurRadius: 15,
                              spreadRadius: 2,
                              offset: const Offset(0, 5),
                            ),
                          ]
                        : [],
                  ),
                  child: Opacity(
                    opacity: opacity,
                    child: Padding(
                      padding: const EdgeInsets.all(24.0),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Expanded(
                            child: Lottie.asset(
                              feature['asset']!,
                              fit: BoxFit.contain,
                              errorBuilder: (context, error, stackTrace) {
                                return const Center(
                                  child: Icon(
                                    Icons.broken_image,
                                    size: 60,
                                    color: AppColors.muted,
                                  ),
                                );
                              },
                            ),
                          ),
                          const SizedBox(height: 24),
                          Text(
                            feature['title']!,
                            style: const TextStyle(
                              color: AppColors.primary,
                              fontFamily: 'Chakra Petch',
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              letterSpacing: 1.5,
                            ),
                            textAlign: TextAlign.center,
                          ),
                          const SizedBox(height: 12),
                          Text(
                            feature['description']!,
                            style: const TextStyle(
                              color: AppColors.foreground,
                              fontFamily: 'Jura',
                              fontSize: 14,
                              height: 1.4,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          // Page indicators
          Padding(
            padding: const EdgeInsets.only(bottom: 40.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(
                _comingSoonFeatures.length,
                (index) => AnimatedContainer(
                  duration: const Duration(milliseconds: 300),
                  margin: const EdgeInsets.symmetric(horizontal: 4),
                  height: 8,
                  width: _currentPage == index ? 24 : 8,
                  decoration: BoxDecoration(
                    color: _currentPage == index
                        ? AppColors.secondary
                        : AppColors.muted.withValues(alpha: 0.3),
                    borderRadius: BorderRadius.circular(4),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
