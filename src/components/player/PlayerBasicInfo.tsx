import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle } from 'lucide-react';
import { ErrorState } from '@/utils/types';
import { springConfig } from '../../utils/animations'; // Importado springConfig

interface PlayerBasicInfoProps {
  name: string;
  nickname: string;
  birthDate: string;
  isGuest: boolean | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGuestChange: (checked: boolean) => void;
  errors: {
    name: ErrorState;
    isGuest: ErrorState;
  };
}

export const PlayerBasicInfo = ({
  name,
  nickname,
  birthDate,
  isGuest,
  onChange,
  onGuestChange,
  errors
}: PlayerBasicInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="space-y-6 p-4 sm:p-0" // Adicionado padding para telas menores
    >
      {/* Campo Nome Completo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...springConfig, delay: 0.1 }}
      >
        <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1 block">
          Nome Completo *
        </Label>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Ex: João da Silva"
          className={`mt-1 h-10 ${errors.name ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200 border-gray-300"}`}
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
          autoComplete="name" // Adicionado autocomplete
        />
        <AnimatePresence>
          {errors.name && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center gap-1 mt-1 text-red-600"
              id="name-error"
              role="alert"
            >
              <AlertTriangle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <p className="text-sm">Nome é obrigatório.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Campo Apelido */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...springConfig, delay: 0.2 }}
      >
        <Label htmlFor="nickname" className="text-sm font-medium text-gray-700 mb-1 block">
          Apelido
        </Label>
        <Input
          id="nickname"
          name="nickname"
          value={nickname}
          onChange={onChange}
          placeholder="Ex: Jão"
          className="mt-1 h-10 focus:ring-blue-200 border-gray-300"
          autoComplete="nickname" // Adicionado autocomplete
        />
      </motion.div>

      {/* Campo Data de Nascimento */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...springConfig, delay: 0.3 }}
      >
        <Label htmlFor="birthDate" className="text-sm font-medium text-gray-700 mb-1 block">
          Data de Nascimento
        </Label>
        <Input
          id="birthDate"
          name="birthDate"
          type="date"
          value={birthDate}
          onChange={onChange}
          className="mt-1 h-10 focus:ring-blue-200 border-gray-300"
          max={new Date().toISOString().split('T')[0]} // Garante que não é possível selecionar datas futuras
          aria-label="Data de Nascimento do jogador"
        />
      </motion.div>

      {/* Status de Convidado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...springConfig, delay: 0.4 }}
        className="space-y-2"
      >
        <fieldset>
          <legend className="text-sm font-medium text-gray-700 mb-2">
            É convidado? *
          </legend>
          <div className="flex gap-6">
            {[true, false].map((value) => (
              <label
                key={String(value)}
                className="flex items-center gap-2 cursor-pointer text-gray-700"
              >
                <Checkbox
                  checked={isGuest === value}
                  onCheckedChange={() => onGuestChange(value)}
                  className={`h-5 w-5 rounded-md ${errors.isGuest ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-200 focus:ring-offset-2`}
                  aria-invalid={errors.isGuest ? "true" : "false"}
                  aria-label={value ? 'Sim, é convidado' : 'Não, é membro'}
                />
                <span className="text-base">
                  {value ? 'Sim' : 'Não'}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <AnimatePresence>
          {errors.isGuest && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center gap-1 text-red-600"
              role="alert"
            >
              <AlertTriangle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <p className="text-sm">Selecione o status de convidado.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
