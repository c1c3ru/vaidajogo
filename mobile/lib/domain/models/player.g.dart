// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'player.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class PlayerAdapter extends TypeAdapter<Player> {
  @override
  final int typeId = 0;

  @override
  Player read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return Player(
      id: fields[0] as String,
      name: fields[1] as String,
      nickname: fields[2] as String?,
      birthDate: fields[3] as String?,
      isGuest: fields[4] as bool,
      sport: fields[5] as String,
      selectedPositions: (fields[6] as List).cast<String>(),
      rating: (fields[7] as num).toDouble(),
      evaluationType: fields[14] as String?,
      includeInDraw: fields[8] as bool,
      createdAt: fields[9] as String,
      selected: fields[10] as bool,
      present: fields[11] as bool,
      paid: fields[12] as bool,
      registered: fields[13] as bool,
    );
  }

  @override
  void write(BinaryWriter writer, Player obj) {
    writer
      ..writeByte(15)
      ..writeByte(0)
      ..write(obj.id)
      ..writeByte(1)
      ..write(obj.name)
      ..writeByte(2)
      ..write(obj.nickname)
      ..writeByte(3)
      ..write(obj.birthDate)
      ..writeByte(4)
      ..write(obj.isGuest)
      ..writeByte(5)
      ..write(obj.sport)
      ..writeByte(6)
      ..write(obj.selectedPositions)
      ..writeByte(7)
      ..write(obj.rating)
      ..writeByte(14)
      ..write(obj.evaluationType)
      ..writeByte(8)
      ..write(obj.includeInDraw)
      ..writeByte(9)
      ..write(obj.createdAt)
      ..writeByte(10)
      ..write(obj.selected)
      ..writeByte(11)
      ..write(obj.present)
      ..writeByte(12)
      ..write(obj.paid)
      ..writeByte(13)
      ..write(obj.registered);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is PlayerAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
