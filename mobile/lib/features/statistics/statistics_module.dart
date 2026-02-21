import 'package:flutter_modular/flutter_modular.dart';
import 'presentation/pages/statistics_page.dart';

class StatisticsModule extends Module {
  @override
  void routes(RouteManager r) {
    r.child('/', child: (context) => const StatisticsPage());
  }
}
