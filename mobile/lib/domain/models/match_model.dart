import 'package:equatable/equatable.dart';
import 'team.dart';

enum MatchType { friendly, tournament, playoff }

enum MatchStatus { pending, inProgress, finished, postponed }

class MatchModel extends Equatable {
  final String id;
  final Team team1;
  final Team team2;
  final int? score1;
  final int? score2;
  final DateTime? date;
  final String? location;
  final MatchType? type;
  final MatchStatus? status;
  final bool isHomeGame;
  final String? round;

  const MatchModel({
    required this.id,
    required this.team1,
    required this.team2,
    this.score1,
    this.score2,
    this.date,
    this.location,
    this.type,
    this.status,
    this.isHomeGame = true,
    this.round,
  });

  @override
  List<Object?> get props => [
    id,
    team1,
    team2,
    score1,
    score2,
    date,
    location,
    type,
    status,
    isHomeGame,
    round,
  ];
}
