import 'package:flutter/material.dart';
import '../../../../core/theme/app_theme.dart';

class LogoWidget extends StatefulWidget {
  final double size;
  const LogoWidget({super.key, this.size = 48.0});

  @override
  State<LogoWidget> createState() => _LogoWidgetState();
}

class _LogoWidgetState extends State<LogoWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _rotation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 800),
    );
    _rotation = Tween<double>(
      begin: 0,
      end: 1,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.elasticOut));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        _controller.forward(from: 0);
      },
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: widget.size,
            height: widget.size,
            decoration: BoxDecoration(
              color: AppColors.cardBackground,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppColors.primary, width: 2),
              boxShadow: [
                BoxShadow(
                  color: AppColors.primary.withValues(alpha: 0.3),
                  blurRadius: 15,
                  spreadRadius: 2,
                ),
              ],
            ),
            alignment: Alignment.center,
            child: RotationTransition(
              turns: _rotation,
              child: Text(
                'V',
                style: TextStyle(
                  color: AppColors.primary,
                  fontSize: widget.size * 0.5,
                  fontWeight: FontWeight.bold,
                  fontFamily: 'Chakra Petch',
                ),
              ),
            ),
          ),
          const SizedBox(width: 12),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              RichText(
                text: const TextSpan(
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Chakra Petch',
                    letterSpacing: 2,
                  ),
                  children: [
                    TextSpan(
                      text: 'VAI',
                      style: TextStyle(color: AppColors.foreground),
                    ),
                    TextSpan(
                      text: 'DA',
                      style: TextStyle(color: AppColors.primary),
                    ),
                    TextSpan(
                      text: 'JOGO',
                      style: TextStyle(color: AppColors.foreground),
                    ),
                  ],
                ),
              ),
              const Text(
                'SYSTEM CORE ONLINE',
                style: TextStyle(
                  fontSize: 8,
                  letterSpacing: 3,
                  color: AppColors.muted,
                  fontFamily: 'Jura',
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
