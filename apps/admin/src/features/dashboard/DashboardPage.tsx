import React from 'react';
import { mockIndicators } from '@avp/mocks';
import { Button } from '@avp/ui';
import { TrendingUp, TrendingDown, Minus, Users, Globe, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const trendIcon = {
  up: <TrendingUp className="w-4 h-4 text-success" />,
  down: <TrendingDown className="w-4 h-4 text-destructive" />,
  stable: <Minus className="w-4 h-4 text-text-muted" />,
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function DashboardPage() {
  const limaIndicators = mockIndicators.filter((i) => i.ecosystemId === 'eco-lima');

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="flex justify-between items-end relative z-10">
        <div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600 mb-1">
            Dashboard
          </h1>
          <p className="text-text-muted font-medium">
            Resumen de indicadores del ecosistema.
          </p>
        </div>
        <Button className="hover-lift shadow-md bg-white text-primary border border-primary/20 hover:bg-primary/5">Descargar Reporte</Button>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <div className="glass-panel p-6 rounded-2xl hover-lift">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider">Usuarios Activos</h3>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-4xl font-black text-text tracking-tight mb-2">1,245</p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-md">
              <TrendingUp className="w-3 h-3" /> +12.5%
            </span>
            <span className="text-xs text-text-muted font-medium">vs mes anterior</span>
          </div>
        </div>
        <div className="glass-panel p-6 rounded-2xl hover-lift">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider">Ecosistemas</h3>
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-indigo-500" />
            </div>
          </div>
          <p className="text-4xl font-black text-text tracking-tight mb-2">2</p>
          <p className="text-xs text-text-muted font-medium bg-slate-100 px-2 py-1 rounded-md inline-block">Lima Metropolitana, Arequipa</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl hover-lift">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider">Indicadores</h3>
            <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-brand" />
            </div>
          </div>
          <p className="text-4xl font-black text-text tracking-tight mb-2">{mockIndicators.length}</p>
          <p className="text-xs text-text-muted font-medium bg-slate-100 px-2 py-1 rounded-md inline-block">Monitoreados activamente</p>
        </div>
      </motion.div>

      {/* Indicators Table */}
      <motion.div variants={fadeUp} className="glass-panel rounded-2xl overflow-hidden shadow-sm relative z-10">
        <div className="px-6 py-5 border-b border-border/50 bg-white/40 backdrop-blur-md">
          <h2 className="text-lg font-bold text-text flex items-center gap-2">
            <div className="w-2 h-6 bg-primary rounded-full" />
            Indicadores — Lima Metropolitana
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-slate-50/50 text-left">
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">
                  Indicador
                </th>
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">
                  Tendencia
                </th>
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">
                  Fuente
                </th>
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">
                  Última Actualización
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 bg-white/20">
              {limaIndicators.map((indicator) => (
                <tr key={indicator.id} className="hover:bg-white/60 transition-colors duration-200 group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-text group-hover:text-primary transition-colors">{indicator.name}</p>
                    <p className="text-xs text-text-muted font-medium mt-1">{indicator.description.slice(0, 60)}...</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-text bg-white px-2 py-1 rounded-md shadow-sm border border-border/50">
                      {indicator.value} {indicator.unit}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 font-bold">
                      {trendIcon[indicator.trend]}
                      <span className="text-xs capitalize text-text-muted">{indicator.trend}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-primary-light text-primary border border-primary/10 shadow-sm">
                      {indicator.dataSourceType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-muted font-medium">
                    {new Date(indicator.lastUpdated).toLocaleDateString('es-PE', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
