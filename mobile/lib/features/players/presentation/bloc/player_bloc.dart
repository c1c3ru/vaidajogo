import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../../domain/repositories/player_repository.dart';
import 'player_event.dart';
import 'player_state.dart';

class PlayerBloc extends Bloc<PlayerEvent, PlayerState> {
  final PlayerRepository _repository;

  PlayerBloc(this._repository) : super(PlayerInitialState()) {
    on<LoadPlayersEvent>(_onLoadPlayers);
    on<AddPlayerEvent>(_onAddPlayer);
    on<UpdatePlayerEvent>(_onUpdatePlayer);
    on<DeletePlayerEvent>(_onDeletePlayer);
    on<TogglePlayerPresenceEvent>(_onTogglePlayerPresence);
    on<TogglePlayerPaidEvent>(_onTogglePlayerPaid);
  }

  Future<void> _onLoadPlayers(
    LoadPlayersEvent event,
    Emitter<PlayerState> emit,
  ) async {
    emit(PlayerLoadingState(players: state.players));
    try {
      final players = await _repository.getPlayers();
      emit(PlayerLoadedState(players));
    } catch (e) {
      emit(PlayerErrorState(e.toString(), players: state.players));
    }
  }

  Future<void> _onAddPlayer(
    AddPlayerEvent event,
    Emitter<PlayerState> emit,
  ) async {
    try {
      await _repository.savePlayer(event.player);
      // Recarrega todos da base ou apenas atualiza a lista atual na memória
      final currentPlayers = List.of(state.players)..add(event.player);
      emit(PlayerLoadedState(currentPlayers));
    } catch (e) {
      emit(
        PlayerErrorState(
          "Erro ao adicionar jogador: ${e.toString()}",
          players: state.players,
        ),
      );
    }
  }

  Future<void> _onUpdatePlayer(
    UpdatePlayerEvent event,
    Emitter<PlayerState> emit,
  ) async {
    try {
      await _repository.updatePlayer(event.player);
      final currentPlayers = state.players
          .map((p) => p.id == event.player.id ? event.player : p)
          .toList();
      emit(PlayerLoadedState(currentPlayers));
    } catch (e) {
      emit(
        PlayerErrorState(
          "Erro ao atualizar jogador: ${e.toString()}",
          players: state.players,
        ),
      );
    }
  }

  Future<void> _onDeletePlayer(
    DeletePlayerEvent event,
    Emitter<PlayerState> emit,
  ) async {
    try {
      await _repository.deletePlayer(event.id);
      final currentPlayers = state.players
          .where((p) => p.id != event.id)
          .toList();
      emit(PlayerLoadedState(currentPlayers));
    } catch (e) {
      emit(
        PlayerErrorState(
          "Erro ao remover jogador: ${e.toString()}",
          players: state.players,
        ),
      );
    }
  }

  Future<void> _onTogglePlayerPresence(
    TogglePlayerPresenceEvent event,
    Emitter<PlayerState> emit,
  ) async {
    try {
      final playerIndex = state.players.indexWhere((p) => p.id == event.id);
      if (playerIndex >= 0) {
        final player = state.players[playerIndex];
        final updatedPlayer = player.copyWith(present: !player.present);

        await _repository.updatePlayer(updatedPlayer);

        final currentPlayers = List.of(state.players);
        currentPlayers[playerIndex] = updatedPlayer;
        emit(PlayerLoadedState(currentPlayers));
      }
    } catch (e) {
      emit(
        PlayerErrorState(
          "Erro ao alternar presença: ${e.toString()}",
          players: state.players,
        ),
      );
    }
  }

  Future<void> _onTogglePlayerPaid(
    TogglePlayerPaidEvent event,
    Emitter<PlayerState> emit,
  ) async {
    try {
      final playerIndex = state.players.indexWhere((p) => p.id == event.id);
      if (playerIndex >= 0) {
        final player = state.players[playerIndex];
        final updatedPlayer = player.copyWith(paid: !player.paid);

        await _repository.updatePlayer(updatedPlayer);

        final currentPlayers = List.of(state.players);
        currentPlayers[playerIndex] = updatedPlayer;
        emit(PlayerLoadedState(currentPlayers));
      }
    } catch (e) {
      emit(
        PlayerErrorState(
          "Erro ao alternar status de pagamento: ${e.toString()}",
          players: state.players,
        ),
      );
    }
  }
}
