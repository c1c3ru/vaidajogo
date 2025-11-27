import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="max-w-md w-full space-y-6 text-center">
                <div className="flex justify-center">
                    <div className="h-24 w-24 rounded-full bg-destructive/10 flex items-center justify-center">
                        <AlertTriangle className="h-12 w-12 text-destructive" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">Algo deu errado</h1>
                    <p className="text-muted-foreground">
                        Desculpe, encontramos um erro inesperado. Nossa equipe foi notificada.
                    </p>
                </div>

                <div className="p-4 rounded-lg bg-muted/50 text-left overflow-auto max-h-40 text-sm font-mono text-muted-foreground">
                    {error.message}
                </div>

                <div className="flex gap-4 justify-center">
                    <Button onClick={() => window.location.reload()} variant="outline">
                        Recarregar Página
                    </Button>
                    <Button onClick={resetErrorBoundary}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Tentar Novamente
                    </Button>
                </div>
            </div>
        </div>
    );
};
