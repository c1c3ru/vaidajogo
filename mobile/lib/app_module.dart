import 'package:flutter_modular/flutter_modular.dart';
import 'features/dashboard/dashboard_module.dart';
import 'domain/repositories/player_repository.dart';
import 'data/repositories/hive_player_repository.dart';
import 'features/players/presentation/bloc/player_bloc.dart';

class AppModule extends Module {
  @override
  void binds(Injector i) {
    // Injeções globais
    i.addSingleton<PlayerRepository>(HivePlayerRepository.new);
    i.addSingleton<PlayerBloc>(PlayerBloc.new);
  }

  @override
  void routes(RouteManager r) {
    r.module('/', module: DashboardModule());
  }
}
