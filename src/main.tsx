/**
 * main.tsx (ou index.tsx)
 *
 * Este é o ponto de entrada principal da sua aplicação React.
 * Ele configura o ambiente de renderização, incluindo o BrowserRouter e o React Query.
 */

import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot para o React 18
import { BrowserRouter } from 'react-router-dom'; // Para roteamento no navegador
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Para gerenciamento de estado assíncrono
import App from './App'; // O componente raiz da sua aplicação
import './index.css'; // Importa os estilos globais (Tailwind CSS)

// Cria uma instância do QueryClient para o React Query.
// Embora já esteja em App.tsx, é comum ter uma instância aqui para testes ou outras configurações.
const queryClient = new QueryClient();

// Obtém o elemento DOM onde a aplicação React será montada.
const container = document.getElementById('root');

// Verifica se o container existe antes de tentar criar a raiz.
if (container) {
  // Cria uma raiz React 18 para renderização concorrente.
  const root = createRoot(container);

  // Renderiza a aplicação.
  root.render(
    // React.StrictMode para detectar problemas potenciais na aplicação durante o desenvolvimento.
    <React.StrictMode>
      {/* BrowserRouter para habilitar o roteamento baseado em URL. */}
      <BrowserRouter>
        {/* QueryClientProvider para fornecer o cliente de consulta para toda a árvore de componentes. */}
        <QueryClientProvider client={queryClient}>
          <App /> {/* O componente principal da sua aplicação. */}
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  // Loga um erro se o elemento 'root' não for encontrado, o que é crucial para depuração.
  console.error('Failed to find the root element with ID "root". Ensure it exists in your index.html.');
}
