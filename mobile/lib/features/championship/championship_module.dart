import 'package:flutter_modular/flutter_modular.dart';
import 'presentation/pages/championship_page.dart';

class ChampionshipModule extends Module {
  @override
  void routes(RouteManager r) {
    r.child('/', child: (context) => const ChampionshipPage());
  }
}
