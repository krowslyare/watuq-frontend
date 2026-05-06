import React from 'react';
import { notFound } from 'next/navigation';
import { mockEcosystems, mockForumTopics } from '@avp/mocks';
import { MessageSquare, Search, MessageCircle, Lock, Unlock, ChevronRight, Clock, User } from 'lucide-react';
import Link from 'next/link';

interface ForumsPageProps {
  params: Promise<{
    ecosystem: string;
  }>;
}

export default async function ForumsPage({ params }: ForumsPageProps) {
  const { ecosystem: ecosystemId } = await params;
  const ecosystem = mockEcosystems.find((e) => e.id === ecosystemId);
  
  if (!ecosystem) {
    notFound();
  }

  // Assuming mockForumTopics has topics across ecosystems (in our mocks it might just be generic, but let's filter or use all)
  const forums = mockForumTopics; // Ideally filtered by ecosystemId

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-surface border-b border-border/50 py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: `${ecosystem.primaryColor}15`, color: ecosystem.primaryColor }}>
              <MessageSquare className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-text tracking-tight">
              Foros Ciudadanos
            </h1>
          </div>
          <p className="text-lg text-text-muted max-w-3xl font-medium">
            Espacio de diálogo, debate y participación ciudadana de {ecosystem.name}. Tu opinión es clave para el desarrollo.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pt-12 w-full flex-1">
        
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1 group shadow-sm hover-lift rounded-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted/60 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Buscar discusiones..."
              className="w-full pl-12 pr-4 h-14 text-base bg-white/70 backdrop-blur-md border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            />
          </div>
          <button 
            className="h-14 px-8 text-white rounded-xl font-bold flex items-center gap-2 shadow-md hover-lift transition-all"
            style={{ backgroundColor: ecosystem.primaryColor || '#4F46E5' }}
          >
            Nueva Discusión
          </button>
        </div>

        {/* Forums List */}
        <div className="space-y-4">
          {forums.map((topic) => (
            <Link
              href={`/${ecosystemId}/forums/${topic.id}`}
              key={topic.id}
              className="block w-full text-left glass-panel rounded-2xl border border-border/50 p-6 hover-lift transition-all duration-300 group"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-xl text-text group-hover:text-primary transition-colors truncate">
                      {topic.title}
                    </h3>
                    {topic.status === 'open' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-success/10 text-success border border-success/20 shrink-0">
                        <Unlock className="w-3 h-3" /> Abierto
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-slate-100 text-text-muted border border-border/50 shrink-0">
                        <Lock className="w-3 h-3" /> Cerrado
                      </span>
                    )}
                  </div>
                  <p className="text-base text-text-muted/80 font-medium line-clamp-2 mb-4">
                    {topic.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted font-medium">
                    <span className="flex items-center gap-1.5 bg-slate-50 border border-border/50 px-2 py-1 rounded-md">
                      <User className="w-4 h-4 text-text-muted/50" />
                      <span className="font-bold text-text">{topic.authorName}</span>
                    </span>
                    
                    <span className="flex items-center gap-1.5 bg-primary/5 text-primary border border-primary/10 px-2 py-1 rounded-md">
                      <MessageCircle className="w-4 h-4" />
                      <span className="font-bold">{topic.commentCount}</span> respuestas
                    </span>
                    
                    <span className="flex items-center gap-1.5 text-text-muted/70">
                      <Clock className="w-4 h-4" />
                      {new Date(topic.createdAt).toLocaleDateString('es-PE', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors shadow-sm mt-1"
                  style={{ 
                    backgroundColor: 'white', 
                    border: `1px solid ${ecosystem.primaryColor}40`,
                    color: ecosystem.primaryColor
                  }}
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {forums.length === 0 && (
          <div className="text-center py-20 glass-panel rounded-3xl border border-border/50">
            <MessageSquare className="w-16 h-16 mx-auto text-text-muted/30 mb-6" />
            <h3 className="text-xl font-bold text-text mb-2">No hay discusiones</h3>
            <p className="text-text-muted max-w-md mx-auto">
              Sé el primero en iniciar un debate en la comunidad.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
