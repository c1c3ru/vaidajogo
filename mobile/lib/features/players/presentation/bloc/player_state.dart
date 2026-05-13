import 'package:equatable/equatable.dart';
import '../../../../domain/models/player.dart';

abstract class PlayerState extends Equatable {
  final List<Player> players;
  const PlayerState({this.players = const []});

  @override
  List<Object?> get props => [players];
}

class PlayerInitialState extends PlayerState {}

class PlayerLoadingState extends PlayerState {
  const PlayerLoadingState({super.players});
}

class PlayerLoadedState extends PlayerState {
  const PlayerLoadedState(List<Player> players) : super(players: players);
}

class PlayerErrorState extends PlayerState {
  final String message;
  const PlayerErrorState(this.message, {super.players});

  @override
  List<Object?> get props => [players, message];
}
