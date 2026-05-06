import React, { useState } from 'react';
import { Button } from '@avp/ui';
import { Input } from '@avp/ui';
import {
  LayoutGrid,
  Type,
  BarChart3,
  Table,
  Image,
  FileText,
  GripVertical,
  Plus,
  Eye,
  Save,
  Smartphone,
  Monitor,
  Trash2,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Widget {
  id: string;
  type: string;
  label: string;
  icon: React.ReactNode;
}

const widgetLibrary = [
  { type: 'heading', label: 'Título', icon: <Type className="w-4 h-4" /> },
  { type: 'text', label: 'Texto Rico', icon: <FileText className="w-4 h-4" /> },
  { type: 'chart', label: 'Gráfico', icon: <BarChart3 className="w-4 h-4" /> },
  { type: 'table', label: 'Tabla', icon: <Table className="w-4 h-4" /> },
  { type: 'image', label: 'Imagen', icon: <Image className="w-4 h-4" /> },
  { type: 'indicator', label: 'Indicador KPI', icon: <LayoutGrid className="w-4 h-4" /> },
];

const defaultWidgets: Widget[] = [
  { id: 'w1', type: 'heading', label: 'Título Principal', icon: <Type className="w-5 h-5" /> },
  { id: 'w2', type: 'text', label: 'Bloque de Texto', icon: <FileText className="w-5 h-5" /> },
  { id: 'w3', type: 'chart', label: 'Gráfico de Indicadores', icon: <BarChart3 className="w-5 h-5" /> },
  { id: 'w4', type: 'indicator', label: 'KPI Cards', icon: <LayoutGrid className="w-5 h-5" /> },
];

export default function WidgetEditorPage() {
  const [widgets, setWidgets] = useState<Widget[]>(defaultWidgets);
  const [selected, setSelected] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  const addWidget = (type: string) => {
    const lib = widgetLibrary.find((w) => w.type === type);
    if (!lib) return;
    setWidgets([...widgets, { id: `w${Date.now()}`, type, label: lib.label, icon: lib.icon }]);
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter((w) => w.id !== id));
    if (selected === id) setSelected(null);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Editor de Página</h1>
          <p className="text-text-muted text-sm">Construya páginas con widgets arrastrables (RF-020).</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border border-border rounded-md overflow-hidden">
            <button onClick={() => setViewMode('desktop')} className={`p-2 ${viewMode === 'desktop' ? 'bg-primary text-white' : 'bg-surface text-text-muted hover:bg-slate-50'}`}><Monitor className="w-4 h-4" /></button>
            <button onClick={() => setViewMode('mobile')} className={`p-2 ${viewMode === 'mobile' ? 'bg-primary text-white' : 'bg-surface text-text-muted hover:bg-slate-50'}`}><Smartphone className="w-4 h-4" /></button>
          </div>
          <Button variant="outline"><Eye className="w-4 h-4 mr-2" />Preview</Button>
          <Button><Save className="w-4 h-4 mr-2" />Publicar</Button>
        </div>
      </div>

      <div className="flex gap-4 h-[calc(100vh-220px)]">
        {/* Widget Library Sidebar */}
        <div className="w-56 bg-surface rounded-lg border border-border p-4 shrink-0 overflow-y-auto">
          <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Widgets</h3>
          <div className="space-y-2">
            {widgetLibrary.map((w) => (
              <button
                key={w.type}
                onClick={() => addWidget(w.type)}
                className="w-full flex items-center gap-2 p-2.5 rounded-md border border-border bg-background text-sm text-text hover:border-primary/30 hover:bg-primary-light transition-colors"
              >
                {w.icon}
                <span>{w.label}</span>
                <Plus className="w-3 h-3 ml-auto text-text-muted" />
              </button>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className={`flex-1 bg-background rounded-lg border-2 border-dashed border-border p-6 overflow-y-auto ${viewMode === 'mobile' ? 'max-w-sm mx-auto' : ''}`}>
          {widgets.length === 0 ? (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <LayoutGrid className="w-12 h-12 text-text-muted mx-auto mb-3" />
                <p className="text-text-muted">Arrastre widgets aquí para comenzar</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {widgets.map((widget) => (
                <div
                  key={widget.id}
                  onClick={() => setSelected(widget.id)}
                  className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                    selected === widget.id
                      ? 'border-primary bg-primary-light'
                      : 'border-border bg-surface hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-4 h-4 text-text-muted cursor-grab" />
                      <div className="text-text-muted">{widget.icon}</div>
                      <span className="text-sm font-medium text-text">{widget.label}</span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); removeWidget(widget.id); }} className="p-1 rounded hover:bg-red-50 text-text-muted hover:text-destructive">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {/* Widget Preview Placeholder */}
                  <div className="mt-3 rounded bg-slate-50 border border-border p-4">
                    {widget.type === 'heading' && <div className="h-8 bg-slate-200 rounded w-2/3" />}
                    {widget.type === 'text' && <div className="space-y-2"><div className="h-3 bg-slate-200 rounded w-full" /><div className="h-3 bg-slate-200 rounded w-5/6" /><div className="h-3 bg-slate-200 rounded w-4/6" /></div>}
                    {widget.type === 'chart' && <div className="h-32 bg-slate-200 rounded flex items-center justify-center text-text-muted text-xs"><BarChart3 className="w-8 h-8" /></div>}
                    {widget.type === 'table' && <div className="space-y-1"><div className="h-6 bg-slate-300 rounded" /><div className="h-4 bg-slate-200 rounded" /><div className="h-4 bg-slate-200 rounded" /><div className="h-4 bg-slate-200 rounded" /></div>}
                    {widget.type === 'image' && <div className="h-32 bg-slate-200 rounded flex items-center justify-center text-text-muted"><Image className="w-8 h-8" /></div>}
                    {widget.type === 'indicator' && <div className="grid grid-cols-3 gap-2"><div className="h-16 bg-slate-200 rounded" /><div className="h-16 bg-slate-200 rounded" /><div className="h-16 bg-slate-200 rounded" /></div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Properties Panel */}
        {selected && (
          <div className="w-64 bg-surface rounded-lg border border-border p-4 shrink-0 overflow-y-auto">
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Propiedades</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-text">Título del Widget</label>
                <Input defaultValue={widgets.find(w => w.id === selected)?.label} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-text">Ancho</label>
                <select className="flex h-9 w-full rounded-md border border-border bg-surface px-3 py-1 text-sm"><option>Completo</option><option>1/2</option><option>1/3</option></select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-text">Padding</label>
                <Input type="number" defaultValue={16} />
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
