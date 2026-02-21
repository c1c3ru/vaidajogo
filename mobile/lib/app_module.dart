import 'package:flutter_modular/flutter_modular.dart';
import 'features/dashboard/dashboard_module.dart';

class AppModule extends Module {
  @override
  void binds(Injector i) {
    // Injeção de dependências global, como bancos de dados, storages, httpClient (Dio)
  }

  @override
  void routes(RouteManager r) {
    r.module('/', module: DashboardModule());
  }
}
