import 'package:flutter/material.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'package:lottie/lottie.dart';
import 'package:uuid/uuid.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../domain/models/player.dart';
import '../bloc/player_bloc.dart';
import '../bloc/player_event.dart';

class PlayerFormPage extends StatefulWidget {
  final Player? playerToEdit;

  const PlayerFormPage({super.key, this.playerToEdit});

  @override
  State<PlayerFormPage> createState() => _PlayerFormPageState();
}

class _PlayerFormPageState extends State<PlayerFormPage> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _nicknameController = TextEditingController();
  final _birthDateController = TextEditingController();

  bool _isGuest = false;
  String? _sport;
  double _rating = 3.0;
  String _evaluationType = 'Estrelas (1 a 5)';

  bool _isConfigLocked = false;

  final Map<String, List<String>> _sportPositions = {
    'Futebol': ['GOL', 'ZAG', 'LAT', 'VOL', 'MEI', 'ATA'],
    'Futsal': ['GOL', 'FIX', 'ALA', 'PIV'],
    'Vôlei': ['LEV', 'PON', 'CEN', 'OPO', 'LIB'],
    'Handebol': ['GOL', 'PON', 'ARM', 'PIV', 'CEN'],
    'Basquetebol': ['ARM', 'ALA', 'PIV', 'ESC'],
  };

  final List<String> _evaluationTypes = [
    'Estrelas (1 a 5)',
    'Estrelas Fracionadas (1 a 5)',
    'Numérico (1 a 5)',
    'Numérico (1 a 10)',
  ];

  final List<String> _selectedPositions = [];

  final _playerBloc = Modular.get<PlayerBloc>();

  @override
  void initState() {
    super.initState();
    if (widget.playerToEdit != null) {
      _nameController.text = widget.playerToEdit!.name;
      _nicknameController.text = widget.playerToEdit!.nickname ?? '';
      _birthDateController.text = widget.playerToEdit!.birthDate ?? '';
      _isGuest = widget.playerToEdit!.isGuest;
      _sport = widget.playerToEdit!.sport;
      _rating = widget.playerToEdit!.rating;
      _evaluationType =
          widget.playerToEdit!.evaluationType ?? 'Estrelas (1 a 5)';
      _selectedPositions.addAll(widget.playerToEdit!.selectedPositions);
    } else {
      _loadSavedConfig();
    }
  }

  Future<void> _loadSavedConfig() async {
    final prefs = await SharedPreferences.getInstance();
    final savedSport = prefs.getString('locked_sport');
    final savedEval = prefs.getString('locked_evaluation');

    if (savedSport != null && savedEval != null) {
      if (mounted) {
        setState(() {
          _sport = savedSport;
          _evaluationType = savedEval;
          _isConfigLocked = true;
        });
      }
    }
  }

  Future<void> _resetConfig() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('locked_sport');
    await prefs.remove('locked_evaluation');
    if (mounted) {
      setState(() {
        _isConfigLocked = false;
        _sport = null;
        _evaluationType = 'Estrelas (1 a 5)';
        _selectedPositions.clear();
      });
    }
  }

  @override
  void dispose() {
    _nameController.dispose();
    _nicknameController.dispose();
    _birthDateController.dispose();
    super.dispose();
  }

  void _savePlayer() {
    if (_formKey.currentState!.validate()) {
      if (_sport == null) {
        _showError('Selecione uma modalidade esportiva.');
        return;
      }

      if (_selectedPositions.isEmpty) {
        _showError('Selecione ao menos uma posição tática.');
        return;
      }

      final player = Player(
        id: widget.playerToEdit?.id ?? const Uuid().v4(),
        name: _nameController.text.trim(),
        nickname: _nicknameController.text.trim().isEmpty
            ? null
            : _nicknameController.text.trim(),
        birthDate: _birthDateController.text.trim().isEmpty
            ? null
            : _birthDateController.text.trim(),
        isGuest: _isGuest,
        sport: _sport!,
        selectedPositions: _selectedPositions,
        rating: _rating,
        evaluationType: _evaluationType,
        includeInDraw: true,
        createdAt:
            widget.playerToEdit?.createdAt ?? DateTime.now().toIso8601String(),
        selected: widget.playerToEdit?.selected ?? false,
        present: widget.playerToEdit?.present ?? false,
        paid: widget.playerToEdit?.paid ?? false,
        registered: widget.playerToEdit?.registered ?? true,
      );

      if (widget.playerToEdit == null) {
        _playerBloc.add(AddPlayerEvent(player));

        // Registrar e amarrar configuração global para a sessão
        SharedPreferences.getInstance().then((prefs) {
          prefs.setString('locked_sport', _sport!);
          prefs.setString('locked_evaluation', _evaluationType);
        });
      } else {
        _playerBloc.add(UpdatePlayerEvent(player));
      }

      Modular.to.pop();
    }
  }

  void _showError(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message, style: const TextStyle(fontFamily: 'Jura')),
        backgroundColor: AppColors.accent,
      ),
    );
  }

  Color _getRatingColor() {
    if (_evaluationType.contains('10')) {
      if (_rating <= 4) return Colors.redAccent;
      if (_rating <= 8) return Colors.blueAccent;
      return Colors.greenAccent;
    } else if (_evaluationType.contains('Numérico')) {
      if (_rating <= 2) return Colors.redAccent;
      if (_rating <= 4) return Colors.blueAccent;
      return Colors.greenAccent;
    }
    return AppColors.secondary;
  }

  double _getRatingMin() => 1.0;
  double _getRatingMax() => _evaluationType.contains('10') ? 10.0 : 5.0;
  int _getRatingDivisions() {
    if (_evaluationType == 'Estrelas Fracionadas (1 a 5)') {
      return 8; // steps of 0.5 (1, 1.5, 2... 5) -> 8 divs
    }
    if (_evaluationType.contains('10')) {
      return 9; // steps of 1 -> 9 divs
    }
    return 4; // steps of 1 -> 4 divs
  }

  void _onEvaluationTypeChange(String? newValue) {
    if (newValue != null) {
      setState(() {
        _evaluationType = newValue;
        // Adjust rating if out of bounds
        if (_rating > _getRatingMax()) {
          _rating = _getRatingMax();
        }
        // Round to nearest acceptable step
        if (newValue != 'Estrelas Fracionadas (1 a 5)') {
          _rating = _rating.roundToDouble();
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          widget.playerToEdit == null ? 'CADASTRAR ATLETA' : 'ATUALIZAR ATLETA',
          style: const TextStyle(
            fontFamily: 'Chakra Petch',
            fontWeight: FontWeight.bold,
            letterSpacing: 1,
          ),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: AppColors.primary),
          onPressed: () => Modular.to.pop(),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        physics: const BouncingScrollPhysics(),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  _buildSectionTitle('MODALIDADE ESPORTIVA'),
                  if (_isConfigLocked && widget.playerToEdit == null)
                    TextButton.icon(
                      onPressed: _resetConfig,
                      icon: const Icon(
                        Icons.refresh,
                        color: AppColors.secondary,
                        size: 16,
                      ),
                      label: const Text(
                        'Resetar Regras',
                        style: TextStyle(
                          color: AppColors.secondary,
                          fontSize: 12,
                          fontFamily: 'Chakra Petch',
                        ),
                      ),
                    ),
                ],
              ),
              _buildSportChips(),
              const SizedBox(height: 30),

              if (_sport != null) ...[
                _buildSectionTitle('DADOS DO ATLETA'),
                _buildTextField(
                  _nameController,
                  "Nome Completo",
                  Icons.person_outline,
                ),
                const SizedBox(height: 16),
                _buildTextField(
                  _nicknameController,
                  "Apelido",
                  Icons.badge_outlined,
                  isRequired: false,
                ),
                const SizedBox(height: 16),
                _buildTextField(
                  _birthDateController,
                  "Data de Nascimento (Ex: 01/01/1990)",
                  Icons.calendar_today,
                  isRequired: false,
                ),
                const SizedBox(height: 16),

                SwitchListTile(
                  title: const Text(
                    'Visitante / Convidado',
                    style: TextStyle(
                      fontFamily: 'Jura',
                      color: AppColors.foreground,
                    ),
                  ),
                  subtitle: const Text(
                    'Obrigatório informar se é participante fixo',
                    style: TextStyle(fontSize: 12, color: AppColors.muted),
                  ),
                  value: _isGuest,
                  activeColor: AppColors.primary,
                  contentPadding: EdgeInsets.zero,
                  onChanged: (val) => setState(() => _isGuest = val),
                ),
                const SizedBox(height: 30),

                _buildSectionTitle('POSIÇÕES NO JOGO ($_sport)'),
                _buildPositionChips(),
                const SizedBox(height: 30),

                _buildSectionTitle('AVALIAÇÃO DO ATLETA'),
                _buildEvaluationDropdown(),
                const SizedBox(height: 16),
                _buildRatingSlider(),
                const SizedBox(height: 40),

                SizedBox(
                  width: double.infinity,
                  height: 55,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primary.withValues(alpha: 0.1),
                      foregroundColor: AppColors.primary,
                      side: const BorderSide(
                        color: AppColors.primary,
                        width: 2,
                      ),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                      elevation: 10,
                      shadowColor: AppColors.primary.withValues(alpha: 0.5),
                    ),
                    onPressed: _savePlayer,
                    child: const Text(
                      'SALVAR REGISTRO',
                      style: TextStyle(
                        fontFamily: 'Chakra Petch',
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 2,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 40),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.memory, color: AppColors.primary, size: 16),
          const SizedBox(width: 8),
          Text(
            title,
            style: const TextStyle(
              color: AppColors.primary,
              fontFamily: 'Jura',
              fontSize: 12,
              letterSpacing: 2,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(width: 8),
        ],
      ),
    );
  }

  Widget _buildSportChips() {
    final Map<String, String?> sportAssets = {
      'Futebol': 'assets/lottie/Futebol.json',
      'Futsal': 'assets/lottie/Futsal.json',
      'Vôlei': 'assets/lottie/Volleyball.json',
      'Handebol': 'assets/lottie/Handball.json',
      'Basquetebol': 'assets/lottie/Basketball.json',
    };

    return LayoutBuilder(
      builder: (context, constraints) {
        final cardWidth = (constraints.maxWidth - 16) / 2; // 2 items per row
        return Wrap(
          spacing: 16,
          runSpacing: 16,
          children: _sportPositions.keys.map((s) {
            final isSelected = _sport == s;
            return GestureDetector(
              onTap: _isConfigLocked
                  ? null
                  : () {
                      setState(() {
                        _sport = s;
                        _selectedPositions.clear();
                      });
                    },
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 300),
                width: cardWidth,
                height: 120,
                decoration: BoxDecoration(
                  color: AppColors.cardBackground,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: isSelected ? AppColors.primary : AppColors.border,
                    width: isSelected ? 2 : 1,
                  ),
                  boxShadow: isSelected
                      ? [
                          BoxShadow(
                            color: AppColors.primary.withValues(alpha: 0.3),
                            blurRadius: 10,
                            spreadRadius: 1,
                          ),
                        ]
                      : [],
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(16),
                  child: Stack(
                    children: [
                      if (sportAssets[s] != null) ...[
                        Positioned.fill(
                          child: Opacity(
                            opacity: isSelected ? 0.4 : 0.1,
                            child: Lottie.asset(
                              sportAssets[s]!,
                              fit: BoxFit.cover,
                              errorBuilder: (context, error, stackTrace) =>
                                  const Center(
                                    child: Icon(
                                      Icons.broken_image,
                                      color: AppColors.muted,
                                      size: 40,
                                    ),
                                  ),
                            ),
                          ),
                        ),
                      ] else ...[
                        Positioned.fill(
                          child: Opacity(
                            opacity: isSelected ? 0.3 : 0.1,
                            child: Icon(
                              s == 'Handebol'
                                  ? Icons.sports_handball
                                  : Icons.sports,
                              color: isSelected
                                  ? AppColors.primary
                                  : AppColors.muted,
                              size: 80,
                            ),
                          ),
                        ),
                      ],
                      Positioned(
                        bottom: 10,
                        left: 0,
                        right: 0,
                        child: Text(
                          s,
                          style: TextStyle(
                            fontFamily: 'Chakra Petch',
                            fontWeight: FontWeight.bold,
                            color: isSelected
                                ? AppColors.primary
                                : AppColors.foreground,
                            fontSize: 14,
                            shadows: [
                              Shadow(
                                color: Colors.black.withValues(alpha: 0.8),
                                blurRadius: 4,
                              ),
                            ],
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      if (isSelected && _isConfigLocked)
                        Positioned(
                          top: 8,
                          right: 8,
                          child: Icon(
                            Icons.lock,
                            size: 14,
                            color: AppColors.primary.withValues(alpha: 0.7),
                          ),
                        ),
                    ],
                  ),
                ),
              ),
            );
          }).toList(),
        );
      },
    );
  }

  Widget _buildPositionChips() {
    final available = _sportPositions[_sport] ?? [];
    return Wrap(
      spacing: 10,
      runSpacing: 10,
      children: available.map((pos) {
        final isSelected = _selectedPositions.contains(pos);
        return ChoiceChip(
          label: Text(
            pos,
            style: TextStyle(
              fontFamily: 'Chakra Petch',
              fontWeight: FontWeight.bold,
              color: isSelected ? AppColors.background : AppColors.foreground,
            ),
          ),
          selected: isSelected,
          selectedColor: AppColors.secondary,
          backgroundColor: AppColors.cardBackground,
          side: BorderSide(
            color: isSelected ? AppColors.secondary : AppColors.border,
          ),
          onSelected: (selected) {
            setState(() {
              if (selected) {
                _selectedPositions.add(pos);
              } else {
                _selectedPositions.remove(pos);
              }
            });
          },
        );
      }).toList(),
    );
  }

  Widget _buildEvaluationDropdown() {
    return DropdownButtonFormField<String>(
      value: _evaluationType,
      dropdownColor: AppColors.background,
      style: const TextStyle(color: AppColors.foreground, fontFamily: 'Jura'),
      decoration: InputDecoration(
        labelText: 'Tipo de Avaliação',
        labelStyle: const TextStyle(color: AppColors.muted, fontFamily: 'Jura'),
        prefixIcon: const Icon(
          Icons.analytics_outlined,
          color: AppColors.muted,
        ),
        filled: true,
        fillColor: AppColors.cardBackground.withValues(alpha: 0.5),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.border),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.primary, width: 2),
        ),
      ),
      items: _evaluationTypes.map((String value) {
        return DropdownMenuItem<String>(value: value, child: Text(value));
      }).toList(),
      onChanged: (_isConfigLocked && widget.playerToEdit == null)
          ? null
          : _onEvaluationTypeChange,
    );
  }

  Widget _buildRatingSlider() {
    final ratingColor = _getRatingColor();
    final isFractional = _evaluationType.contains('Fracionada');
    final valueDisplay = _evaluationType.contains('Estrelas')
        ? '${_rating.toStringAsFixed(isFractional ? 1 : 0)} ★'
        : 'NÍVEL: ${_rating.toInt()}';

    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Mínimo (\${_getRatingMin().toInt()})',
              style: const TextStyle(color: AppColors.muted, fontSize: 12),
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
              decoration: BoxDecoration(
                color: ratingColor.withValues(alpha: 0.2),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: ratingColor),
              ),
              child: Text(
                valueDisplay,
                style: TextStyle(
                  color: ratingColor,
                  fontFamily: 'Chakra Petch',
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                ),
              ),
            ),
            Text(
              'Máximo (\${_getRatingMax().toInt()})',
              style: const TextStyle(color: AppColors.muted, fontSize: 12),
            ),
          ],
        ),
        const SizedBox(height: 8),
        Slider(
          value: _rating,
          min: _getRatingMin(),
          max: _getRatingMax(),
          divisions: _getRatingDivisions(),
          activeColor: ratingColor,
          inactiveColor: AppColors.border,
          onChanged: (val) {
            setState(() => _rating = val);
          },
        ),
      ],
    );
  }

  Widget _buildTextField(
    TextEditingController controller,
    String label,
    IconData icon, {
    bool isRequired = true,
  }) {
    return TextFormField(
      controller: controller,
      style: const TextStyle(color: AppColors.foreground, fontFamily: 'Jura'),
      decoration: InputDecoration(
        labelText: label,
        labelStyle: const TextStyle(color: AppColors.muted, fontFamily: 'Jura'),
        prefixIcon: Icon(icon, color: AppColors.muted),
        filled: true,
        fillColor: AppColors.cardBackground.withValues(alpha: 0.5),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.border),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.primary, width: 2),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.accent),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.accent, width: 2),
        ),
      ),
      validator: isRequired
          ? (value) {
              if (value == null || value.trim().isEmpty) {
                return 'Campo obrigatório para o sistema.';
              }
              return null;
            }
          : null,
    );
  }
}
