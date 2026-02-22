import 'package:flutter/material.dart';
import '../../../../core/theme/app_theme.dart';
import 'package:flutter_modular/flutter_modular.dart';

class TeamInfo {
  String name;
  String code;

  TeamInfo({required this.name, required this.code});
}

class GroupInfo {
  String name;
  List<TeamInfo> teams;

  GroupInfo({required this.name, required this.teams});
}

class GroupsPrototypePage extends StatefulWidget {
  const GroupsPrototypePage({super.key});

  @override
  State<GroupsPrototypePage> createState() => _GroupsPrototypePageState();
}

class _GroupsPrototypePageState extends State<GroupsPrototypePage> {
  late List<GroupInfo> _groups;

  @override
  void initState() {
    super.initState();
    _groups = [];
  }

  void _addGroup() {
    TextEditingController nameController = TextEditingController();
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.cardBackground,
        title: const Text(
          'Novo Grupo',
          style: TextStyle(
            color: AppColors.primary,
            fontFamily: 'Chakra Petch',
          ),
        ),
        content: TextField(
          controller: nameController,
          style: const TextStyle(color: AppColors.foreground),
          decoration: const InputDecoration(
            labelText: 'Nome do Grupo (ex: GRUPO A)',
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
              if (nameController.text.trim().isNotEmpty) {
                setState(() {
                  _groups.add(
                    GroupInfo(
                      name: nameController.text.trim().toUpperCase(),
                      teams: [],
                    ),
                  );
                });
                Navigator.pop(ctx);
              }
            },
            child: const Text(
              'Criar',
              style: TextStyle(color: AppColors.primary),
            ),
          ),
        ],
      ),
    );
  }

  void _editGroupTerm(int groupIndex) {
    TextEditingController nameController = TextEditingController(
      text: _groups[groupIndex].name,
    );
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.cardBackground,
        title: const Text(
          'Editar Grupo',
          style: TextStyle(
            color: AppColors.primary,
            fontFamily: 'Chakra Petch',
          ),
        ),
        content: TextField(
          controller: nameController,
          style: const TextStyle(color: AppColors.foreground),
          decoration: const InputDecoration(
            labelText: 'Nome do Grupo',
            labelStyle: TextStyle(color: AppColors.muted),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () {
              setState(() {
                _groups.removeAt(groupIndex);
              });
              Navigator.pop(ctx);
            },
            child: const Text(
              'Excluir Grupo',
              style: TextStyle(color: Colors.red),
            ),
          ),
          TextButton(
            onPressed: () {
              if (nameController.text.trim().isNotEmpty) {
                setState(() {
                  _groups[groupIndex].name = nameController.text
                      .trim()
                      .toUpperCase();
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

  void _addOrEditTeam(int groupIndex, {int? teamIndex}) {
    bool isEditing = teamIndex != null;
    TextEditingController nameController = TextEditingController(
      text: isEditing ? _groups[groupIndex].teams[teamIndex].name : '',
    );
    TextEditingController codeController = TextEditingController(
      text: isEditing ? _groups[groupIndex].teams[teamIndex].code : '',
    );

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.cardBackground,
        title: Text(
          isEditing ? 'Editar Time' : 'Adicionar Time',
          style: const TextStyle(
            color: AppColors.primary,
            fontFamily: 'Chakra Petch',
          ),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: nameController,
              style: const TextStyle(color: AppColors.foreground),
              decoration: const InputDecoration(
                labelText: 'Nome do Time',
                labelStyle: TextStyle(color: AppColors.muted),
              ),
              onChanged: (val) {
                if (!isEditing ||
                    codeController.text.isEmpty ||
                    codeController.text.length <= 3) {
                  if (val.length >= 3) {
                    codeController.text = val.substring(0, 3).toUpperCase();
                  } else {
                    codeController.text = val.toUpperCase();
                  }
                }
              },
            ),
            const SizedBox(height: 10),
            TextField(
              controller: codeController,
              style: const TextStyle(color: AppColors.foreground),
              maxLength: 3,
              decoration: const InputDecoration(
                labelText: 'Sigla (Abreviação)',
                labelStyle: TextStyle(color: AppColors.muted),
              ),
            ),
          ],
        ),
        actions: [
          if (isEditing)
            TextButton(
              onPressed: () {
                setState(() {
                  _groups[groupIndex].teams.removeAt(teamIndex);
                });
                Navigator.pop(ctx);
              },
              child: const Text('Excluir', style: TextStyle(color: Colors.red)),
            ),
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text(
              'Cancelar',
              style: TextStyle(color: AppColors.muted),
            ),
          ),
          TextButton(
            onPressed: () {
              if (nameController.text.trim().isNotEmpty) {
                setState(() {
                  final newTeam = TeamInfo(
                    name: nameController.text.trim(),
                    code: codeController.text.trim().toUpperCase(),
                  );
                  if (isEditing) {
                    _groups[groupIndex].teams[teamIndex] = newTeam;
                  } else {
                    _groups[groupIndex].teams.add(newTeam);
                  }
                });
                Navigator.pop(ctx);
              }
            },
            child: Text(
              isEditing ? 'Salvar' : 'Adicionar',
              style: const TextStyle(color: AppColors.primary),
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
        title: const Text(
          'FASE DE GRUPOS',
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
      body: CustomScrollView(
        physics: const BouncingScrollPhysics(),
        slivers: [
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                children: [
                  const Icon(
                    Icons.emoji_events,
                    size: 80,
                    color: AppColors.secondary,
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'CAMPEONATO OFICIAL',
                    style: TextStyle(
                      color: AppColors.foreground,
                      fontFamily: 'Chakra Petch',
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 2,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Monte seus grupos personalizados',
                    style: TextStyle(
                      color: AppColors.muted.withValues(alpha: 0.8),
                      fontFamily: 'Jura',
                      fontSize: 14,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  if (_groups.isEmpty) ...[
                    const SizedBox(height: 40),
                    const Center(
                      child: Text(
                        'Nenhum grupo criado. Clique em [+] para iniciar.',
                        style: TextStyle(
                          color: AppColors.muted,
                          fontFamily: 'Jura',
                          fontSize: 16,
                        ),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
          SliverPadding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            sliver: SliverGrid(
              gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
                maxCrossAxisExtent: 350,
                mainAxisExtent: 320,
                mainAxisSpacing: 16,
                crossAxisSpacing: 16,
              ),
              delegate: SliverChildBuilderDelegate((context, index) {
                return _buildGroupCard(_groups[index], index);
              }, childCount: _groups.length),
            ),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 80)),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _addGroup,
        backgroundColor: AppColors.secondary,
        child: const Icon(Icons.add, color: AppColors.background),
      ),
    );
  }

  Widget _buildGroupCard(GroupInfo group, int groupIndex) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.cardBackground.withValues(alpha: 0.8),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.primary.withValues(alpha: 0.3)),
        boxShadow: [
          BoxShadow(
            color: AppColors.primary.withValues(alpha: 0.05),
            blurRadius: 10,
            spreadRadius: 1,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // CABEÇALHO DO GRUPO
          GestureDetector(
            onTap: () => _editGroupTerm(groupIndex),
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 14),
              decoration: BoxDecoration(
                color: AppColors.primary.withValues(alpha: 0.15),
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(15),
                  topRight: Radius.circular(15),
                ),
                border: const Border(
                  bottom: BorderSide(color: AppColors.primary, width: 2),
                ),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    group.name,
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      color: AppColors.primary,
                      fontFamily: 'Chakra Petch',
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 2,
                    ),
                  ),
                  const SizedBox(width: 8),
                  const Icon(Icons.edit, size: 14, color: AppColors.primary),
                ],
              ),
            ),
          ),
          // LINHAS DAS EQUIPES
          Expanded(
            child: group.teams.isEmpty
                ? const Center(
                    child: Text(
                      'Nenhum time',
                      style: TextStyle(
                        color: AppColors.muted,
                        fontSize: 12,
                        fontFamily: 'Jura',
                      ),
                    ),
                  )
                : ListView.builder(
                    padding: EdgeInsets.zero,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: group.teams.length,
                    itemBuilder: (context, idx) {
                      final isLast = idx == group.teams.length - 1;
                      final team = group.teams[idx];
                      return GestureDetector(
                        onTap: () => _addOrEditTeam(groupIndex, teamIndex: idx),
                        child: Container(
                          height: 45,
                          decoration: BoxDecoration(
                            border: isLast
                                ? null
                                : const Border(
                                    bottom: BorderSide(color: AppColors.border),
                                  ),
                          ),
                          padding: const EdgeInsets.symmetric(horizontal: 16),
                          child: Row(
                            children: [
                              Container(
                                width: 32,
                                height: 32,
                                decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  color: AppColors.secondary.withValues(
                                    alpha: 0.2,
                                  ),
                                  border: Border.all(
                                    color: AppColors.secondary.withValues(
                                      alpha: 0.5,
                                    ),
                                  ),
                                ),
                                alignment: Alignment.center,
                                child: Text(
                                  team.code,
                                  style: const TextStyle(
                                    color: AppColors.secondary,
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                    fontFamily: 'Chakra Petch',
                                  ),
                                ),
                              ),
                              const SizedBox(width: 16),
                              Expanded(
                                child: Text(
                                  team.name,
                                  style: const TextStyle(
                                    color: AppColors.foreground,
                                    fontFamily: 'Jura',
                                    fontSize: 14,
                                    fontWeight: FontWeight.w600,
                                  ),
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                              if (idx < 2 && group.teams.length >= 3)
                                const Icon(
                                  Icons.check_circle_outline,
                                  color: AppColors.primary,
                                  size: 16,
                                ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
          ),
          // ADD TEAM BUTTON
          InkWell(
            onTap: () => _addOrEditTeam(groupIndex),
            borderRadius: const BorderRadius.only(
              bottomLeft: Radius.circular(15),
              bottomRight: Radius.circular(15),
            ),
            child: Container(
              height: 40,
              decoration: const BoxDecoration(
                border: Border(
                  top: BorderSide(color: AppColors.border, width: 1),
                ),
              ),
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.add_circle_outline,
                    color: AppColors.secondary,
                    size: 16,
                  ),
                  SizedBox(width: 8),
                  Text(
                    'Adicionar Time',
                    style: TextStyle(
                      color: AppColors.secondary,
                      fontFamily: 'Jura',
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
