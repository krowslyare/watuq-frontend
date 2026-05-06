import React from 'react';
import { notFound } from 'next/navigation';
import { mockEcosystems, mockPages } from '@avp/mocks';
import { WidgetRenderer } from '../../components/WidgetRenderer';
import { ArrowRight, Globe } from 'lucide-react';
import Link from 'next/link';

interface EcosystemHomePageProps {
  params: Promise<{
    ecosystem: string;
  }>;
}

export default async function EcosystemHomePage({ params }: EcosystemHomePageProps) {
  const { ecosystem: ecosystemId } = await params;
  const ecosystem = mockEcosystems.find((e) => e.id === ecosystemId);
  
  if (!ecosystem) {
    notFound();
  }

  // Find the home page for this ecosystem (or the first published page if no specific home)
  const homePage = mockPages.find(p => p.ecosystemId === ecosystem.id && p.status === 'published') || null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Dynamic Ecosystem Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-24 lg:py-32">
        {/* Dynamic Background Gradient based on ecosystem color */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{ 
            background: `radial-gradient(circle at 80% 20%, ${ecosystem.primaryColor || '#4F46E5'} 0%, transparent 50%)` 
          }}
        />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6 backdrop-blur-md">
              <Globe className="w-4 h-4" />
              Ecosistema Ciudadano
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
              {ecosystem.name}
            </h1>
            
            <p className="text-xl text-white/80 leading-relaxed max-w-2xl font-light mb-10">
              Plataforma de gobernanza estratégica abierta. Explora los indicadores, 
              participa en foros de discusión y conoce los planes de desarrollo de tu ecosistema.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href={`/${ecosystemId}/indicators`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                style={{ backgroundColor: ecosystem.primaryColor || '#4F46E5', color: '#ffffff' }}
              >
                Explorar Datos <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href={`/${ecosystemId}/forums`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 font-bold transition-all backdrop-blur-md"
              >
                Participar en Foros
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic CMS Content Area */}
      <section className="py-20 flex-1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-black text-text tracking-tight mb-2">Visión General</h2>
              <p className="text-text-muted font-medium">Contenido oficial y reportes de {ecosystem.name}</p>
            </div>
          </div>

          {homePage ? (
            <WidgetRenderer 
              widgets={homePage.widgets} 
              ecosystemColor={ecosystem.primaryColor} 
            />
          ) : (
            <div className="glass-panel p-16 rounded-3xl text-center border border-border/50">
              <Globe className="w-16 h-16 mx-auto text-text-muted/30 mb-6" />
              <h3 className="text-xl font-bold text-text mb-2">Bienvenido a {ecosystem.name}</h3>
              <p className="text-text-muted max-w-md mx-auto">
                El administrador de este ecosistema aún no ha publicado el contenido principal de la portada.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
