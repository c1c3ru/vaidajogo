import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'package:uuid/uuid.dart';
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

  bool _isGuest = false;
  String _sport = 'Futebol';
  int _rating = 5;

  final List<String> _availablePositions = [
    'GOL',
    'ZAG',
    'LAT',
    'VOL',
    'MEI',
    'ATA',
  ];
  final List<String> _selectedPositions = [];

  final _playerBloc = Modular.get<PlayerBloc>();

  @override
  void initState() {
    super.initState();
    if (widget.playerToEdit != null) {
      _nameController.text = widget.playerToEdit!.name;
      _nicknameController.text = widget.playerToEdit!.nickname ?? '';
      _isGuest = widget.playerToEdit!.isGuest;
      _sport = widget.playerToEdit!.sport;
      _rating = widget.playerToEdit!.rating;
      _selectedPositions.addAll(widget.playerToEdit!.selectedPositions);
    }
  }

  @override
  void dispose() {
    _nameController.dispose();
    _nicknameController.dispose();
    super.dispose();
  }

  void _savePlayer() {
    if (_formKey.currentState!.validate()) {
      if (_selectedPositions.isEmpty) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text(
              'Selecione ao menos uma posição tática.',
              style: TextStyle(fontFamily: 'Jura'),
            ),
            backgroundColor: AppColors.accent,
          ),
        );
        return;
      }

      final player = Player(
        id: widget.playerToEdit?.id ?? const Uuid().v4(),
        name: _nameController.text,
        nickname: _nicknameController.text.isEmpty
            ? null
            : _nicknameController.text,
        isGuest: _isGuest,
        sport: _sport,
        selectedPositions: _selectedPositions,
        rating: _rating,
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
      } else {
        _playerBloc.add(UpdatePlayerEvent(player));
      }

      Modular.to.pop();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          widget.playerToEdit == null
              ? 'CADASTRAR OPERADOR'
              : 'ATUALIZAR OPERADOR',
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
              _buildSectionTitle('DADOS BIOMÉTRICOS'),
              _buildTextField(
                _nameController,
                "Nome Completo",
                Icons.person_outline,
              ),
              const SizedBox(height: 16),
              _buildTextField(
                _nicknameController,
                "Codinome (Opcional)",
                Icons.badge_outlined,
                isRequired: false,
              ),
              const SizedBox(height: 24),

              _buildSectionTitle('ESPECIFICAÇÕES TÁTICAS'),
              _buildDropdown(),
              const SizedBox(height: 24),

              const Text(
                'POSIÇÕES DE COMBATE',
                style: TextStyle(
                  color: AppColors.muted,
                  fontFamily: 'Jura',
                  fontSize: 12,
                  letterSpacing: 1,
                ),
              ),
              const SizedBox(height: 12),
              Wrap(
                spacing: 10,
                runSpacing: 10,
                children: _availablePositions.map((pos) {
                  final isSelected = _selectedPositions.contains(pos);
                  return ChoiceChip(
                    label: Text(
                      pos,
                      style: TextStyle(
                        fontFamily: 'Chakra Petch',
                        fontWeight: FontWeight.bold,
                        color: isSelected
                            ? AppColors.background
                            : AppColors.foreground,
                      ),
                    ),
                    selected: isSelected,
                    selectedColor: AppColors.primary,
                    backgroundColor: AppColors.cardBackground,
                    side: BorderSide(
                      color: isSelected ? AppColors.primary : AppColors.border,
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
              ),
              const SizedBox(height: 30),

              _buildSectionTitle('NÍVEL DE AMEAÇA / RATING: $_rating ★'),
              Slider(
                value: _rating.toDouble(),
                min: 1,
                max: 10,
                divisions: 9,
                activeColor: AppColors.secondary,
                inactiveColor: AppColors.border,
                label: _rating.toString(),
                onChanged: (val) {
                  setState(() => _rating = val.toInt());
                },
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
                  'Operador temporário sem registro fixo',
                  style: TextStyle(fontSize: 12, color: AppColors.muted),
                ),
                value: _isGuest,
                activeColor: AppColors.primary,
                contentPadding: EdgeInsets.zero,
                onChanged: (val) => setState(() => _isGuest = val),
              ),
              const SizedBox(height: 40),

              SizedBox(
                width: double.infinity,
                height: 55,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primary.withOpacity(0.1),
                    foregroundColor: AppColors.primary,
                    side: const BorderSide(color: AppColors.primary, width: 2),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    elevation: 10,
                    shadowColor: AppColors.primary.withOpacity(0.5),
                  ),
                  onPressed: _savePlayer,
                  child: const Text(
                    'INICIALIZAR REGISTRO',
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
          ),
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Row(
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
          Expanded(
            child: Container(
              height: 1,
              color: AppColors.primary.withOpacity(0.2),
            ),
          ),
        ],
      ),
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
        fillColor: AppColors.cardBackground.withOpacity(0.5),
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
              if (value == null || value.trim().isEmpty)
                return 'Campo obrigatório para o sistema.';
              return null;
            }
          : null,
    );
  }

  Widget _buildDropdown() {
    return DropdownButtonFormField<String>(
      value: _sport,
      dropdownColor: AppColors.background,
      style: const TextStyle(color: AppColors.foreground, fontFamily: 'Jura'),
      decoration: InputDecoration(
        labelText: 'Modalidade',
        labelStyle: const TextStyle(color: AppColors.muted, fontFamily: 'Jura'),
        prefixIcon: const Icon(Icons.sports_soccer, color: AppColors.muted),
        filled: true,
        fillColor: AppColors.cardBackground.withOpacity(0.5),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.border),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.primary, width: 2),
        ),
      ),
      items: ['Futebol', 'Futsal', 'Society'].map((String value) {
        return DropdownMenuItem<String>(value: value, child: Text(value));
      }).toList(),
      onChanged: (newValue) {
        setState(() {
          _sport = newValue!;
        });
      },
    );
  }
}
