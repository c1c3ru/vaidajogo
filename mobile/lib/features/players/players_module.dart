import 'package:flutter_modular/flutter_modular.dart';
import 'presentation/pages/players_page.dart';

class PlayersModule extends Module {
  @override
  void binds(Injector i) {
    // PlayerBloc já foi injetado globalmente no AppModule, então não precisamos reinjetar
  }

  @override
  void routes(RouteManager r) {
    r.child('/', child: (context) => const PlayersPage());
  }
}
