import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Button, Input, DotField } from '@avp/ui';
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
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <DotField
            dotRadius={1.5}
            dotSpacing={14}
            cursorRadius={500}
            cursorForce={0.1}
            bulgeOnly={true}
            bulgeStrength={67}
            gradientFrom="rgba(16, 185, 129, 0.35)"
            gradientTo="rgba(34, 197, 94, 0.25)"
            glowColor="#0f172a"
            className="w-full h-full"
          />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-12 pointer-events-none">
          <div className="max-w-md text-white">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">WATUQ</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Únase a la plataforma
            </h1>
            <p className="text-lg text-white/70 leading-relaxed font-light">
              Participe activamente en la gobernanza de su ecosistema.
              Monitoree indicadores, vote en encuestas y contribuya en foros de discusión.
            </p>
          </div>
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
