import React, { useState } from 'react';
import { mockPolls } from '@avp/mocks';
import type { Poll } from '@avp/api-client';
import { Button } from '@avp/ui';
import { Input } from '@avp/ui';
import {
  Vote,
  Plus,
  Search,
  Clock,
  CheckCircle,
  PlayCircle,
  Archive,
  FileEdit,
  BarChart3,
  Users,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { motion } from 'framer-motion';

const statusConfig: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
  draft: { label: 'Borrador', icon: <FileEdit className="w-3 h-3" />, className: 'bg-slate-100 text-slate-600' },
  scheduled: { label: 'Programada', icon: <Clock className="w-3 h-3" />, className: 'bg-amber-50 text-warning' },
  active: { label: 'Activa', icon: <PlayCircle className="w-3 h-3" />, className: 'bg-green-50 text-success' },
  closed: { label: 'Cerrada', icon: <CheckCircle className="w-3 h-3" />, className: 'bg-primary-light text-primary' },
  archived: { label: 'Archivada', icon: <Archive className="w-3 h-3" />, className: 'bg-slate-50 text-slate-400' },
};

const CHART_COLORS = ['#2563EB', '#16A34A', '#D97706', '#DC2626', '#7C3AED', '#0891B2'];

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export default function PollsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedPoll, setExpandedPoll] = useState<string | null>(null);

  const filtered = mockPolls
    .filter((p) => p.question.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => statusFilter === 'all' || p.status === statusFilter);

  const toggleExpand = (id: string) => {
    setExpandedPoll(expandedPoll === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Votaciones</h1>
          <p className="text-text-muted text-sm">Encuestas y votaciones ponderadas.</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nueva Votación
        </Button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-surface p-4 rounded-lg border border-border">
          <p className="text-sm text-text-muted">Total</p>
          <p className="text-2xl font-bold text-text mt-1">{mockPolls.length}</p>
        </div>
        <div className="bg-surface p-4 rounded-lg border border-border">
          <p className="text-sm text-text-muted">Activas</p>
          <p className="text-2xl font-bold text-success mt-1">
            {mockPolls.filter((p) => p.status === 'active').length}
          </p>
        </div>
        <div className="bg-surface p-4 rounded-lg border border-border">
          <p className="text-sm text-text-muted">Total Votos</p>
          <p className="text-2xl font-bold text-primary mt-1">
            {mockPolls.reduce((acc, p) => acc + p.totalVotes, 0)}
          </p>
        </div>
        <div className="bg-surface p-4 rounded-lg border border-border">
          <p className="text-sm text-text-muted">Programadas</p>
          <p className="text-2xl font-bold text-warning mt-1">
            {mockPolls.filter((p) => p.status === 'scheduled').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input
            placeholder="Buscar votación..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 rounded-md border border-border bg-surface px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <option value="all">Todos los estados</option>
          <option value="active">Activas</option>
          <option value="closed">Cerradas</option>
          <option value="scheduled">Programadas</option>
          <option value="draft">Borradores</option>
        </select>
      </div>

      {/* Polls */}
      <div className="space-y-4">
        {filtered.map((poll) => {
          const status = statusConfig[poll.status];
          const isExpanded = expandedPoll === poll.id;
          const maxVotes = Math.max(...poll.options.map((o) => o.voteCount), 1);

          return (
            <div
              key={poll.id}
              className="bg-surface rounded-lg border border-border overflow-hidden"
            >
              {/* Poll Header */}
              <button
                onClick={() => toggleExpand(poll.id)}
                className="w-full text-left p-5 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-text">{poll.question}</h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${status.className}`}>
                        {status.icon} {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-text-muted line-clamp-1">{poll.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" /> {poll.totalVotes} votos
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(poll.endDate).toLocaleDateString('es-PE', {
                          day: '2-digit', month: 'short', year: 'numeric',
                        })}
                      </span>
                      <span className="capitalize">{poll.type === 'single' ? 'Selección única' : 'Selección múltiple'}</span>
                    </div>
                  </div>
                  <BarChart3 className={`w-5 h-5 transition-colors shrink-0 mt-1 ${isExpanded ? 'text-primary' : 'text-text-muted'}`} />
                </div>
              </button>

              {/* Expanded Results */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-border"
                >
                  <div className="p-5 space-y-4">
                    {/* Inline bar results */}
                    <div className="space-y-3">
                      {poll.options.map((option, idx) => {
                        const pct = poll.totalVotes > 0
                          ? ((option.voteCount / poll.totalVotes) * 100).toFixed(1)
                          : '0.0';
                        return (
                          <div key={option.id}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-text">{option.label}</span>
                              <span className="text-sm text-text-muted">
                                {option.voteCount} votos ({pct}%)
                              </span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Chart */}
                    {poll.totalVotes > 0 && (
                      <div className="pt-4 border-t border-border">
                        <ResponsiveContainer width="100%" height={180}>
                          <BarChart data={poll.options.map((o) => ({ name: o.label.slice(0, 25), votos: o.voteCount }))}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} />
                            <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
                            <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12 }} />
                            <Bar dataKey="votos" radius={[4, 4, 0, 0]}>
                              {poll.options.map((_, idx) => (
                                <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-surface rounded-lg border border-border">
          <Vote className="w-10 h-10 text-text-muted mx-auto mb-3" />
          <p className="text-sm text-text-muted">No se encontraron votaciones.</p>
        </div>
      )}
    </motion.div>
  );
}
