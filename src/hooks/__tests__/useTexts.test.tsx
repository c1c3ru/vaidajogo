import { describe, it, expect, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTexts } from '@/hooks/useTexts';
import i18n from '@/i18n/config';
import { TEXTS } from '@/constants/texts';
import textsEnUS from '@/i18n/locales/texts/en-US.json';
import textsEs from '@/i18n/locales/texts/es.json';

type PlainObject = Record<string, unknown>;

const isPlainObject = (value: unknown): value is PlainObject =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

/** Caminhos presentes na tradução que não existem na árvore padrão (pt-BR). */
const findUnknownKeys = (base: unknown, translation: unknown, path = ''): string[] => {
    if (!isPlainObject(translation)) return [];

    return Object.entries(translation).flatMap(([key, value]) => {
        const current = path ? `${path}.${key}` : key;

        if (!isPlainObject(base) || !(key in base)) return [current];

        return findUnknownKeys(base[key], value, current);
    });
};

describe('useTexts', () => {
    afterEach(async () => {
        await act(async () => {
            await i18n.changeLanguage('pt-BR');
        });
    });

    it('returns the Portuguese texts by default', () => {
        const { result } = renderHook(() => useTexts());

        expect(result.current.TEAM_DRAW.EMPTY_STATE.TITLE).toBe('Nenhum jogador confirmado ainda');
        expect(result.current.PRESENCE.STATS.PRESENT).toBe('Presentes');
    });

    it('re-renders with the translated texts when the language changes', async () => {
        const { result } = renderHook(() => useTexts());

        await act(async () => {
            await i18n.changeLanguage('en-US');
        });
        expect(result.current.TEAM_DRAW.EMPTY_STATE.TITLE).toBe('No players confirmed yet');
        expect(result.current.PRESENCE.STATS.PRESENT).toBe('Present');

        await act(async () => {
            await i18n.changeLanguage('es');
        });
        expect(result.current.TEAM_DRAW.EMPTY_STATE.TITLE).toBe('Ningún jugador confirmado todavía');
        expect(result.current.PRESENCE.STATS.PRESENT).toBe('Presentes');
    });

    it('falls back to the Portuguese value when a key is not translated', async () => {
        const { result } = renderHook(() => useTexts());

        await act(async () => {
            await i18n.changeLanguage('en-US');
        });

        // Valores que não são texto de interface continuam vindo da árvore padrão.
        expect(result.current.RATING_SYSTEMS.STARS.MAX).toBe(TEXTS.RATING_SYSTEMS.STARS.MAX);
        expect(result.current.SPORTS.SOCCER.AVAILABLE_RATING_SYSTEMS).toEqual(
            TEXTS.SPORTS.SOCCER.AVAILABLE_RATING_SYSTEMS
        );
    });
});

describe('translation files', () => {
    it.each([
        ['en-US', textsEnUS],
        ['es', textsEs],
    ])('%s only declares keys that exist in the default texts', (_language, translation) => {
        expect(findUnknownKeys(TEXTS, translation)).toEqual([]);
    });
});
