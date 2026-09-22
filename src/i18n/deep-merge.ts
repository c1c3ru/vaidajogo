/**
 * i18n/deep-merge.ts
 *
 * Mescla a árvore de textos traduzida sobre a árvore padrão (pt-BR).
 * Qualquer chave ausente na tradução cai automaticamente no texto em português,
 * então um idioma incompleto nunca deixa a interface com espaços em branco.
 */

type PlainObject = Record<string, unknown>;

const isPlainObject = (value: unknown): value is PlainObject =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

export const deepMerge = <T>(base: T, override: unknown): T => {
    if (!isPlainObject(base) || !isPlainObject(override)) {
        return (override === undefined ? base : (override as T));
    }

    const result: PlainObject = { ...base };

    for (const [key, value] of Object.entries(override)) {
        result[key] = key in base ? deepMerge(base[key], value) : value;
    }

    return result as T;
};
