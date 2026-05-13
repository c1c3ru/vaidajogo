import 'package:flutter_modular/flutter_modular.dart';
import 'presentation/bloc/team_draw_bloc.dart';
import 'presentation/pages/team_draw_page.dart';

class TeamDrawModule extends Module {
  @override
  void binds(Injector i) {
    i.addSingleton<TeamDrawBloc>(TeamDrawBloc.new);
  }

  @override
  void routes(RouteManager r) {
    r.child('/', child: (context) => const TeamDrawPage());
  }
}
