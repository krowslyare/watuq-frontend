import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '@avp/ui';
import { Input } from '@avp/ui';
import { Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { forgotPassword, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await forgotPassword(email);

    const { error: currentError } = useAuthStore.getState();
    if (!currentError) {
      setSent(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text">Recuperar Contraseña</h2>
          <p className="text-text-muted mt-1">
            Ingrese su correo electrónico y le enviaremos un enlace para restablecer su contraseña.
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

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-text">Enlace Enviado</h3>
              <p className="text-sm text-text-muted mt-1">
                Si existe una cuenta asociada a <strong>{email}</strong>, recibirá un correo con instrucciones.
              </p>
            </div>
            <Link to="/login">
              <Button variant="outline" className="mt-4">
                Volver al Login
              </Button>
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text" htmlFor="forgot-email">
                Correo Electrónico
              </label>
              <Input
                id="forgot-email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError(); }}
                required
                autoFocus
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enviando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Enviar Enlace
                </span>
              )}
            </Button>

            <p className="text-center text-sm text-text-muted">
              <Link to="/login" className="text-primary font-medium hover:underline">
                Volver al Login
              </Link>
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}
