import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Button, Input, DotField } from '@avp/ui';
import { LogIn, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);

    // Check if login was successful (user is now set)
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
              Plataforma de Gobernanza Estratégica
            </h1>
            <p className="text-lg text-white/70 leading-relaxed font-light">
              Monitoreo de indicadores, participación ciudadana y toma de decisiones
              transparente para ecosistemas públicos.
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
            <h2 className="text-2xl font-bold text-text">Iniciar Sesión</h2>
            <p className="text-text-muted mt-1">
              Ingrese sus credenciales para acceder al panel de administración.
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
            <div className="space-y-2">
              <label className="text-sm font-medium text-text" htmlFor="email">
                Correo Electrónico
              </label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError(); }}
                required
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text" htmlFor="password">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); clearError(); }}
                required
              />
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                ¿Olvidó su contraseña?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Ingresando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Ingresar
                </span>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-text-muted">
            ¿No tiene cuenta?{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Registrarse
            </Link>
          </p>

          {/* Quick mock login hint */}
          <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-border/50 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/40 group-hover:bg-primary transition-colors" />
            <p className="text-xs font-bold text-text-muted mb-3 uppercase tracking-wider pl-1">
              Credenciales de Prueba (Mock)
            </p>
            <div className="space-y-2 text-xs text-text-muted font-medium pl-1">
              <p><code className="bg-white px-1.5 py-0.5 rounded shadow-sm border border-border/50 font-bold text-primary">admin@avp.org.pe</code> — Super Admin</p>
              <p><code className="bg-white px-1.5 py-0.5 rounded shadow-sm border border-border/50 font-bold text-primary">secretario@lima.gob.pe</code> — Secretario</p>
              <p><code className="bg-white px-1.5 py-0.5 rounded shadow-sm border border-border/50 font-bold text-primary">editor@lima.gob.pe</code> — Editor</p>
            </div>
            <div className="mt-3 pt-3 border-t border-border/50 pl-1">
              <p className="text-[10px] uppercase font-bold text-primary">
                Nota: <span className="text-text-muted">Puede ingresar cualquier texto en la contraseña.</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
