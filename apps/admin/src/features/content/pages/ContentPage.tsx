import React, { useState } from 'react';
import { mockEcosystems } from '@avp/mocks';
import { Button } from '@avp/ui';
import { Input } from '@avp/ui';
import {
  FileText,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  Globe,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock content pages
interface ContentPage {
  id: string;
  ecosystemId: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  author: string;
  lastModified: string;
  excerpt: string;
}

const mockContentPages: ContentPage[] = [
  {
    id: 'page-001',
    ecosystemId: 'eco-lima',
    title: 'Plan de Desarrollo Urbano 2026-2030',
    slug: 'plan-desarrollo-urbano',
    status: 'published',
    author: 'María Gutiérrez',
    lastModified: '2026-04-20T10:00:00Z',
    excerpt: 'El plan estratégico de desarrollo urbano establece las líneas de acción para la transformación...',
  },
  {
    id: 'page-002',
    ecosystemId: 'eco-lima',
    title: 'Informe de Gestión Q1 2026',
    slug: 'informe-gestion-q1',
    status: 'published',
    author: 'Jorge Ramírez',
    lastModified: '2026-04-15T14:30:00Z',
    excerpt: 'Resumen ejecutivo de los avances en los indicadores estratégicos durante el primer trimestre...',
  },
  {
    id: 'page-003',
    ecosystemId: 'eco-lima',
    title: 'Metodología de Indicadores',
    slug: 'metodologia-indicadores',
    status: 'draft',
    author: 'María Gutiérrez',
    lastModified: '2026-04-25T09:00:00Z',
    excerpt: 'Documento técnico que describe la metodología de cálculo y fuentes de datos para cada indicador...',
  },
  {
    id: 'page-004',
    ecosystemId: 'eco-arequipa',
    title: 'Estrategia de Sostenibilidad Ambiental',
    slug: 'estrategia-sostenibilidad',
    status: 'published',
    author: 'Roberto Flores',
    lastModified: '2026-04-10T11:00:00Z',
    excerpt: 'Marco estratégico para la reducción de emisiones y gestión hídrica en la región Arequipa...',
  },
];

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export default function ContentPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const navigate = useNavigate();

  const filtered = mockContentPages
    .filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) => statusFilter === 'all' || p.status === statusFilter);

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 relative z-10">
        <div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600 mb-1">Contenido</h1>
          <p className="text-text-muted font-medium">
            Gestione las páginas y documentos del ecosistema.
          </p>
        </div>
        <Button className="hover-lift shadow-md bg-primary hover:bg-primary/90 text-white">
          <Plus className="w-5 h-5 mr-2" />
          Nueva Página
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
        <div className="glass-panel p-6 rounded-2xl hover-lift">
          <p className="text-sm font-bold text-text-muted uppercase tracking-wider">Total Páginas</p>
          <p className="text-4xl font-black text-text tracking-tight mt-2">{mockContentPages.length}</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl hover-lift">
          <p className="text-sm font-bold text-text-muted uppercase tracking-wider">Publicadas</p>
          <p className="text-4xl font-black text-success tracking-tight mt-2">
            {mockContentPages.filter((p) => p.status === 'published').length}
          </p>
        </div>
        <div className="glass-panel p-6 rounded-2xl hover-lift">
          <p className="text-sm font-bold text-text-muted uppercase tracking-wider">Borradores</p>
          <p className="text-4xl font-black text-warning tracking-tight mt-2">
            {mockContentPages.filter((p) => p.status === 'draft').length}
          </p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 relative z-10">
        <div className="relative flex-1 max-w-sm group hover-lift shadow-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted/60 group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Buscar página..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-12 text-base bg-white/70 backdrop-blur-md border-border/50 rounded-xl"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-12 rounded-xl border border-border/50 bg-white/70 backdrop-blur-md px-4 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm hover-lift"
        >
          <option value="all">Todos los estados</option>
          <option value="published">Publicados</option>
          <option value="draft">Borradores</option>
        </select>
      </motion.div>

      {/* Content List */}
      <motion.div variants={fadeUp} className="space-y-4 relative z-10">
        {filtered.map((page) => {
          const eco = mockEcosystems.find((e) => e.id === page.ecosystemId);
          return (
            <div
              key={page.id}
              className="glass-panel rounded-2xl border border-border/50 p-6 hover-lift transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg text-text group-hover:text-primary transition-colors truncate">{page.title}</h3>
                    {page.status === 'published' ? (
                      <span className="inline-flex px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-success/10 text-success border border-success/20 shrink-0">
                        Publicado
                      </span>
                    ) : (
                      <span className="inline-flex px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-warning/10 text-warning border border-warning/20 shrink-0">
                        Borrador
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-muted/80 font-medium line-clamp-1 mb-4">{page.excerpt}</p>
                  
                  <div className="flex flex-wrap items-center gap-6 text-xs text-text-muted font-medium bg-slate-50/50 p-2.5 rounded-lg border border-border/40 inline-flex">
                    <span className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-primary" />
                      {eco?.name.replace('Ecosistema ', '') || '—'}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      {new Date(page.lastModified).toLocaleDateString('es-PE', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>Por <span className="font-bold">{page.author}</span></span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end md:justify-start border-t md:border-t-0 border-border/50 pt-4 md:pt-0">
                  <button className="p-2.5 rounded-xl bg-white hover:bg-slate-100 border border-border/50 text-text-muted hover:text-text shadow-sm transition-all" title="Vista previa">
                    <Eye className="w-4 h-4" />
                  </button>
                  <Button 
                    variant="outline"
                    className="gap-2 shadow-sm border-border/50 bg-white"
                    onClick={() => navigate('/eco/content/editor')}
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Editar Maquetación</span>
                  </Button>
                  <button className="p-2.5 rounded-xl bg-white hover:bg-red-50 border border-border/50 text-text-muted hover:text-destructive shadow-sm transition-all" title="Eliminar">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-16 glass-panel rounded-2xl relative z-10">
          <FileText className="w-12 h-12 text-text-muted/40 mx-auto mb-4" />
          <p className="text-sm font-medium text-text-muted">No se encontraron páginas.</p>
        </div>
      )}
    </motion.div>
  );
}
