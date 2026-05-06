import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockEcosystems } from '@avp/mocks';
import { mockUsers } from '@avp/mocks';
import type { Ecosystem } from '@avp/api-client';
import { Button } from '@avp/ui';
import { Input } from '@avp/ui';
import { useEcosystemStore } from '../store/useEcosystemStore';
import {
  Globe,
  Plus,
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Palette,
  UserCog,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export default function EcosystemsPage() {
  const [ecosystems] = useState<Ecosystem[]>(mockEcosystems);
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { setActiveEcosystem } = useEcosystemStore();
  const navigate = useNavigate();

  const filtered = ecosystems.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  const getSecretary = (id: string | null) =>
    mockUsers.find((u) => u.id === id);

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 relative z-10">
        <div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600 mb-1">
            Ecosistemas
          </h1>
          <p className="text-text-muted font-medium">
            Gestione los ecosistemas de la plataforma.
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="hover-lift shadow-md bg-primary hover:bg-primary/90 text-white">
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Ecosistema
        </Button>
      </motion.div>

      {/* Search */}
      <motion.div variants={fadeUp} className="relative z-10">
        <div className="relative max-w-md group hover-lift shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-text-muted/60 group-focus-within:text-primary transition-colors" />
          </div>
          <Input
            placeholder="Buscar ecosistema por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-12 text-base bg-white/70 backdrop-blur-md border-border/50 rounded-xl"
          />
        </div>
      </motion.div>

      {/* Ecosystem Cards */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
        {filtered.map((eco) => {
          const secretary = getSecretary(eco.secretaryId);
          return (
            <div
              key={eco.id}
              className="glass-panel p-6 rounded-2xl hover-lift border border-border/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundColor: eco.primaryColor }}
                  >
                    <Globe className="w-6 h-6 text-white drop-shadow-sm" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-text group-hover:text-primary transition-colors">{eco.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {eco.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-success/10 text-success border border-success/20">
                          <CheckCircle className="w-3 h-3" /> Activo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-destructive/10 text-destructive border border-destructive/20">
                          <XCircle className="w-3 h-3" /> Inactivo
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-slate-100/80 text-text-muted transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-text-muted/80 font-medium mt-5 line-clamp-2 min-h-[40px]">
                {eco.description}
              </p>

              <div className="mt-6 pt-5 border-t border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-border/50 flex items-center justify-center text-text-muted">
                    <UserCog className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-text-muted/70 tracking-wider">Secretario</span>
                    <span className="text-xs font-bold text-text truncate max-w-[120px]">
                      {secretary
                        ? `${secretary.firstName} ${secretary.lastName}`
                        : 'Sin asignar'}
                    </span>
                  </div>
                </div>
                <Button
                  className="bg-white hover:bg-primary text-primary hover:text-white border border-primary/20 shadow-sm transition-all duration-300 rounded-lg px-4"
                  onClick={() => {
                    setActiveEcosystem(eco);
                    navigate('/eco/dashboard');
                  }}
                >
                  <span className="font-bold">Ingresar</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Create Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface rounded-lg border border-border shadow-lg w-full max-w-lg mx-4 p-6"
          >
            <h2 className="text-lg font-semibold text-text mb-4">
              Nuevo Ecosistema
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Nombre</label>
                <Input placeholder="Ej: Ecosistema Cusco Imperial" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Descripción</label>
                <textarea
                  className="flex w-full rounded-md border border-border bg-surface px-3 py-2 text-sm placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-h-[80px]"
                  placeholder="Descripción del ecosistema..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Propósito</label>
                <Input placeholder="Objetivo principal del ecosistema" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text">Color Primario</label>
                  <div className="flex items-center gap-2">
                    <input type="color" defaultValue="#2563EB" className="w-10 h-10 rounded cursor-pointer" />
                    <Input defaultValue="#2563EB" className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text">Secretario</label>
                  <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <option value="">Seleccionar...</option>
                    {mockUsers
                      .filter((u) => u.role === 'SECRETARY')
                      .map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.firstName} {u.lastName}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setShowCreateModal(false)}>
                Crear Ecosistema
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
