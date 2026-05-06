import React, { useState } from 'react';
import { mockUsers } from '@avp/mocks';
import { mockEcosystems } from '@avp/mocks';
import type { User } from '@avp/api-client';
import { Button } from '@avp/ui';
import { Input } from '@avp/ui';
import {
  Users as UsersIcon,
  Plus,
  Search,
  Shield,
  UserCog,
  Edit2,
  Trash2,
  MoreHorizontal,
} from 'lucide-react';
import { motion } from 'framer-motion';

const roleBadge: Record<string, { label: string; className: string }> = {
  SUPER_ADMIN: { label: 'Super Admin', className: 'bg-violet-100 text-violet-700' },
  SECRETARY: { label: 'Secretario', className: 'bg-primary-light text-primary' },
  EDITOR: { label: 'Editor', className: 'bg-amber-100 text-amber-700' },
  REGISTERED: { label: 'Registrado', className: 'bg-slate-100 text-slate-600' },
  PUBLIC: { label: 'Público', className: 'bg-slate-50 text-slate-400' },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export default function UsersPage() {
  const [users] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const filtered = users
    .filter((u) =>
      `${u.firstName} ${u.lastName} ${u.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((u) => roleFilter === 'all' || u.role === roleFilter);

  const getEcosystemName = (id: string | null) =>
    mockEcosystems.find((e) => e.id === id)?.name || '—';

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Usuarios</h1>
          <p className="text-text-muted text-sm">
            Gestione usuarios, roles y jerarquías de votación.
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Agregar Usuario
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input
            placeholder="Buscar por nombre o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="h-10 rounded-md border border-border bg-surface px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <option value="all">Todos los roles</option>
          <option value="SUPER_ADMIN">Super Admin</option>
          <option value="SECRETARY">Secretario</option>
          <option value="EDITOR">Editor</option>
          <option value="REGISTERED">Registrado</option>
        </select>
      </motion.div>

      {/* Table */}
      <motion.div variants={fadeUp} className="bg-surface rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                  Ecosistema
                </th>
                <th className="px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                  Jerarquía
                </th>
                <th className="px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((user) => {
                const badge = roleBadge[user.role] || roleBadge.PUBLIC;
                return (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {user.firstName[0]}{user.lastName[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-text-muted">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${badge.className}`}
                      >
                        <Shield className="w-3 h-3" />
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">
                      {getEcosystemName(user.ecosystemId)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(user.hierarchyLevel / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-text-muted font-medium">
                          {user.hierarchyLevel}/5
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {user.isActive ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-success">
                          Activo
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-destructive">
                          Inactivo
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded hover:bg-slate-100 text-text-muted" title="Editar">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded hover:bg-red-50 text-text-muted hover:text-destructive" title="Eliminar">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <UsersIcon className="w-10 h-10 text-text-muted mx-auto mb-3" />
            <p className="text-sm text-text-muted">No se encontraron usuarios.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
