import React, { useState } from 'react';
import { mockIndicators, mockObjectives, mockEcosystems } from '@avp/mocks';
import type { Indicator } from '@avp/api-client';
import { Button } from '@avp/ui';
import { Input } from '@avp/ui';
import {
  BarChart3,
  Plus,
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  Upload,
  Filter,
  ArrowUpRight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { motion } from 'framer-motion';

// ─── Mock time-series data for charts ──────────────────────
const timeSeriesData = [
  { month: 'Ene', desempleo: 8.1, ica: 102, agua: 91.5 },
  { month: 'Feb', desempleo: 7.9, ica: 98, agua: 92.0 },
  { month: 'Mar', desempleo: 7.8, ica: 95, agua: 92.8 },
  { month: 'Abr', desempleo: 7.5, ica: 90, agua: 93.5 },
  { month: 'May', desempleo: 7.4, ica: 88, agua: 93.9 },
  { month: 'Jun', desempleo: 7.2, ica: 82, agua: 94.3 },
];

const sourceDistribution = [
  { name: 'API', value: 3, color: '#2563EB' },
  { name: 'CSV', value: 1, color: '#D97706' },
  { name: 'Manual', value: 1, color: '#64748B' },
];

const trendIcon: Record<string, React.ReactNode> = {
  up: <TrendingUp className="w-4 h-4 text-success" />,
  down: <TrendingDown className="w-4 h-4 text-destructive" />,
  stable: <Minus className="w-4 h-4 text-text-muted" />,
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export default function IndicatorsPage() {
  const [search, setSearch] = useState('');
  const [ecoFilter, setEcoFilter] = useState('eco-lima');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filtered = mockIndicators
    .filter((i) => i.ecosystemId === ecoFilter)
    .filter((i) =>
      i.name.toLowerCase().includes(search.toLowerCase())
    );

  const getObjective = (id: string) =>
    mockObjectives.find((o) => o.id === id);

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 relative z-10">
        <div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600 mb-1">
            Indicadores
          </h1>
          <p className="text-text-muted font-medium">
            Monitoreo y gestión de indicadores estratégicos.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="hover-lift shadow-sm bg-white border-border/50 text-text">
            <Upload className="w-5 h-5 mr-2" />
            Importar CSV
          </Button>
          <Button onClick={() => setShowCreateModal(true)} className="hover-lift shadow-md bg-primary hover:bg-primary/90 text-white">
            <Plus className="w-5 h-5 mr-2" />
            Nuevo Indicador
          </Button>
        </div>
      </motion.div>

      {/* Charts Row */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* Line Chart — Trends */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl hover-lift">
          <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-6">
            Tendencia de Indicadores
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B', fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748B', fontWeight: 600 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              />
              <Line
                type="monotone"
                dataKey="desempleo"
                stroke="#4F46E5"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
                name="Desempleo %"
              />
              <Line
                type="monotone"
                dataKey="agua"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
                name="Agua Potable %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart — Source Distribution */}
        <div className="glass-panel p-6 rounded-2xl hover-lift">
          <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-6">
            Fuente de Datos
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={sourceDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {sourceDistribution.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                itemStyle={{ fontWeight: 600 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-6">
            {sourceDistribution.map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: s.color }} />
                <span className="text-xs font-bold text-text-muted">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bar Chart — Current Values */}
      <motion.div variants={fadeUp} className="glass-panel p-6 rounded-2xl hover-lift relative z-10">
        <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-6">
          Valores Actuales
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={filtered.map((i) => ({ name: i.name.slice(0, 15) + '...', value: i.value }))} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748B', fontWeight: 600 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }}
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                fontSize: 12,
                fontWeight: 600,
              }}
            />
            <Bar dataKey="value" fill="#4F46E5" radius={[6, 6, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 relative z-10">
        <div className="relative flex-1 max-w-sm group hover-lift shadow-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted/60 group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Buscar indicador..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-12 text-base bg-white/70 backdrop-blur-md border-border/50 rounded-xl"
          />
        </div>
        <select
          value={ecoFilter}
          onChange={(e) => setEcoFilter(e.target.value)}
          className="h-12 rounded-xl border border-border/50 bg-white/70 backdrop-blur-md px-4 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm hover-lift"
        >
          {mockEcosystems.map((eco) => (
            <option key={eco.id} value={eco.id}>{eco.name}</option>
          ))}
        </select>
      </motion.div>

      {/* Indicators Table */}
      <motion.div variants={fadeUp} className="glass-panel rounded-2xl overflow-hidden shadow-sm relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-slate-50/50 text-left">
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Indicador</th>
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Objetivo</th>
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Valor</th>
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Δ Anterior</th>
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Fuente</th>
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Actualización</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 bg-white/20">
              {filtered.map((ind) => {
                const obj = getObjective(ind.objectiveId);
                const delta =
                  ind.previousValue !== null
                    ? ind.value - ind.previousValue
                    : null;
                return (
                  <tr key={ind.id} className="hover:bg-white/60 transition-colors duration-200 group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                          {trendIcon[ind.trend]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-text group-hover:text-primary transition-colors">{ind.name}</p>
                          <p className="text-xs font-medium text-text-muted mt-1 line-clamp-1">{ind.description.slice(0, 50)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-text-muted/80 bg-slate-50 border border-border/40 px-2 py-1 rounded-md">
                        {obj?.name || '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-text bg-white px-2 py-1 rounded-md shadow-sm border border-border/50">
                        {ind.value} <span className="text-xs font-bold text-text-muted">{ind.unit}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {delta !== null ? (
                        <span className={`inline-flex items-center gap-1 text-sm font-bold px-2 py-0.5 rounded-md ${delta > 0 ? 'bg-success/10 text-success' : delta < 0 ? 'bg-destructive/10 text-destructive' : 'bg-slate-100 text-text-muted'}`}>
                          {delta > 0 ? '+' : ''}{delta.toFixed(1)}
                        </span>
                      ) : (
                        <span className="text-xs text-text-muted font-bold">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-bold tracking-wider uppercase bg-primary-light text-primary border border-primary/10 shadow-sm">
                        {ind.dataSourceType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-text-muted">
                      {new Date(ind.lastUpdated).toLocaleDateString('es-PE', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface rounded-lg border border-border shadow-lg w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-lg font-semibold text-text mb-4">Nuevo Indicador</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Nombre</label>
                <Input placeholder="Ej: Tasa de Desempleo Juvenil" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Descripción</label>
                <textarea className="flex w-full rounded-md border border-border bg-surface px-3 py-2 text-sm placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[80px]" placeholder="Descripción del indicador..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text">Valor Actual</label>
                  <Input type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text">Unidad</label>
                  <Input placeholder="%, puntos, ton/hab..." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text">Objetivo Estratégico</label>
                  <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    {mockObjectives.map((o) => (
                      <option key={o.id} value={o.id}>{o.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text">Fuente de Datos</label>
                  <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <option value="manual">Manual</option>
                    <option value="csv">CSV</option>
                    <option value="api">API</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>Cancelar</Button>
              <Button onClick={() => setShowCreateModal(false)}>Crear Indicador</Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
