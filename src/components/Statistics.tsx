import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStatisticsStore } from "@/stores/useStatisticsStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { springConfig } from '@/utils/animations';
import { Users, UserCheck, UserX, TrendingUp, Award, Activity } from 'lucide-react';
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { BackToDashboard } from './BackToDashboard';
import { useTexts } from "@/hooks/useTexts";

const Statistics = () => {
  const TEXTS = useTexts();
  const { generatePlayerStats, generatePositionStats, generateRatingStats } = useStatisticsStore();
  const { players } = usePlayerStore();
  const [chartType, setChartType] = useState<'bar' | 'pie' | 'line' | 'area'>('bar');
  const [selectedMetric, setSelectedMetric] = useState<'presence' | 'position' | 'rating'>('presence');

  // Cores personalizadas para os gráficos
  // Mesma paleta do app mobile (`mobile/lib/core/theme/app_theme.dart`)
  const COLORS = [
    "#00F0FF", // Primária (ciano)
    "#7000FF", // Secundária (roxo)
    "#FF003C", // Destaque (vermelho)
    "#4CAF50", // Verde (pagamento)
    "#FFBB28", // Laranja
    "#00B3FF", // Azul
    "#FF6B6B", // Vermelho claro
    "#8F9BB3", // Neutro
  ];

  // Calcula estatísticas gerais
  const generalStats = useMemo(() => {
    const totalPlayers = players.length;
    const presentPlayers = players.filter(p => p.present).length;
    const guestPlayers = players.filter(p => p.isGuest).length;
    const averageRating = players.reduce((acc, p) => acc + (p.rating || 0), 0) / totalPlayers || 0;

    return {
      total: totalPlayers,
      present: presentPlayers,
      absent: totalPlayers - presentPlayers,
      guests: guestPlayers,
      averageRating: averageRating.toFixed(1)
    };
  }, [players]);

  // Renderiza o gráfico baseado no tipo selecionado
  const renderChart = (data: Array<{ name: string; value: number }>) => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    switch (chartType) {
      case 'pie':
        return (
          <PieChart {...commonProps}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#00F0FF"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#00F0FF" strokeWidth={2} />
          </LineChart>
        );
      
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="value" stroke="#00F0FF" fill="#00F0FF" fillOpacity={0.6} />
          </AreaChart>
        );
      
      default: // bar
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#00F0FF">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        );
    }
  };

  // Obtém os dados do gráfico baseado na métrica selecionada
  const getChartData = () => {
    switch (selectedMetric) {
      case 'presence': {
        const stats = generatePlayerStats(players);
        return [
          { name: 'Presentes', value: stats.filter(s => s.presences).length },
          { name: 'Ausentes', value: stats.filter(s => s.absences).length }
        ];
      }
      case 'position':
        return generatePositionStats(players);
      case 'rating':
        return generateRatingStats(players);
      default:
        return [];
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="min-h-screen p-4 sm:p-6"
    >
      <BackToDashboard />
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Cabeçalho */}
        <Card className="shadow-lg border border-border rounded-xl">
          <CardHeader className="bg-card/60 rounded-t-xl">
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Activity className="h-6 w-6 text-purple-400" />
              {TEXTS.PAGE_TITLES.STATISTICS}
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Visualize estatísticas detalhadas sobre jogadores, presenças e desempenho.
            </p>
          </CardHeader>
        </Card>

        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-lg border border-blue-500/30 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Total de Jogadores</p>
                  <p className="text-2xl font-bold text-foreground">{generalStats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-green-500/30 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <UserCheck className="h-8 w-8 text-green-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Presentes</p>
                  <p className="text-2xl font-bold text-foreground">{generalStats.present}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-red-500/30 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <UserX className="h-8 w-8 text-red-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Ausentes</p>
                  <p className="text-2xl font-bold text-foreground">{generalStats.absent}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-orange-500/30 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-orange-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Avaliação Média</p>
                  <p className="text-2xl font-bold text-foreground">{generalStats.averageRating}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controles do Gráfico */}
        <Card className="shadow-lg border border-border rounded-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Configurações do Gráfico
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Tipo de Gráfico</label>
                <Select value={chartType} onValueChange={(value: "bar" | "pie" | "line" | "area") => setChartType(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Barras</SelectItem>
                    <SelectItem value="pie">Pizza</SelectItem>
                    <SelectItem value="line">Linha</SelectItem>
                    <SelectItem value="area">Área</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Métrica</label>
                <Select value={selectedMetric} onValueChange={(value: "presence" | "position" | "rating") => setSelectedMetric(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a métrica" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="presence">Presença</SelectItem>
                    <SelectItem value="position">Posições</SelectItem>
                    <SelectItem value="rating">Avaliações</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico */}
        <Card className="shadow-lg border border-border rounded-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-semibold text-foreground">
              Visualização de Dados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                {renderChart(getChartData())}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default Statistics;