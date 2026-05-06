import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Globe, BarChart3, MessageSquare, Menu } from 'lucide-react';
import { mockEcosystems } from '@avp/mocks';

interface EcosystemLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    ecosystem: string;
  }>;
}

export default async function EcosystemLayout({ children, params }: EcosystemLayoutProps) {
  const { ecosystem } = await params;
  const ecosystemData = mockEcosystems.find((e) => e.id === ecosystem);

  if (!ecosystemData) {
    notFound();
  }

  // Get primary color or fallback
  const primaryColor = ecosystemData.primaryColor || '#4F46E5';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Ecosystem Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${ecosystem}`} className="flex items-center gap-3 group">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105"
              style={{ backgroundColor: primaryColor }}
            >
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-text leading-tight">{ecosystemData.name}</h1>
              <p className="text-[10px] uppercase tracking-wider text-text-muted font-bold">
                Plataforma Ciudadana
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href={`/${ecosystem}`}
              className="text-sm font-semibold text-text-muted hover:text-text transition-colors"
            >
              Inicio
            </Link>
            <Link 
              href={`/${ecosystem}/indicators`}
              className="text-sm font-semibold text-text-muted hover:text-text transition-colors flex items-center gap-1.5"
            >
              <BarChart3 className="w-4 h-4" />
              Indicadores
            </Link>
            <Link 
              href={`/${ecosystem}/forums`}
              className="text-sm font-semibold text-text-muted hover:text-text transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              Foros
            </Link>
            
            <div className="w-px h-6 bg-border mx-2" />
            
            <Link 
              href="http://localhost:4200/login" 
              className="text-sm font-bold transition-colors px-4 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-border"
              style={{ color: primaryColor }}
            >
              Acceso Admin
            </Link>
          </nav>

          <button className="md:hidden p-2 text-text-muted hover:bg-slate-50 rounded-md">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-0">
        {/* Dynamic CSS variables for the ecosystem theme could be injected here */}
        <div style={{ '--ecosystem-primary': primaryColor } as React.CSSProperties} className="contents">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">WTQ</span>
              </div>
              <span className="text-sm text-slate-300 font-medium">
                {ecosystemData.name} — Gobernanza Transparente
              </span>
            </div>
            <p className="text-sm">
              © {new Date().getFullYear()} Asociación Valor Público.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
