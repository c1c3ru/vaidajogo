import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/zustand_stores';
import { Loader2, Mail, Phone, XCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { springConfig } from '../../utils/animations'; // Importado springConfig

const Login = () => {
  const { isLoading, error, setLoading, setError } = useAuthStore();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // Função genérica para simular o login
  const simulateLogin = async (loginType: string, errorMessage: string) => {
    setLoading(true);
    setError(null); // Limpa erros anteriores
    try {
      // Simulação de uma chamada de API de login
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simula um atraso de rede
      navigate('/menu'); // Redireciona para o menu após o login bem-sucedido
    } catch (err) {
      console.error(`Erro ao fazer login com ${loginType}:`, err);
      setError(errorMessage); // Define a mensagem de erro
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  // Manipulador para login com e-mail
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    if (!email.trim()) { // Validação de e-mail básico
      setError("Por favor, informe seu e-mail.");
      return;
    }
    await simulateLogin('e-mail', "Erro ao fazer login com e-mail. Verifique suas credenciais.");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={springConfig} // Usando springConfig para consistência
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8 font-sans"
      role="main"
      aria-label="Página de Login"
    >
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900">Vai dar jogo</h1>
          <p className="text-xl font-medium text-gray-700">Que bom que você voltou!</p>
        </div>

        {/* Formulário de Login com E-mail */}
        <form onSubmit={handleEmailLogin} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Endereço de e-mail
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-base border-gray-300 focus:border-primary focus:ring-primary/50 transition-all duration-200"
              placeholder="seu.email@exemplo.com"
              aria-label="Campo de e-mail para login"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-primary text-white text-lg font-semibold rounded-lg shadow-md hover:bg-primary/90 transition-colors duration-200"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-label="Carregando" />
            ) : null}
            Continuar
          </Button>
        </form>

        {/* Link para Cadastro */}
        <div className="flex items-center justify-center text-sm">
          <span className="text-gray-600">Não tem uma conta?</span>
          <Button variant="link" className="text-primary hover:text-primary/80" onClick={() => navigate('/signup')}>
            Cadastrar
          </Button>
        </div>

        {/* Separador "ou" */}
        <div className="flex items-center gap-4">
          <Separator className="flex-grow bg-gray-200" />
          <span className="text-sm text-gray-500">ou</span>
          <Separator className="flex-grow bg-gray-200" />
        </div>

        {/* Botões de Login Social */}
        <div className="space-y-3">
          <Button
            onClick={() => simulateLogin('Google', "Erro ao fazer login com Google.")}
            disabled={isLoading}
            variant="outline"
            className="w-full h-12 justify-start px-4 text-gray-700 border-gray-300 hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              {/* <path d="M1 1h22v22H1z" fill="none" /> Removido, pois é um path invisível */}
            </svg>
            Continuar com o Google
          </Button>

          <Button
            onClick={() => simulateLogin('Microsoft', "Erro ao fazer login com Microsoft.")}
            disabled={isLoading}
            variant="outline"
            className="w-full h-12 justify-start px-4 text-gray-700 border-gray-300 hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="h-5 w-5 mr-3" viewBox="0 0 23 23" aria-hidden="true">
              <path fill="#f3f3f3" d="M0 0h23v23H0z" />
              <path fill="#f35325" d="M1 1h10v10H1z" />
              <path fill="#81bc06" d="M12 1h10v10H12z" />
              <path fill="#05a6f0" d="M1 12h10v10H1z" />
              <path fill="#ffba08" d="M12 12h10v10H12z" />
            </svg>
            Continuar com a conta Microsoft
          </Button>

          <Button
            onClick={() => simulateLogin('Apple', "Erro ao fazer login com Apple.")}
            disabled={isLoading}
            variant="outline"
            className="w-full h-12 justify-start px-4 text-gray-700 border-gray-300 hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
            </svg>
            Continuar com a Apple
          </Button>

          <Button
            onClick={() => simulateLogin('telefone', "Erro ao fazer login com telefone.")}
            disabled={isLoading}
            variant="outline"
            className="w-full h-12 justify-start px-4 text-gray-700 border-gray-300 hover:bg-gray-50 transition-colors duration-200"
          >
            <Phone className="h-5 w-5 mr-3" aria-hidden="true" />
            Continuar com o telefone
          </Button>
        </div>

        {/* Exibição de Erro */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Alert variant="destructive" className="mt-4 border-red-300 bg-red-50 text-red-700">
              <AlertDescription className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <span>{error}</span>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Links de Termos e Política */}
        <div className="flex justify-center gap-4 text-sm pt-4">
          <a href="#" className="text-primary hover:underline font-medium" aria-label="Termos de uso">Termos de uso</a>
          <span className="text-gray-400">|</span>
          <a href="#" className="text-primary hover:underline font-medium" aria-label="Política de privacidade">Política de privacidade</a>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
