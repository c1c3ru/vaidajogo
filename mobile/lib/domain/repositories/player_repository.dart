import '../models/player.dart';

abstract class PlayerRepository {
  Future<List<Player>> getPlayers();
  Future<void> savePlayer(Player player);
  Future<void> updatePlayer(Player player);
  Future<void> deletePlayer(String id);
  Future<void> saveAllPlayers(List<Player> players);
  Future<void> clearPlayers();
}
