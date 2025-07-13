import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useSessionStore } from '@/stores/useSessionStore';
import { useLargeDataStore } from '@/stores/useLargeDataStore';
import { useStorage } from '@/utils/storage';
import { cleanupExpiredData } from '@/utils/storage';
import { BackToDashboard } from './BackToDashboard';
import { Rating } from '@/types/types';

export const StorageDemo = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'local' | 'session' | 'indexed'>('local');
  
  // Stores
  const { players, addPlayer, deletePlayer } = usePlayerStore();
  const { temporaryData, setTemporaryData, clearTemporaryData } = useSessionStore();
  const { matchHistory, addMatch, removeMatch } = useLargeDataStore();
  
  // Storage direto
  const localStorage = useStorage('local');
  const sessionStorage = useStorage('session');
  const indexedStorage = useStorage('indexed');

  const [demoData, setDemoData] = useState({
    local: '',
    session: '',
    indexed: '',
  });

  useEffect(() => {
    // Carregar dados de exemplo
    loadDemoData();
  }, []);

  const loadDemoData = async () => {
    const localData = await localStorage.get('demo-data');
    const sessionData = await sessionStorage.get('demo-data');
    const indexedData = await indexedStorage.get('demo-data');

    setDemoData({
      local: (localData as string) || '',
      session: (sessionData as string) || '',
      indexed: (indexedData as string) || '',
    });
  };

  const handleSaveData = async (type: 'local' | 'session' | 'indexed') => {
    const data = `Dados salvos em ${type} - ${new Date().toLocaleString()}`;
    
    try {
      switch (type) {
        case 'local':
          localStorage.set('demo-data', data);
          break;
        case 'session':
          sessionStorage.set('demo-data', data);
          break;
        case 'indexed':
          await indexedStorage.set('demo-data', data);
          break;
      }

      setDemoData(prev => ({ ...prev, [type]: data }));
      
      toast({
        title: "✅ Dados Salvos",
        description: `Dados salvos com sucesso no ${type}Storage!`,
        className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-600 shadow-lg",
      });
    } catch (error) {
      toast({
        title: "❌ Erro",
        description: `Erro ao salvar dados no ${type}Storage`,
        variant: "destructive",
      });
    }
  };

  const handleClearData = async (type: 'local' | 'session' | 'indexed') => {
    try {
      switch (type) {
        case 'local':
          localStorage.remove('demo-data');
          break;
        case 'session':
          sessionStorage.remove('demo-data');
          break;
        case 'indexed':
          await indexedStorage.remove('demo-data');
          break;
      }

      setDemoData(prev => ({ ...prev, [type]: '' }));
      
      toast({
        title: "🗑️ Dados Removidos",
        description: `Dados removidos do ${type}Storage!`,
        className: "bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-blue-600 shadow-lg",
      });
    } catch (error) {
      toast({
        title: "❌ Erro",
        description: `Erro ao remover dados do ${type}Storage`,
        variant: "destructive",
      });
    }
  };

  const handleCleanup = () => {
    cleanupExpiredData();
    toast({
      title: "🧹 Limpeza Concluída",
      description: "Dados expirados foram removidos!",
      className: "bg-gradient-to-r from-purple-500 to-pink-600 text-white border-purple-600 shadow-lg",
    });
  };

  const addDemoPlayer = () => {
    const newPlayer = {
      id: Date.now(),
      name: `Jogador Demo ${players.length + 1}`,
      nickname: `Demo${players.length + 1}`,
      birthDate: new Date().toISOString().split('T')[0],
      isGuest: false,
      sport: "futebol",
      selectedPositions: ["atacante"],
      rating: 5 as Rating,
      includeInDraw: true,
      present: true,
      paid: false,
      registered: true,
      selected: false,
      createdAt: new Date().toISOString(),
    };

    addPlayer(newPlayer);
    toast({
      title: "👤 Jogador Adicionado",
      description: `${newPlayer.name} foi adicionado ao localStorage!`,
      className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-600 shadow-lg",
    });
  };

  const addDemoMatch = () => {
    const newMatch = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      teams: ["Time A", "Time B"],
      scores: [2, 1],
      players: ["Jogador 1", "Jogador 2", "Jogador 3"],
      duration: 90,
      notes: "Partida de demonstração",
    };

    addMatch(newMatch);
    toast({
      title: "⚽ Partida Adicionada",
      description: "Nova partida salva no IndexedDB!",
      className: "bg-gradient-to-r from-orange-500 to-red-600 text-white border-orange-600 shadow-lg",
    });
  };

  const addDemoSessionData = () => {
    const key = `temp-data-${Date.now()}`;
    const data = `Dados temporários - ${new Date().toLocaleTimeString()}`;
    
    setTemporaryData(key, data);
    toast({
      title: "📝 Dados Temporários",
      description: "Dados salvos no sessionStorage!",
      className: "bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-yellow-600 shadow-lg",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <BackToDashboard />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Demonstração de Armazenamento
        </h1>
        <p className="text-gray-600">
          Teste diferentes tipos de armazenamento temporário
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex justify-center space-x-2">
        {(['local', 'session', 'indexed'] as const).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "outline"}
            onClick={() => setActiveTab(tab)}
            className="capitalize"
          >
            {tab}Storage
          </Button>
        ))}
      </div>

      {/* Conteúdo das Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* localStorage */}
        <Card className="border-2 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                localStorage
              </Badge>
              Persistente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-600">
              <p>• Dados persistem entre sessões</p>
              <p>• Limite: ~5-10MB</p>
              <p>• Ideal para configurações</p>
            </div>
            
            <div className="space-y-2">
              <Button onClick={() => handleSaveData('local')} className="w-full">
                Salvar Dados
              </Button>
              <Button 
                onClick={() => handleClearData('local')} 
                variant="outline" 
                className="w-full"
              >
                Limpar Dados
              </Button>
              <Button onClick={addDemoPlayer} className="w-full">
                Adicionar Jogador
              </Button>
            </div>

            {demoData.local && (
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-800">Dados Salvos:</p>
                <p className="text-xs text-green-600 mt-1">{demoData.local}</p>
              </div>
            )}

            <div className="text-xs text-gray-500">
              Jogadores: {players.length}
            </div>
          </CardContent>
        </Card>

        {/* sessionStorage */}
        <Card className="border-2 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                sessionStorage
              </Badge>
              Temporário
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-600">
              <p>• Dados perdidos ao fechar aba</p>
              <p>• Limite: ~5-10MB</p>
              <p>• Ideal para dados da sessão</p>
            </div>
            
            <div className="space-y-2">
              <Button onClick={() => handleSaveData('session')} className="w-full">
                Salvar Dados
              </Button>
              <Button 
                onClick={() => handleClearData('session')} 
                variant="outline" 
                className="w-full"
              >
                Limpar Dados
              </Button>
              <Button onClick={addDemoSessionData} className="w-full">
                Adicionar Dados Temp
              </Button>
            </div>

            {demoData.session && (
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">Dados Salvos:</p>
                <p className="text-xs text-yellow-600 mt-1">{demoData.session}</p>
              </div>
            )}

            <div className="text-xs text-gray-500">
              Dados temporários: {Object.keys(temporaryData).length}
            </div>
          </CardContent>
        </Card>

        {/* IndexedDB */}
        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                IndexedDB
              </Badge>
              Grande Volume
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-600">
              <p>• Banco de dados no navegador</p>
              <p>• Limite: ~50MB-1GB</p>
              <p>• Ideal para dados complexos</p>
            </div>
            
            <div className="space-y-2">
              <Button onClick={() => handleSaveData('indexed')} className="w-full">
                Salvar Dados
              </Button>
              <Button 
                onClick={() => handleClearData('indexed')} 
                variant="outline" 
                className="w-full"
              >
                Limpar Dados
              </Button>
              <Button onClick={addDemoMatch} className="w-full">
                Adicionar Partida
              </Button>
            </div>

            {demoData.indexed && (
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-800">Dados Salvos:</p>
                <p className="text-xs text-purple-600 mt-1">{demoData.indexed}</p>
              </div>
            )}

            <div className="text-xs text-gray-500">
              Partidas: {matchHistory.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações Globais */}
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Ações Globais
            </Badge>
            Utilitários
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={handleCleanup} className="w-full">
              🧹 Limpar Dados Expirados
            </Button>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline" 
              className="w-full"
            >
              🔄 Recarregar Página
            </Button>
            <Button 
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
              }} 
              variant="destructive" 
              className="w-full"
            >
              🗑️ Limpar Tudo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 