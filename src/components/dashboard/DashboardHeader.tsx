import { useState } from 'react';
import { Edit2, Settings, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useDashboardStore } from '@/stores/useDashboardStore';

interface DashboardHeaderProps {
  isAdmin: boolean;
  dashboardTitle: string;
  setDashboardTitle: (title: string) => void;
}

export const DashboardHeader = ({ isAdmin, dashboardTitle, setDashboardTitle }: DashboardHeaderProps) => {
  const { isEditing, newTitle, setIsEditing, setNewTitle } = useDashboardStore();

  const handleTitleEdit = () => {
    if (!isAdmin) {
      toast.error("Apenas administradores podem editar o título");
      return;
    }
    setIsEditing(true);
  };

  const handleTitleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTitle !== dashboardTitle) {
      setDashboardTitle(newTitle);
      toast.success("Título atualizado com sucesso!");
    }
    setIsEditing(false);
  };

  const handleTitleCancel = () => {
    setIsEditing(false);
    setNewTitle(dashboardTitle);
  };

  return (
    <div className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
            <Crown className="h-8 w-8 text-white" />
          </div>
          
          <div className="flex-1">
            {isEditing ? (
              <form onSubmit={handleTitleSave} className="flex items-center gap-3">
                <Input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="text-2xl font-bold bg-white/80 border-2 border-blue-200 rounded-xl px-4 py-2 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Salvar
                  </Button>
                  <Button 
                    type="button" 
                    size="sm" 
                    onClick={handleTitleCancel}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {dashboardTitle}
                </h1>
                {isAdmin && (
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleTitleEdit}
                    className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200"
                  >
                    <Edit2 className="h-5 w-5" />
                  </motion.button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl">
              <Crown className="h-4 w-4" />
              <span className="text-sm font-medium">Administrador</span>
            </div>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 rounded-xl shadow-md border border-white/50 transition-all duration-200"
          >
            <Settings className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};