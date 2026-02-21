import 'package:hive/hive.dart';
import '../../domain/models/player.dart';
import '../../domain/repositories/player_repository.dart';

class HivePlayerRepository implements PlayerRepository {
  static const String _boxName = 'players_box';

  Future<Box<Player>> _getBox() async {
    if (Hive.isBoxOpen(_boxName)) {
      return Hive.box<Player>(_boxName);
    }
    return await Hive.openBox<Player>(_boxName);
  }

  @override
  Future<List<Player>> getPlayers() async {
    final box = await _getBox();
    return box.values.toList();
  }

  @override
  Future<void> savePlayer(Player player) async {
    final box = await _getBox();
    await box.put(player.id, player);
  }

  @override
  Future<void> updatePlayer(Player player) async {
    final box = await _getBox();
    if (box.containsKey(player.id)) {
      await box.put(player.id, player);
    }
  }

  @override
  Future<void> deletePlayer(String id) async {
    final box = await _getBox();
    await box.delete(id);
  }

  @override
  Future<void> saveAllPlayers(List<Player> players) async {
    final box = await _getBox();
    final Map<String, Player> playerMap = {for (var p in players) p.id: p};
    await box.putAll(playerMap);
  }

  @override
  Future<void> clearPlayers() async {
    final box = await _getBox();
    await box.clear();
  }
}
