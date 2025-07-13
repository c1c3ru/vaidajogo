import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Users } from 'lucide-react';
import { Team } from '@/types/types';

interface TeamListProps {
  teams: Team[];
  onEdit?: (team: Team) => void;
  onRemove?: (teamId: string) => void;
}

const TeamList: React.FC<TeamListProps> = ({ teams, onEdit, onRemove }) => {
  if (teams.length === 0) {
    return (
      <div className="text-center py-8">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Nenhum time cadastrado</p>
        <p className="text-sm text-gray-400">Adicione times para começar o campeonato</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {teams.map((team, index) => (
        <motion.div
          key={team.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">
                  {team.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">{team.name}</p>
                <p className="text-sm text-gray-600">Responsável: {team.responsible}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(team)}
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            
            {onRemove && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRemove(team.id)}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TeamList;