import { useMemo, useSyncExternalStore } from 'react';
import i18n from '@/i18n/config';
import { TEXTS } from '@/constants/texts';

export type Texts = typeof TEXTS;

const subscribe = (onChange: () => void) => {
    i18n.on('languageChanged', onChange);
    return () => i18n.off('languageChanged', onChange);
};

const getLanguage = () => i18n.resolvedLanguage ?? i18n.language ?? 'pt-BR';

/**
 * Retorna a árvore de textos do idioma ativo e reage à troca de idioma.
 *
 * Substitui o import direto de `TEXTS`: a estrutura é idêntica, então
 * `TEXTS.PRESENCE.TITLE` continua funcionando, agora traduzido.
 */
export const useTexts = (): Texts => {
    const language = useSyncExternalStore(subscribe, getLanguage, getLanguage);

    return useMemo(() => {
        const texts = i18n.getResource(language, 'translation', 'texts') as Texts | undefined;
        return texts ?? TEXTS;
    }, [language]);
};
