import 'package:equatable/equatable.dart';
import 'package:hive/hive.dart';

part 'player.g.dart';

@HiveType(typeId: 0)
class Player extends Equatable {
  @HiveField(0)
  final String id;

  @HiveField(1)
  final String name;

  @HiveField(2)
  final String? nickname;

  @HiveField(3)
  final String? birthDate;

  @HiveField(4)
  final bool isGuest;

  @HiveField(5)
  final String sport;

  @HiveField(6)
  final List<String> selectedPositions;

  @HiveField(7)
  final double rating;

  @HiveField(14)
  final String? evaluationType;

  @HiveField(8)
  final bool includeInDraw;

  @HiveField(9)
  final String createdAt;

  @HiveField(10)
  final bool selected;

  @HiveField(11)
  final bool present;

  @HiveField(12)
  final bool paid;

  @HiveField(13)
  final bool registered;

  const Player({
    required this.id,
    required this.name,
    this.nickname,
    this.birthDate,
    required this.isGuest,
    required this.sport,
    required this.selectedPositions,
    required this.rating,
    this.evaluationType,
    required this.includeInDraw,
    required this.createdAt,
    required this.selected,
    required this.present,
    required this.paid,
    required this.registered,
  });

  Player copyWith({
    String? id,
    String? name,
    String? nickname,
    String? birthDate,
    bool? isGuest,
    String? sport,
    List<String>? selectedPositions,
    double? rating,
    String? evaluationType,
    bool? includeInDraw,
    String? createdAt,
    bool? selected,
    bool? present,
    bool? paid,
    bool? registered,
  }) {
    return Player(
      id: id ?? this.id,
      name: name ?? this.name,
      nickname: nickname ?? this.nickname,
      birthDate: birthDate ?? this.birthDate,
      isGuest: isGuest ?? this.isGuest,
      sport: sport ?? this.sport,
      selectedPositions: selectedPositions ?? this.selectedPositions,
      rating: rating ?? this.rating,
      evaluationType: evaluationType ?? this.evaluationType,
      includeInDraw: includeInDraw ?? this.includeInDraw,
      createdAt: createdAt ?? this.createdAt,
      selected: selected ?? this.selected,
      present: present ?? this.present,
      paid: paid ?? this.paid,
      registered: registered ?? this.registered,
    );
  }

  @override
  List<Object?> get props => [
    id,
    name,
    nickname,
    birthDate,
    isGuest,
    sport,
    selectedPositions,
    rating,
    evaluationType,
    includeInDraw,
    createdAt,
    selected,
    present,
    paid,
    registered,
  ];
}
