import React from 'react';
import { notFound } from 'next/navigation';
import { mockEcosystems, mockPages } from '@avp/mocks';
import { WidgetRenderer } from '../../../../components/WidgetRenderer';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ContentPageProps {
  params: Promise<{
    ecosystem: string;
    slug: string;
  }>;
}

export default async function DynamicContentPage({ params }: ContentPageProps) {
  const { ecosystem: ecosystemId, slug } = await params;
  const ecosystem = mockEcosystems.find((e) => e.id === ecosystemId);
  
  if (!ecosystem) {
    notFound();
  }

  // Find the exact page matching the slug for this ecosystem
  const page = mockPages.find(p => p.ecosystemId === ecosystem.id && p.slug === slug && p.status === 'published');

  if (!page) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-surface border-b border-border/50 py-12 relative overflow-hidden">
        {/* Subtle decorative background */}
        <div 
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ backgroundColor: ecosystem.primaryColor || '#4F46E5' }}
        />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link 
            href={`/${ecosystemId}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-text-muted hover:text-text transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Volver a la Portada
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-black text-text tracking-tight leading-tight">
            {page.title}
          </h1>
          
          <div className="mt-6 flex items-center gap-4 text-sm font-medium text-text-muted">
            <span className="px-3 py-1 bg-slate-100 rounded-md border border-border/50">
              Contenido Oficial
            </span>
            <span>
              Actualizado el {new Date(page.updatedAt).toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Content Renderer */}
      <div className="max-w-7xl mx-auto px-6 py-16 w-full flex-1">
        <WidgetRenderer 
          widgets={page.widgets} 
          ecosystemColor={ecosystem.primaryColor} 
        />
      </div>
    </div>
  );
}
