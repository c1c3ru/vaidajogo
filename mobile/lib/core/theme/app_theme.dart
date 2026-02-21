import 'package:flutter/material.dart';

class AppColors {
  // Tema Dark Futurista (Cyberpunk)
  static const Color background = Color(0xFF050511);
  static const Color foreground = Color(0xFFE0E7FF);

  static const Color primary = Color(0xFF00F0FF);
  static const Color secondary = Color(0xFF7000FF);
  static const Color accent = Color(0xFFFF003C);

  static const Color cardBackground = Color(0xFF0A0A1A);
  static const Color border = Color(0xFF1A1A30);
  static const Color muted = Color(0xFF8F9BB3);
}

class AppTheme {
  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: AppColors.background,
      primaryColor: AppColors.primary,
      colorScheme: const ColorScheme.dark(
        primary: AppColors.primary,
        secondary: AppColors.secondary,
        surface: AppColors.cardBackground,
        error: AppColors.accent,
        onPrimary: AppColors.background,
        onSecondary: Colors.white,
        onSurface: AppColors.foreground,
      ),
      cardTheme: CardTheme(
        color: AppColors.cardBackground.withOpacity(0.8),
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: AppColors.border, width: 1),
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
      ),
      fontFamily: 'Jura', // Idealmente você adicionaria a fonte nos assets
      textTheme: const TextTheme(
        displayLarge: TextStyle(
          fontFamily: 'Chakra Petch',
          color: AppColors.foreground,
          fontWeight: FontWeight.bold,
        ),
        displayMedium: TextStyle(
          fontFamily: 'Chakra Petch',
          color: AppColors.foreground,
          fontWeight: FontWeight.bold,
        ),
        titleLarge: TextStyle(
          fontFamily: 'Chakra Petch',
          color: AppColors.foreground,
          fontWeight: FontWeight.w600,
        ),
        bodyLarge: TextStyle(fontFamily: 'Jura', color: AppColors.foreground),
        bodyMedium: TextStyle(fontFamily: 'Jura', color: AppColors.foreground),
      ),
    );
  }
}
