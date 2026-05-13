import 'package:flutter/material.dart';
import 'dart:async';
import 'package:flutter_modular/flutter_modular.dart';
import '../../../../core/theme/app_theme.dart';

class ScoreboardPage extends StatefulWidget {
  final String sportName;

  const ScoreboardPage({super.key, required this.sportName});

  @override
  State<ScoreboardPage> createState() => _ScoreboardPageState();
}

class _ScoreboardPageState extends State<ScoreboardPage> {
  String teamA = 'TIME A';
  String teamB = 'TIME B';
  int scoreA = 0;
  int scoreB = 0;

  // For Sets (Volleyball)
  int setsA = 0;
  int setsB = 0;

  // For Timer based (Football, Futsal, Basketball, Handball)
  bool isTimerBased = true;
  int currentPeriod = 1;
  int totalPeriods = 2; // 2 Halves default
  int timeRemainingSeconds = 0;
  Timer? _timer;
  bool isRunning = false;

  // Settings based on sport
  void _initializeBasedOnSport() {
    switch (widget.sportName.toUpperCase()) {
      case 'FUTEBOL DE CAMPO':
        isTimerBased = true;
        totalPeriods = 2;
        timeRemainingSeconds = 45 * 60;
        break;
      case 'FUTSAL':
        isTimerBased = true;
        totalPeriods = 2;
        timeRemainingSeconds = 20 * 60;
        break;
      case 'BASQUETEBOL':
        isTimerBased = true;
        totalPeriods = 4;
        timeRemainingSeconds = 10 * 60;
        break;
      case 'HANDBOL':
        isTimerBased = true;
        totalPeriods = 2;
        timeRemainingSeconds = 30 * 60;
        break;
      case 'VÔLEI':
        isTimerBased = false;
        totalPeriods = 5; // Up to 5 sets
        break;
      default:
        isTimerBased = true;
        totalPeriods = 2;
        timeRemainingSeconds = 10 * 60;
        break;
    }
  }

