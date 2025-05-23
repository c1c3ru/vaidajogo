/**
 * utils/localStorage.ts
 *
 * Este arquivo contém funções utilitárias para salvar e recuperar dados
 * do localStorage, com tratamento de erros.
 */

/**
 * Salva um valor no localStorage.
 * @param {string} key - A chave sob a qual o valor será armazenado.
 * @param {T} value - O valor a ser armazenado (será JSON.stringify-ado).
 * @template T
 */
export const saveToLocalStorage = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`[localStorage] Error saving item with key "${key}":`, error);
    // Opcional: Lançar o erro novamente ou notificar o usuário
  }
};

/**
 * Recupera um valor do localStorage.
 * @param {string} key - A chave do valor a ser recuperado.
 * @param {T} defaultValue - O valor padrão a ser retornado se a chave não for encontrada ou houver um erro.
 * @returns {T} O valor recuperado do localStorage ou o defaultValue.
 * @template T
 */
export const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue; // Retorna o valor padrão se o item não existir
    }
    return JSON.parse(item) as T; // Faz o parse do JSON e tenta fazer o cast para o tipo T
  } catch (error) {
    console.error(`[localStorage] Error reading item with key "${key}":`, error);
    // Opcional: Lançar o erro novamente ou notificar o usuário
    return defaultValue; // Retorna o valor padrão em caso de erro (ex: JSON malformado)
  }
};

// Exporta aliases para compatibilidade ou preferência de nomenclatura
export const getStorageItem = getFromLocalStorage;
export const setStorageItem = saveToLocalStorage;
