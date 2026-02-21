import 'package:equatable/equatable.dart';

class TeamStats extends Equatable {
  final int wins;
  final int draws;
  final int losses;
  final int goalsFor;
  final int goalsAgainst;

  const TeamStats({
    this.wins = 0,
    this.draws = 0,
    this.losses = 0,
    this.goalsFor = 0,
    this.goalsAgainst = 0,
  });

  @override
  List<Object?> get props => [wins, draws, losses, goalsFor, goalsAgainst];
}

class Team extends Equatable {
  final String id;
  final String name;
  final String? responsible;
  final List<String> players; // IDs of players
  final int? ranking;
  final String? groupTitle;
  final TeamStats stats;
  final int? rating;

  const Team({
    required this.id,
    required this.name,
    this.responsible,
    this.players = const [],
    this.ranking,
    this.groupTitle,
    this.stats = const TeamStats(),
    this.rating,
  });

  @override
  List<Object?> get props => [
    id,
    name,
    responsible,
    players,
    ranking,
    groupTitle,
    stats,
    rating,
  ];
}
