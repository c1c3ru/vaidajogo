# Internacionalização (i18n)

Este projeto utiliza `i18next` e `react-i18next` para gerenciar traduções.

## Estrutura

- `src/i18n/config.ts`: Configuração principal do i18next.
- `src/i18n/locales/`: Diretório contendo os arquivos JSON de tradução.
  - `pt-BR.json`: Português Brasileiro (Idioma padrão/fallback).
  - `en-US.json`: Inglês Americano.
  - `es.json`: Espanhol.

## Como adicionar novas traduções

1.  Abra o arquivo `src/i18n/locales/pt-BR.json`.
2.  Adicione a nova chave e o texto. Exemplo:
    ```json
    "novaSecao": {
      "titulo": "Meu Novo Título"
    }
    ```
3.  Repita o processo para `en-US.json` e `es.json` com as respectivas traduções.

## Como usar nos componentes

Utilize o hook `useTranslation`:

```tsx
import { useTranslation } from 'react-i18next';

export function MeuComponente() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('novaSecao.titulo')}</h1>
    </div>
  );
}
```

## Detecção de Idioma

O idioma é detectado automaticamente na seguinte ordem:
1.  `localStorage` (se o usuário já escolheu antes).
2.  `navigator` (idioma do navegador).

## Trocando o Idioma

Use o método `i18n.changeLanguage`:

```tsx
const { i18n } = useTranslation();
i18n.changeLanguage('en-US');
```
