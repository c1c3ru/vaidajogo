import 'package:flutter/material.dart';
import '../../../../core/theme/app_theme.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class TeamInfo {
  String name;
  String code;
  int pts;
  int pj;
  int vit;
  int emp;
  int der;
  int gm;
  int gc;

  int get sg => gm - gc;

  TeamInfo({
    required this.name,
    required this.code,
    this.pts = 0,
    this.pj = 0,
    this.vit = 0,
    this.emp = 0,
    this.der = 0,
    this.gm = 0,
    this.gc = 0,
  });

  Map<String, dynamic> toJson() => {
    'name': name,
    'code': code,
    'pts': pts,
    'pj': pj,
    'vit': vit,
    'emp': emp,
    'der': der,
    'gm': gm,
    'gc': gc,
  };

  factory TeamInfo.fromJson(Map<String, dynamic> json) => TeamInfo(
    name: json['name'] as String? ?? 'Time',
    code: json['code'] as String? ?? '',
    pts: json['pts'] as int? ?? 0,
    pj: json['pj'] as int? ?? 0,
    vit: json['vit'] as int? ?? 0,
    emp: json['emp'] as int? ?? 0,
    der: json['der'] as int? ?? 0,
    gm: json['gm'] as int? ?? 0,
    gc: json['gc'] as int? ?? 0,
  );
}

class GroupInfo {
  String name;
  List<TeamInfo> teams;

  GroupInfo({required this.name, required this.teams});

  Map<String, dynamic> toJson() => {
    'name': name,
    'teams': teams.map((t) => t.toJson()).toList(),
  };

