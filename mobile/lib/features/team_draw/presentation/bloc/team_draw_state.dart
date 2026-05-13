import 'package:equatable/equatable.dart';
import '../../../../domain/models/player.dart';

abstract class TeamDrawState extends Equatable {
  const TeamDrawState();

  @override
  List<Object?> get props => [];
}

class TeamDrawInitial extends TeamDrawState {}

class TeamDrawLoading extends TeamDrawState {}

class TeamDrawSuccess extends TeamDrawState {
  final List<List<Player>> teams;

  const TeamDrawSuccess(this.teams);

  @override
  List<Object?> get props => [teams];
}

class TeamDrawError extends TeamDrawState {
  final String message;

  const TeamDrawError(this.message);

  @override
  List<Object?> get props => [message];
}
