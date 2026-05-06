import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '@avp/ui';
import { Input } from '@avp/ui';
import { User, Mail, Lock, Camera, Save } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const { user } = useAuthStore();

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email] = useState(user?.email || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!user) return null;

  const initials = `${user.firstName[0]}${user.lastName[0]}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-text">Mi Perfil</h1>
        <p className="text-text-muted text-sm">Administre su información personal.</p>
      </div>

      {/* Avatar Section */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-sm font-semibold text-text mb-4">Foto de Perfil</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
              {initials}
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-surface border border-border rounded-full flex items-center justify-center hover:bg-slate-50">
              <Camera className="w-3.5 h-3.5 text-text-muted" />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-text">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-text-muted">{user.role}</p>
            <Button variant="outline" size="sm" className="mt-2">
              Cambiar Foto
            </Button>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-sm font-semibold text-text mb-4">Datos Personales</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text">Nombres</label>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Nombres"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text">Apellidos</label>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Apellidos"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <Input value={email} disabled className="pl-10 opacity-60" />
            </div>
            <p className="text-xs text-text-muted">El correo no se puede cambiar.</p>
          </div>
        </div>
      </div>

      {/* Password */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-sm font-semibold text-text mb-4">Cambiar Contraseña</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text">Contraseña Actual</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <Input type="password" placeholder="••••••••" className="pl-10" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text">Nueva Contraseña</label>
              <Input type="password" placeholder="Mínimo 8 caracteres" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text">Confirmar</label>
              <Input type="password" placeholder="Repita la contraseña" />
            </div>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          {saved ? 'Guardado ✓' : 'Guardar Cambios'}
        </Button>
      </div>
    </motion.div>
  );
}
