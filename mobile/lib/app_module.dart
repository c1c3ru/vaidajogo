import 'package:flutter_modular/flutter_modular.dart';
import 'features/dashboard/dashboard_module.dart';
import 'features/team_draw/team_draw_module.dart';
import 'features/statistics/statistics_module.dart';
import 'features/championship/championship_module.dart';
import 'features/players/players_module.dart';
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
    r.module('/players', module: PlayersModule());
    r.module('/team-draw', module: TeamDrawModule());
    r.module('/statistics', module: StatisticsModule());
    r.module('/championship', module: ChampionshipModule());
    // Mapeamento direto das rotas antigas do Dashboard pra dentro do módulo novo
    r.module('/player-form', module: PlayersModule(), initialRoute: '/form');
    r.module('/presence', module: PlayersModule(), initialRoute: '/presence');
  }
}
