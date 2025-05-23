import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStatisticsStore } from "@/stores/zustand_stores";
import { usePlayerStore } from "@/stores/zustand_stores";
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
} from "recharts";
import { springConfig } from '../utils/animations'; // Importando springConfig
import { Users, UserCheck, UserX } from 'lucide-react'; // Importando ícones para os cards de estatísticas

const Statistics = () => {
  const { generatePlayerStats, generatePositionStats, generateRatingStats } =
    useStatisticsStore();
  const { players } = usePlayerStore();

  // Memoiza a geração das estatísticas para evitar recalculos desnecessários
  const playerStats = useMemo(() => generatePlayerStats(players), [generatePlayerStats, players]);
  const positionStats = useMemo(() => generatePositionStats(players), [generatePositionStats, players]);
  const ratingStats = useMemo(() => generateRatingStats(players), [generateRatingStats, players]);

  // Cores personalizadas para os gráficos (pode ser expandido)
  const COLORS = [
    "#0088FE", // Azul
    "#00C49F", // Verde
    "#FFBB28", // Laranja
    "#FF8042", // Laranja avermelhado
    "#8884D8", // Roxo claro
    "#82CA9D", // Verde claro
    "#FF6B6B", // Vermelho
    "#6B66FF", // Azul violeta
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="min-h-screen p-4 sm:p-0" // Adicionado padding para telas menores
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Cards de Estatísticas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-lg border border-gray-100 rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" aria-hidden="true" />
                Total de Jogadores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-extrabold text-blue-700">{players.length}</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-gray-100 rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-green-600" aria-hidden="true" />
                Jogadores Fixos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-extrabold text-green-700">
                {players.filter((p) => !p.isGuest).length}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-gray-100 rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <UserX className="h-5 w-5 text-orange-600" aria-hidden="true" />
                Convidados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-extrabold text-orange-700">
                {players.filter((p) => p.isGuest).length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Presença dos Jogadores */}
        <Card className="shadow-lg border border-gray-100 rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800">Presença dos Jogadores</CardTitle>
          </CardHeader>
          <CardContent>
            {playerStats.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                Nenhum dado de presença disponível. Adicione jogadores e registre presenças.
              </div>
            ) : (
              <div className="h-[400px] w-full"> {/* Garante que o div tenha altura e largura */}
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={playerStats}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 60, // Aumentado para acomodar labels rotacionados
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" /> {/* Cor da grade */}
                    <XAxis
                      dataKey="name"
                      angle={-45} // Rotação das labels do eixo X
                      textAnchor="end"
                      height={70}
                      interval={0} // Garante que todas as labels sejam exibidas
                      tick={{ fill: '#6b7280', fontSize: 12 }} // Estilo das labels
                    />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <Tooltip
                      cursor={{ fill: 'rgba(0,0,0,0.05)' }} // Estilo do cursor do tooltip
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                      labelStyle={{ fontWeight: 'bold', color: '#333' }}
                      itemStyle={{ color: '#555' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} /> {/* Espaçamento da legenda */}
                    <Bar dataKey="presences" fill="#2563eb" name="Presenças" radius={[4, 4, 0, 0]} /> {/* Cores e bordas arredondadas */}
                    <Bar dataKey="absences" fill="#ef4444" name="Ausências" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Gráficos de Posições e Avaliações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-lg border border-gray-100 rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800">Distribuição por Posição</CardTitle>
            </CardHeader>
            <CardContent>
              {positionStats.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  Nenhum dado de posição disponível. Adicione posições aos jogadores.
                </div>
              ) : (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={positionStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false} // Remover a linha do label para um visual mais limpo
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={100} // Aumentado o raio externo
                        innerRadius={60} // Adicionado um raio interno para um efeito de "donut"
                        paddingAngle={5} // Espaçamento entre as fatias
                        dataKey="value"
                      >
                        {positionStats.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            stroke="#fff" // Borda branca entre as fatias
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [
                          value,
                          `${name} Jogadores`, // Exibe "X Jogadores"
                        ]}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                        labelStyle={{ fontWeight: 'bold', color: '#333' }}
                        itemStyle={{ color: '#555' }}
                      />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-gray-100 rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800">Distribuição por Avaliação</CardTitle>
            </CardHeader>
            <CardContent>
              {ratingStats.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  Nenhum dado de avaliação disponível. Avalie os jogadores.
                </div>
              ) : (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ratingStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={100}
                        innerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {ratingStats.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            stroke="#fff"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [
                          value,
                          `${name} Jogadores`,
                        ]}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                        labelStyle={{ fontWeight: 'bold', color: '#333' }}
                        itemStyle={{ color: '#555' }}
                      />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default Statistics;