  @override
  void initState() {
    super.initState();
    _initializeBasedOnSport();
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _toggleTimer() {
    if (isRunning) {
      _timer?.cancel();
      setState(() {
        isRunning = false;
      });
    } else {
      if (timeRemainingSeconds > 0) {
        setState(() {
          isRunning = true;
        });
        _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
          if (timeRemainingSeconds > 0) {
            setState(() {
              timeRemainingSeconds--;
            });
          } else {
            _timer?.cancel();
            setState(() {
              isRunning = false;
            });
          }
        });
      }
    }
  }

  void _resetTimer() {
    _timer?.cancel();
    setState(() {
      isRunning = false;
      _initializeBasedOnSport();
    });
  }

  void _editTimer() {
    TextEditingController minutesController = TextEditingController(
      text: (timeRemainingSeconds ~/ 60).toString(),
    );
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.cardBackground,
        title: const Text(
          'Configurar Tempo',
          style: TextStyle(
            color: AppColors.primary,
            fontFamily: 'Chakra Petch',
          ),
        ),
        content: TextField(
          controller: minutesController,
          keyboardType: TextInputType.number,
          style: const TextStyle(color: AppColors.foreground),
          decoration: const InputDecoration(
            labelText: 'Minutos',
            labelStyle: TextStyle(color: AppColors.muted),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text(
              'Cancelar',
              style: TextStyle(color: AppColors.muted),
            ),
          ),
          TextButton(
            onPressed: () {
              int? newMinutes = int.tryParse(minutesController.text.trim());
              if (newMinutes != null && newMinutes >= 0) {
                setState(() {
                  timeRemainingSeconds = newMinutes * 60;
                  isRunning = false;
                  _timer?.cancel();
                });
                Navigator.pop(ctx);
              }
            },
            child: const Text(
              'Salvar',
              style: TextStyle(color: AppColors.primary),
            ),
          ),
        ],
      ),
    );
  }

  void _submitScore() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.cardBackground,
        title: const Text(
          'Enviar Resultado',
          style: TextStyle(
            color: AppColors.primary,
            fontFamily: 'Chakra Petch',
          ),
        ),
        content: const Text(
          'Deseja enviar este placar para o chaveamento ou tabelas de classificação?\n\nCaso já exista um envio deste confronto, ele será sobrescrito.',
          style: TextStyle(color: AppColors.foreground),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text(
              'Cancelar',
              style: TextStyle(color: AppColors.muted),
            ),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(ctx);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text(
                    'Resultado enviado para a mesa com sucesso!',
                    style: TextStyle(fontFamily: 'Jura'),
                  ),
                  backgroundColor: AppColors.secondary,
                ),
              );
            },
            child: const Text(
              'Enviar / Sobrescrever',
              style: TextStyle(
                color: AppColors.secondary,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }

  String _formatTime() {
    int minutes = timeRemainingSeconds ~/ 60;
    int seconds = timeRemainingSeconds % 60;
    return '${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}';
  }

  void _editTeamName(bool isTeamA) {
    TextEditingController controller = TextEditingController(
      text: isTeamA ? teamA : teamB,
    );
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.cardBackground,
        title: const Text(
          'Alterar Nome',
          style: TextStyle(
            color: AppColors.primary,
            fontFamily: 'Chakra Petch',
          ),
        ),
        content: TextField(
          controller: controller,
          style: const TextStyle(color: AppColors.foreground),
          decoration: const InputDecoration(
            labelText: 'Nome do Time',
            labelStyle: TextStyle(color: AppColors.muted),
          ),
          textCapitalization: TextCapitalization.characters,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text(
              'Cancelar',
              style: TextStyle(color: AppColors.muted),
            ),
          ),
          TextButton(
            onPressed: () {
              if (controller.text.trim().isNotEmpty) {
                setState(() {
                  if (isTeamA) {
                    teamA = controller.text.trim().toUpperCase();
                  } else {
                    teamB = controller.text.trim().toUpperCase();
                  }
                });
                Navigator.pop(ctx);
              }
            },
            child: const Text(
              'Salvar',
              style: TextStyle(color: AppColors.primary),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text(
          'PLACAR: ${widget.sportName.toUpperCase()}',
          style: const TextStyle(
            fontFamily: 'Chakra Petch',
            fontWeight: FontWeight.bold,
          ),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: AppColors.primary),
          onPressed: () => Modular.to.pop(),
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 20.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              // Central Information Area (Timer or Sets Info)
              _buildCentralInfo(),

              const SizedBox(height: 40),

              // Score Area
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  _buildTeamScoreSection(true),
                  const Text(
                    'x',
                    style: TextStyle(
                      fontSize: 40,
                      color: AppColors.muted,
                      fontFamily: 'Chakra Petch',
                    ),
                  ),
                  _buildTeamScoreSection(false),
                ],
              ),

              const Spacer(),

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
                  onPressed: _submitScore,
                  icon: const Icon(Icons.cloud_upload_outlined),
                  label: const Text(
                    'ENVIAR RESULTADO PARA CHAVES/TABELAS',
                    style: TextStyle(
                      fontFamily: 'Chakra Petch',
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 16),

              const Text(
                'Toque no nome do time para editá-lo',
                style: TextStyle(
                  color: AppColors.muted,
                  fontSize: 12,
                  fontFamily: 'Jura',
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCentralInfo() {
    if (isTimerBased) {
      return Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: AppColors.cardBackground.withValues(alpha: 0.5),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppColors.primary.withValues(alpha: 0.3)),
          boxShadow: [
            BoxShadow(
              color: AppColors.primary.withValues(alpha: 0.1),
              blurRadius: 10,
              spreadRadius: 2,
            ),
          ],
        ),
        child: Column(
          children: [
            Text(
              'PERÍODO $currentPeriod DE $totalPeriods',
              style: const TextStyle(
                fontFamily: 'Chakra Petch',
                color: AppColors.primary,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  _formatTime(),
                  style: const TextStyle(
                    fontFamily: 'Chakra Petch',
                    color: AppColors.foreground,
                    fontSize: 72,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 4,
                  ),
                ),
                IconButton(
                  onPressed: _editTimer,
                  icon: const Icon(
                    Icons.edit,
                    color: AppColors.muted,
                    size: 28,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton.icon(
                  onPressed: _toggleTimer,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: isRunning
                        ? AppColors.accent
                        : AppColors.secondary,
                    padding: const EdgeInsets.symmetric(
                      horizontal: 24,
                      vertical: 12,
                    ),
                  ),
                  icon: Icon(
                    isRunning ? Icons.pause : Icons.play_arrow,
                    color: AppColors.background,
                  ),
                  label: Text(
                    isRunning ? 'PAUSAR' : 'INICIAR',
                    style: const TextStyle(
                      color: AppColors.background,
                      fontFamily: 'Chakra Petch',
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                IconButton(
                  onPressed: _resetTimer,
                  tooltip: 'Resetar Tempo',
                  style: IconButton.styleFrom(
                    backgroundColor: AppColors.cardBackground,
                  ),
                  icon: const Icon(Icons.refresh, color: AppColors.muted),
                ),
              ],
            ),
          ],
        ),
      );
    } else {
      // Volleyball style Sets
      return Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: AppColors.cardBackground.withValues(alpha: 0.5),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppColors.secondary.withValues(alpha: 0.3)),
          boxShadow: [
            BoxShadow(
              color: AppColors.secondary.withValues(alpha: 0.1),
              blurRadius: 10,
              spreadRadius: 2,
            ),
          ],
        ),
        child: Column(
          children: [
            const Text(
              'SETS VENCIDOS',
              style: TextStyle(
                fontFamily: 'Chakra Petch',
                color: AppColors.secondary,
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Column(
                  children: [
                    Text(
                      teamA,
                      style: const TextStyle(
                        color: AppColors.muted,
                        fontSize: 12,
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                    Row(
                      children: [
                        IconButton(
                          onPressed: () => setState(() {
                            if (setsA > 0) setsA--;
                          }),
                          icon: const Icon(
                            Icons.remove,
                            color: AppColors.muted,
                          ),
                        ),
                        Text(
                          '$setsA',
                          style: const TextStyle(
                            fontFamily: 'Chakra Petch',
                            color: AppColors.foreground,
                            fontSize: 40,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        IconButton(
                          onPressed: () => setState(() {
                            if (setsA < totalPeriods) setsA++;
                          }),
                          icon: const Icon(
                            Icons.add,
                            color: AppColors.secondary,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                const Text(
                  'x',
                  style: TextStyle(
                    fontSize: 24,
                    color: AppColors.muted,
                    fontFamily: 'Chakra Petch',
                  ),
                ),
                Column(
                  children: [
                    Text(
                      teamB,
                      style: const TextStyle(
                        color: AppColors.muted,
                        fontSize: 12,
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                    Row(
                      children: [
                        IconButton(
                          onPressed: () => setState(() {
                            if (setsB > 0) setsB--;
                          }),
                          icon: const Icon(
                            Icons.remove,
                            color: AppColors.muted,
                          ),
                        ),
                        Text(
                          '$setsB',
                          style: const TextStyle(
                            fontFamily: 'Chakra Petch',
                            color: AppColors.foreground,
                            fontSize: 40,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        IconButton(
                          onPressed: () => setState(() {
                            if (setsB < totalPeriods) setsB++;
                          }),
                          icon: const Icon(
                            Icons.add,
                            color: AppColors.secondary,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      );
    }
  }

  Widget _buildTeamScoreSection(bool isTeamA) {
    return Column(
      children: [
        GestureDetector(
          onTap: () => _editTeamName(isTeamA),
          child: Container(
            width: 120,
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: AppColors.cardBackground,
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: AppColors.border),
            ),
            child: Text(
              isTeamA ? teamA : teamB,
              style: const TextStyle(
                fontFamily: 'Jura',
                fontSize: 14,
                fontWeight: FontWeight.bold,
                color: AppColors.foreground,
              ),
              textAlign: TextAlign.center,
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ),
        const SizedBox(height: 20),
        Container(
          width: 140,
          height: 180,
          decoration: BoxDecoration(
            color: AppColors.background,
            borderRadius: BorderRadius.circular(24),
            border: Border.all(color: AppColors.border, width: 2),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              IconButton(
                iconSize: 40,
                color: AppColors.primary,
                onPressed: () {
                  setState(() {
                    if (isTeamA) {
                      scoreA++;
                    } else {
                      scoreB++;
                    }
                  });
                },
                icon: const Icon(Icons.keyboard_arrow_up),
              ),
              Text(
                isTeamA ? '$scoreA' : '$scoreB',
                style: const TextStyle(
                  fontFamily: 'Chakra Petch',
                  fontSize: 60,
                  fontWeight: FontWeight.bold,
                  color: AppColors.foreground,
                ),
              ),
              IconButton(
                iconSize: 40,
                color: AppColors.muted,
                onPressed: () {
                  setState(() {
                    if (isTeamA) {
                      if (scoreA > 0) scoreA--;
                    } else {
                      if (scoreB > 0) scoreB--;
                    }
                  });
                },
                icon: const Icon(Icons.keyboard_arrow_down),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
