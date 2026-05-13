import 'package:equatable/equatable.dart';
import '../../../../domain/models/player.dart';

abstract class TeamDrawEvent extends Equatable {
  const TeamDrawEvent();

  @override
  List<Object?> get props => [];
}

class GenerateTeamsEvent extends TeamDrawEvent {
  final List<Player> availablePlayers;
  final int playersPerTeam;

  const GenerateTeamsEvent({
    required this.availablePlayers,
    required this.playersPerTeam,
  });

  @override
  List<Object?> get props => [availablePlayers, playersPerTeam];
}

class ClearTeamsEvent extends TeamDrawEvent {}
