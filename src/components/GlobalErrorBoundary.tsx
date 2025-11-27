import React from 'react';
import * as Sentry from '@sentry/react';
import { ErrorFallback } from './ui/error-fallback';

interface GlobalErrorBoundaryProps {
    children: React.ReactNode;
}

export const GlobalErrorBoundary: React.FC<GlobalErrorBoundaryProps> = ({ children }) => {
    return (
        <Sentry.ErrorBoundary
            fallback={({ error, resetError }) => (
                <ErrorFallback
                    error={error instanceof Error ? error : new Error('Erro desconhecido')}
                    resetErrorBoundary={resetError}
                />
            )}
            beforeCapture={(scope) => {
                scope.setLevel('fatal');
            }}
        >
            {children}
        </Sentry.ErrorBoundary>
    );
};
