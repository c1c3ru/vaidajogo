import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ptBR from './locales/pt-BR.json';
import enUS from './locales/en-US.json';
import es from './locales/es.json';
import textsEnUS from './locales/texts/en-US.json';
import textsEs from './locales/texts/es.json';
import { TEXTS } from '@/constants/texts';
import { deepMerge } from './deep-merge';

/**
 * A árvore `texts` carrega todos os textos da interface.
 * O português é a fonte de verdade (src/constants/texts.ts) e as traduções
 * são mescladas sobre ela, então chaves ainda não traduzidas caem no pt-BR.
 */
const resources = {
    'pt-BR': { translation: { ...ptBR, texts: TEXTS } },
    'en-US': { translation: { ...enUS, texts: deepMerge(TEXTS, textsEnUS) } },
    es: { translation: { ...es, texts: deepMerge(TEXTS, textsEs) } },
};

export const SUPPORTED_LANGUAGES = ['pt-BR', 'en-US', 'es'] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        supportedLngs: SUPPORTED_LANGUAGES,
        fallbackLng: 'pt-BR',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });

export default i18n;