  factory GroupInfo.fromJson(Map<String, dynamic> json) => GroupInfo(
    name: json['name'] as String? ?? 'GRUPO',
    teams:
        (json['teams'] as List?)
            ?.map((t) => TeamInfo.fromJson(t as Map<String, dynamic>))
            .toList() ??
        [],
  );
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
    _loadGroups();
  }

  Future<void> _loadGroups() async {
    final prefs = await SharedPreferences.getInstance();
    final String? groupsJson = prefs.getString('groups_data');
    if (groupsJson != null) {
      try {
        final List<dynamic> decoded = jsonDecode(groupsJson);
        setState(() {
          _groups = decoded
              .map((g) => GroupInfo.fromJson(g as Map<String, dynamic>))
              .toList();
        });
      } catch (_) {}
    }
  }

  Future<void> _saveGroups() async {
    final prefs = await SharedPreferences.getInstance();
    final serialized = _groups.map((g) => g.toJson()).toList();
    await prefs.setString('groups_data', jsonEncode(serialized));
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
                _saveGroups();
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
              _saveGroups();
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
                _saveGroups();
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
                _saveGroups();
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

  Widget _buildGroupsGrid() {
    return CustomScrollView(
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
    );
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
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
            icon: const Icon(
              Icons.arrow_back_ios_new,
              color: AppColors.primary,
            ),
            onPressed: () => Modular.to.pop(),
          ),
          bottom: const TabBar(
            indicatorColor: AppColors.primary,
            labelColor: AppColors.primary,
            unselectedLabelColor: AppColors.muted,
            tabs: [
              Tab(text: 'TIMES'),
              Tab(text: 'CLASSIFICAÇÃO'),
            ],
          ),
        ),
        body: TabBarView(children: [_buildGroupsGrid(), _buildStandingsGrid()]),
        floatingActionButton: FloatingActionButton(
          onPressed: _addGroup,
          backgroundColor: AppColors.secondary,
          child: const Icon(Icons.add, color: AppColors.background),
        ),
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

  Widget _buildStandingsGrid() {
    return ListView.builder(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.all(20),
      itemCount: _groups.length,
      itemBuilder: (context, index) {
        return Padding(
          padding: const EdgeInsets.only(bottom: 20),
          child: _buildStandingsCard(_groups[index], index),
        );
      },
    );
  }

  Widget _buildStandingsCard(GroupInfo group, int groupIndex) {
    // Ordenar os times (Pts > VIT > SG)
    final sortedTeams = List<TeamInfo>.from(group.teams);
    sortedTeams.sort((a, b) {
      if (b.pts != a.pts) return b.pts.compareTo(a.pts);
      if (b.vit != a.vit) return b.vit.compareTo(a.vit);
      return b.sg.compareTo(a.sg);
    });

    return Container(
      decoration: BoxDecoration(
        color: AppColors.cardBackground.withValues(alpha: 0.8),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.primary.withValues(alpha: 0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
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
            child: Text(
              group.name,
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: AppColors.primary,
                fontFamily: 'Chakra Petch',
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: DataTable(
              columnSpacing: 16,
              headingTextStyle: const TextStyle(
                color: AppColors.muted,
                fontWeight: FontWeight.bold,
                fontFamily: 'Jura',
              ),
              dataTextStyle: const TextStyle(
                color: AppColors.foreground,
                fontFamily: 'Chakra Petch',
              ),
              columns: const [
                DataColumn(label: Text('Clube')),
                DataColumn(label: Text('Pts')),
                DataColumn(label: Text('PJ')),
                DataColumn(label: Text('VIT')),
                DataColumn(label: Text('E')),
                DataColumn(label: Text('DER')),
                DataColumn(label: Text('GM')),
                DataColumn(label: Text('GC')),
                DataColumn(label: Text('SG')),
              ],
              rows: sortedTeams.map((team) {
                final idx = sortedTeams.indexOf(team);
                final bool isQualified = idx < 2; // Top 2 advance
                final originalIdx = group.teams.indexOf(team);
                return DataRow(
                  onSelectChanged: (_) =>
                      _editTeamStats(groupIndex, originalIdx),
                  cells: [
                    DataCell(
                      Row(
                        children: [
                          Text(
                            '\${idx + 1}',
                            style: TextStyle(
                              color: isQualified
                                  ? AppColors.secondary
                                  : AppColors.muted,
                              fontWeight: isQualified
                                  ? FontWeight.bold
                                  : FontWeight.normal,
                            ),
                          ),
                          const SizedBox(width: 8),
                          Text(team.name),
                        ],
                      ),
                    ),
                    DataCell(
                      Text(
                        team.pts.toString(),
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ),
                    DataCell(Text(team.pj.toString())),
                    DataCell(Text(team.vit.toString())),
                    DataCell(Text(team.emp.toString())),
                    DataCell(Text(team.der.toString())),
                    DataCell(Text(team.gm.toString())),
                    DataCell(Text(team.gc.toString())),
                    DataCell(Text(team.sg.toString())),
                  ],
                );
              }).toList(),
            ),
          ),
          const SizedBox(height: 8),
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Text(
              'Toque em uma linha para editar a pontuação',
              style: TextStyle(
                color: AppColors.muted,
                fontSize: 10,
                fontFamily: 'Jura',
              ),
              textAlign: TextAlign.center,
            ),
          ),
        ],
      ),
    );
  }

  void _editTeamStats(int groupIndex, int teamIndex) {
    final team = _groups[groupIndex].teams[teamIndex];
    final ptsCtrl = TextEditingController(text: team.pts.toString());
    final pjCtrl = TextEditingController(text: team.pj.toString());
    final vitCtrl = TextEditingController(text: team.vit.toString());
    final empCtrl = TextEditingController(text: team.emp.toString());
    final derCtrl = TextEditingController(text: team.der.toString());
    final gmCtrl = TextEditingController(text: team.gm.toString());
    final gcCtrl = TextEditingController(text: team.gc.toString());

    Widget buildNumberField(String label, TextEditingController controller) {
      return Expanded(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 4),
          child: TextField(
            controller: controller,
            keyboardType: TextInputType.number,
            style: const TextStyle(color: AppColors.foreground),
            decoration: InputDecoration(
              labelText: label,
              labelStyle: const TextStyle(color: AppColors.muted, fontSize: 12),
              contentPadding: const EdgeInsets.symmetric(
                horizontal: 4,
                vertical: 8,
              ),
            ),
          ),
        ),
      );
    }

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.cardBackground,
        title: Text(
          'Estatísticas - \${team.name}',
          style: const TextStyle(
            color: AppColors.primary,
            fontFamily: 'Chakra Petch',
          ),
        ),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                children: [
                  buildNumberField('Pts', ptsCtrl),
                  buildNumberField('PJ', pjCtrl),
                ],
              ),
              Row(
                children: [
                  buildNumberField('VIT', vitCtrl),
                  buildNumberField('E', empCtrl),
                ],
              ),
              Row(children: [buildNumberField('DER', derCtrl)]),
              Row(
                children: [
                  buildNumberField('GM', gmCtrl),
                  buildNumberField('GC', gcCtrl),
                ],
              ),
            ],
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
              setState(() {
                team.pts = int.tryParse(ptsCtrl.text.trim()) ?? team.pts;
                team.pj = int.tryParse(pjCtrl.text.trim()) ?? team.pj;
                team.vit = int.tryParse(vitCtrl.text.trim()) ?? team.vit;
                team.emp = int.tryParse(empCtrl.text.trim()) ?? team.emp;
                team.der = int.tryParse(derCtrl.text.trim()) ?? team.der;
                team.gm = int.tryParse(gmCtrl.text.trim()) ?? team.gm;
                team.gc = int.tryParse(gcCtrl.text.trim()) ?? team.gc;
              });
              _saveGroups();
              Navigator.pop(ctx);
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
}
