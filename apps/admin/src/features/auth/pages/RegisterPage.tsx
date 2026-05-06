import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '@avp/ui';
import { Input } from '@avp/ui';
import { UserPlus, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return; // Could set a local error
    }

    await register({ email, password, firstName, lastName });

    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12">
        <div className="max-w-md text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold">AVP</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Únase a la plataforma
          </h1>
          <p className="text-lg text-white/80">
            Participe activamente en la gobernanza de su ecosistema.
            Monitoree indicadores, vote en encuestas y contribuya en foros de discusión.
          </p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text">Crear Cuenta</h2>
            <p className="text-text-muted mt-1">
              Complete el formulario para registrarse en la plataforma.
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 mb-6 rounded-md bg-red-50 border border-red-200 text-sm text-destructive"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text" htmlFor="firstName">
                  Nombres
                </label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Carlos"
                  value={firstName}
                  onChange={(e) => { setFirstName(e.target.value); clearError(); }}
                  required
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text" htmlFor="lastName">
                  Apellidos
                </label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Mendoza"
                  value={lastName}
                  onChange={(e) => { setLastName(e.target.value); clearError(); }}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text" htmlFor="reg-email">
                Correo Electrónico
              </label>
              <Input
                id="reg-email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError(); }}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text" htmlFor="reg-password">
                Contraseña
              </label>
              <Input
                id="reg-password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text" htmlFor="confirmPassword">
                Confirmar Contraseña
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repita su contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
              {password && confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-destructive">Las contraseñas no coinciden.</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || (password !== confirmPassword && confirmPassword.length > 0)}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Registrando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Crear Cuenta
                </span>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-text-muted">
            ¿Ya tiene cuenta?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Iniciar Sesión
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
