# Guia de Contribuição - Vai da Jogo

Obrigado pelo interesse em contribuir com o Vai da Jogo! Este documento fornece diretrizes para ajudá-lo a começar.

## 🚀 Como Começar

1.  **Fork** o repositório.
2.  **Clone** o projeto para sua máquina local.
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Crie uma **branch** para sua feature ou correção:
    ```bash
    git checkout -b feature/minha-nova-feature
    ```

## 🛠️ Desenvolvimento

### Scripts Disponíveis

-   `npm run dev`: Inicia o servidor de desenvolvimento.
-   `npm run build`: Gera a build de produção.
-   `npm run lint`: Executa o linter para verificar problemas no código.
-   `npm run preview`: Visualiza a build de produção localmente.

### Padrões de Código

-   **TypeScript**: Utilizamos TypeScript estrito. Evite `any` sempre que possível.
-   **Estilização**: Utilizamos Tailwind CSS e componentes shadcn/ui.
-   **Estado**: Utilizamos Zustand para gerenciamento de estado global.
-   **Internacionalização (i18n)**:
    -   Todo texto visível ao usuário deve ser traduzido.
    -   Use o hook `useTranslation` do `react-i18next`.
    -   Adicione as chaves de tradução em `src/i18n/locales/{pt-BR,en-US,es}.json`.

### Estrutura de Pastas

-   `src/components`: Componentes React reutilizáveis.
-   `src/pages`: Componentes de página (rotas).
-   `src/hooks`: Custom hooks.
-   `src/stores`: Stores do Zustand.
-   `src/types`: Definições de tipos TypeScript.
-   `src/utils`: Funções utilitárias.
-   `src/i18n`: Configuração e arquivos de tradução.

## 🌍 Internacionalização

Ao adicionar novos textos:

1.  Adicione a chave e o valor em `src/i18n/locales/pt-BR.json` (idioma base).
2.  Adicione as traduções correspondentes em `en-US.json` e `es.json`.
3.  No componente, use:
    ```tsx
    const { t } = useTranslation();
    return <h1>{t('chave.do.texto')}</h1>;
    ```

## ♿ Acessibilidade

-   Use HTML semântico sempre que possível.
-   Certifique-se de que todos os elementos interativos sejam acessíveis via teclado.
-   Use atributos `aria-*` quando necessário.
-   Verifique o contraste de cores.

## 📦 Pull Requests

1.  Certifique-se de que seu código passa no lint (`npm run lint`).
2.  Descreva claramente suas alterações no PR.
3.  Vincule issues relacionadas, se houver.

Obrigado por contribuir!
