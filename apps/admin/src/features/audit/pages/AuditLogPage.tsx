import React, { useState } from 'react';
import { Button } from '@avp/ui';
import { Input } from '@avp/ui';
import { FileText, Search, Filter, Clock, User, Shield, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface AuditEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'EXPORT';
  resource: string;
  details: string;
}

const mockAuditLog: AuditEntry[] = [
  { id: 'log-001', timestamp: '2026-05-05T14:30:00Z', userId: 'usr-001', userName: 'Daniel McBride', action: 'CREATE', resource: 'Ecosistema', details: 'Creó ecosistema "Arequipa Sostenible"' },
  { id: 'log-002', timestamp: '2026-05-05T14:35:00Z', userId: 'usr-001', userName: 'Daniel McBride', action: 'UPDATE', resource: 'Usuario', details: 'Asignó rol SECRETARY a Roberto Flores' },
  { id: 'log-003', timestamp: '2026-05-05T10:00:00Z', userId: 'usr-002', userName: 'María Gutiérrez', action: 'UPDATE', resource: 'Indicador', details: 'Actualizó valor de "Tasa de Desempleo" a 7.2%' },
  { id: 'log-004', timestamp: '2026-05-04T16:00:00Z', userId: 'usr-003', userName: 'Jorge Ramírez', action: 'CREATE', resource: 'Foro', details: 'Creó tema "Revisión Plan de Desarrollo"' },
  { id: 'log-005', timestamp: '2026-05-04T11:00:00Z', userId: 'usr-002', userName: 'María Gutiérrez', action: 'DELETE', resource: 'Comentario', details: 'Eliminó comentario #45 por infracción' },
  { id: 'log-006', timestamp: '2026-05-03T09:30:00Z', userId: 'usr-001', userName: 'Daniel McBride', action: 'LOGIN', resource: 'Sistema', details: 'Inicio de sesión desde 192.168.1.10' },
  { id: 'log-007', timestamp: '2026-05-03T08:00:00Z', userId: 'usr-003', userName: 'Jorge Ramírez', action: 'EXPORT', resource: 'Votación', details: 'Exportó resultados de "Prioridades 2026"' },
  { id: 'log-008', timestamp: '2026-05-02T15:00:00Z', userId: 'usr-002', userName: 'María Gutiérrez', action: 'CREATE', resource: 'Votación', details: 'Creó encuesta "Presupuesto Participativo Q3"' },
];

const actionBadge: Record<string, { label: string; className: string }> = {
  CREATE: { label: 'Crear', className: 'bg-green-50 text-success' },
  UPDATE: { label: 'Editar', className: 'bg-primary-light text-primary' },
  DELETE: { label: 'Eliminar', className: 'bg-red-50 text-destructive' },
  LOGIN: { label: 'Acceso', className: 'bg-slate-100 text-slate-600' },
  EXPORT: { label: 'Exportar', className: 'bg-amber-50 text-warning' },
};

export default function AuditLogPage() {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');

  const filtered = mockAuditLog
    .filter((e) => `${e.userName} ${e.details} ${e.resource}`.toLowerCase().includes(search.toLowerCase()))
    .filter((e) => actionFilter === 'all' || e.action === actionFilter);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Log de Auditoría</h1>
          <p className="text-text-muted text-sm">Registro de acciones realizadas en la plataforma (RF-021).</p>
        </div>
        <Button variant="outline"><FileText className="w-4 h-4 mr-2" />Exportar Logs</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input placeholder="Buscar en logs..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <select value={actionFilter} onChange={(e) => setActionFilter(e.target.value)} className="h-10 rounded-md border border-border bg-surface px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <option value="all">Todas las acciones</option>
          <option value="CREATE">Crear</option>
          <option value="UPDATE">Editar</option>
          <option value="DELETE">Eliminar</option>
          <option value="LOGIN">Acceso</option>
          <option value="EXPORT">Exportar</option>
        </select>
      </div>

      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Usuario</th>
                <th className="px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Acción</th>
                <th className="px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Recurso</th>
                <th className="px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((entry) => {
                const badge = actionBadge[entry.action];
                return (
                  <tr key={entry.id} className="hover:bg-slate-50 transition-colors duration-150">
                    <td className="px-6 py-4 text-sm text-text-muted whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {new Date(entry.timestamp).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">{entry.userName.split(' ').map(n => n[0]).join('')}</div>
                        <span className="text-sm text-text">{entry.userName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${badge.className}`}>{badge.label}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">{entry.resource}</td>
                    <td className="px-6 py-4 text-sm text-text-muted">{entry.details}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Eye className="w-8 h-8 text-text-muted mx-auto mb-2" />
            <p className="text-sm text-text-muted">No se encontraron registros.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
