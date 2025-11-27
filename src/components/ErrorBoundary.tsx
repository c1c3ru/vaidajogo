import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    private handleReload = () => {
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] p-6 bg-red-50 rounded-xl border border-red-200 text-center">
                    <div className="bg-red-100 p-4 rounded-full mb-4">
                        <AlertCircle className="h-10 w-10 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-red-800 mb-2">Algo deu errado</h2>
                    <p className="text-red-600 mb-6 max-w-md">
                        Ocorreu um erro inesperado ao carregar este componente. Tente recarregar a página.
                    </p>
                    <div className="flex gap-4">
                        <Button
                            onClick={this.handleReload}
                            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Recarregar Página
                        </Button>
                    </div>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <div className="mt-8 p-4 bg-gray-900 text-red-400 rounded-lg text-left w-full max-w-2xl overflow-auto text-xs font-mono">
                            <p className="font-bold mb-2">{this.state.error.toString()}</p>
                        </div>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
