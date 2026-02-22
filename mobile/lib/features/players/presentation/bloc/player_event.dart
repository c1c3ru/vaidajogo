import 'package:equatable/equatable.dart';
import '../../../../domain/models/player.dart';

abstract class PlayerEvent extends Equatable {
  const PlayerEvent();

  @override
  List<Object?> get props => [];
}

class LoadPlayersEvent extends PlayerEvent {}

class AddPlayerEvent extends PlayerEvent {
  final Player player;
  const AddPlayerEvent(this.player);

  @override
  List<Object?> get props => [player];
}

class UpdatePlayerEvent extends PlayerEvent {
  final Player player;
  const UpdatePlayerEvent(this.player);

  @override
  List<Object?> get props => [player];
}

class DeletePlayerEvent extends PlayerEvent {
  final String id;
  const DeletePlayerEvent(this.id);

  @override
  List<Object?> get props => [id];
}

class TogglePlayerPresenceEvent extends PlayerEvent {
  final String id;
  const TogglePlayerPresenceEvent(this.id);

  @override
  List<Object?> get props => [id];
}

class TogglePlayerPaidEvent extends PlayerEvent {
  final String id;
  const TogglePlayerPaidEvent(this.id);

  @override
  List<Object?> get props => [id];
}
