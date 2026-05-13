import 'package:flutter_modular/flutter_modular.dart';
import 'presentation/pages/dashboard_page.dart';

class DashboardModule extends Module {
  @override
  void binds(Injector i) {}

  @override
  void routes(RouteManager r) {
    r.child('/', child: (context) => const DashboardPage());
  }
}
