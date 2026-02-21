import 'package:flutter_modular/flutter_modular.dart';

class AppModule extends Module {
  @override
  void binds(Injector i) {
    // Injeção de dependências global, como bancos de dados, storages, httpClient (Dio)
  }

  @override
  void routes(RouteManager r) {
    // Rotas da aplicação (ex: Dashboard, Cadastro, Sorteio, etc)
    // Inicialmente redirecionando para a DashboardModule assim que criada
  }
}
