import 'dart:math';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../../domain/models/player.dart';
import 'team_draw_event.dart';
import 'team_draw_state.dart';

class TeamDrawBloc extends Bloc<TeamDrawEvent, TeamDrawState> {
  TeamDrawBloc() : super(TeamDrawInitial()) {
    on<GenerateTeamsEvent>(_onGenerateTeams);
    on<ClearTeamsEvent>((event, emit) => emit(TeamDrawInitial()));
  }

  void _onGenerateTeams(GenerateTeamsEvent event, Emitter<TeamDrawState> emit) {
    emit(TeamDrawLoading());

    try {
      final players = List<Player>.from(event.availablePlayers);
      final playersPerTeam = event.playersPerTeam;

      if (players.isEmpty) {
        emit(
          const TeamDrawError(
            "Nenhum operador ativo para organizar os esquadrões.",
          ),
        );
        return;
      }

      final numberOfTeams = (players.length / playersPerTeam).ceil();
      if (numberOfTeams <= 1) {
        emit(
          const TeamDrawError(
            "Jogadores insuficientes para formar mais de um esquadrão.",
          ),
        );
        return;
      }

      // Separação Tática: Goleiros e Jogadores de Linha
      final goalkeepers = players
          .where((p) => p.selectedPositions.contains('GOL'))
          .toList();
      final fieldPlayers = players
          .where((p) => !p.selectedPositions.contains('GOL'))
          .toList();

      // Embaralhamento inicial para evitar predições repetidas
      final random = Random();
      goalkeepers.shuffle(random);
      fieldPlayers.shuffle(random);

      // Ordena por Rating para fazer a distribuição Snake (Balanço Matricial)
      goalkeepers.sort((a, b) => b.rating.compareTo(a.rating));
      fieldPlayers.sort((a, b) => b.rating.compareTo(a.rating));

      List<List<Player>> teams = List.generate(numberOfTeams, (_) => []);

      // Distribui Goleiros
      int currentTeam = 0;
      int direction = 1;
      for (var gk in goalkeepers) {
        teams[currentTeam].add(gk);
        currentTeam += direction;
        if (currentTeam >= numberOfTeams || currentTeam < 0) {
          direction *= -1;
          currentTeam += direction;
        }
      }

      // Continua a distribuição Snake para jogadores de linha (Balanceamento)
      for (var fp in fieldPlayers) {
        teams[currentTeam].add(fp);
        currentTeam += direction;
        if (currentTeam >= numberOfTeams || currentTeam < 0) {
          direction *= -1;
          currentTeam += direction;
        }
      }

      emit(TeamDrawSuccess(teams));
    } catch (e) {
      emit(TeamDrawError("Falha na Matriz de Sorteio: \${e.toString()}"));
    }
  }
}
