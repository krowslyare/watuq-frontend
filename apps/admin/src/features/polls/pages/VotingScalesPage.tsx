import React, { useState } from 'react';
import { Button } from '@avp/ui';
import { Input } from '@avp/ui';
import { Scale, Plus, Trash2, GripVertical, Save, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface HierarchyLevel {
  id: string;
  name: string;
  weight: number;
  description: string;
}

const defaultLevels: HierarchyLevel[] = [
  { id: 'h1', name: 'Presidente / Director', weight: 5, description: 'Máxima autoridad' },
  { id: 'h2', name: 'Secretario Corporativo', weight: 4, description: 'Gestión administrativa' },
  { id: 'h3', name: 'Directivo / Consejero', weight: 3, description: 'Miembros del directorio' },
  { id: 'h4', name: 'Funcionario Técnico', weight: 2, description: 'Personal técnico' },
  { id: 'h5', name: 'Ciudadano Registrado', weight: 1, description: 'Usuarios comunidad' },
];

export default function VotingScalesPage() {
  const [levels, setLevels] = useState<HierarchyLevel[]>(defaultLevels);
  const [saved, setSaved] = useState(false);

  const addLevel = () => {
    setLevels([...levels, { id: `h${Date.now()}`, name: '', weight: 1, description: '' }]);
  };
  const removeLevel = (id: string) => setLevels(levels.filter((l) => l.id !== id));
  const updateLevel = (id: string, field: keyof HierarchyLevel, value: string | number) => {
    setLevels(levels.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const totalWeight = levels.reduce((acc, l) => acc + l.weight, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text">Escalas de Votación</h1>
        <p className="text-text-muted text-sm">Configure los niveles jerárquicos y sus pesos (RF-011).</p>
      </div>

      <div className="flex items-start gap-3 p-4 rounded-lg bg-primary-light border border-primary/20">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-text-muted">
          Cada usuario tiene un nivel. Al votar, su voto se multiplica por el peso. Presidente (5) = 5× más que Ciudadano (1).
        </p>
      </div>

      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-text-muted" />
            <h2 className="text-sm font-semibold text-text">Niveles Jerárquicos</h2>
          </div>
          <Button size="sm" variant="outline" onClick={addLevel}>
            <Plus className="w-4 h-4 mr-1" /> Agregar
          </Button>
        </div>
        <div className="divide-y divide-border">
          {levels.map((level, idx) => (
            <div key={level.id} className="px-6 py-3 flex items-center gap-3 hover:bg-slate-50/50">
              <GripVertical className="w-4 h-4 text-text-muted cursor-grab shrink-0" />
              <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">{idx + 1}</span>
              <Input value={level.name} onChange={(e) => updateLevel(level.id, 'name', e.target.value)} placeholder="Nombre" className="flex-1" />
              <Input type="number" min={1} max={10} value={level.weight} onChange={(e) => updateLevel(level.id, 'weight', parseInt(e.target.value) || 1)} className="w-20" />
              <span className="text-xs text-text-muted w-10 text-right">{totalWeight > 0 ? ((level.weight / totalWeight) * 100).toFixed(0) : 0}%</span>
              <button onClick={() => removeLevel(level.id)} className="p-1.5 rounded hover:bg-red-50 text-text-muted hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 bg-slate-50 border-t border-border flex justify-between text-xs text-text-muted">
          <span>{levels.length} niveles</span>
          <span>Peso total: {totalWeight}</span>
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-sm font-semibold text-text mb-4">Simulación de Impacto</h2>
        <div className="space-y-2">
          {levels.map((level) => {
            const pct = totalWeight > 0 ? (level.weight / totalWeight) * 100 : 0;
            return (
              <div key={level.id} className="flex items-center gap-3">
                <span className="text-xs text-text-muted w-36 truncate">{level.name}</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5 }} className="h-full bg-primary rounded-full" />
                </div>
                <span className="text-xs font-medium text-text w-10 text-right">{pct.toFixed(0)}%</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" />{saved ? 'Guardado ✓' : 'Guardar Escala'}</Button>
      </div>
    </motion.div>
  );
}
