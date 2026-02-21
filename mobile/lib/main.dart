import 'package:flutter/material.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'app_module.dart';

void main() {
  runApp(ModularApp(module: AppModule(), child: const AppWidget()));
}

class AppWidget extends StatelessWidget {
  const AppWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Vai da Jogo',
      theme: ThemeData.dark().copyWith(
        primaryColor: const Color(0xFF00B3FF),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF00B3FF),
          secondary: Color(0xFF5100FF),
        ),
      ),
      routeInformationParser: Modular.routeInformationParser,
      routerDelegate: Modular.routerDelegate,
    );
  }
}
