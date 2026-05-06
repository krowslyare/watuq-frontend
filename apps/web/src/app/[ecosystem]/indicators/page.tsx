import React from 'react';
import { notFound } from 'next/navigation';
import { mockEcosystems, mockIndicators, mockObjectives } from '@avp/mocks';
import { BarChart3, Search, Filter, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface IndicatorsPageProps {
  params: Promise<{
    ecosystem: string;
  }>;
}

export default async function IndicatorsPage({ params }: IndicatorsPageProps) {
  const { ecosystem: ecosystemId } = await params;
  const ecosystem = mockEcosystems.find((e) => e.id === ecosystemId);
  
  if (!ecosystem) {
    notFound();
  }

  const indicators = mockIndicators.filter(i => i.ecosystemId === ecosystem.id);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-5 h-5 text-success" />;
      case 'down': return <TrendingDown className="w-5 h-5 text-destructive" />;
      default: return <Minus className="w-5 h-5 text-text-muted" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-success bg-success/10 border-success/20';
      case 'down': return 'text-destructive bg-destructive/10 border-destructive/20';
      default: return 'text-text-muted bg-slate-100 border-border/50';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-surface border-b border-border/50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: `${ecosystem.primaryColor}15`, color: ecosystem.primaryColor }}>
              <BarChart3 className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-text tracking-tight">
              Indicadores Estratégicos
            </h1>
          </div>
          <p className="text-lg text-text-muted max-w-3xl font-medium">
            Monitoreo en tiempo real de los datos clave y métricas de desempeño de {ecosystem.name}.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pt-12 w-full flex-1">
        
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1 group shadow-sm hover-lift rounded-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted/60 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Buscar indicador..."
              className="w-full pl-12 pr-4 h-14 text-base bg-white/70 backdrop-blur-md border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            />
          </div>
          <button className="h-14 px-6 bg-white/70 backdrop-blur-md border border-border/50 rounded-xl font-bold text-text-muted hover:text-text flex items-center gap-2 shadow-sm hover-lift transition-all">
            <Filter className="w-5 h-5" />
            Filtrar por Objetivo
          </button>
        </div>

        {/* Indicators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {indicators.map((ind) => {
            const objective = mockObjectives.find(o => o.id === ind.objectiveId);
            const delta = ind.previousValue !== null ? ind.value - ind.previousValue : null;
            
            return (
              <div key={ind.id} className="glass-panel p-6 rounded-2xl border border-border/50 hover-lift transition-all duration-300 group cursor-pointer flex flex-col h-full relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-[0.03] group-hover:opacity-10 transition-opacity blur-2xl" style={{ backgroundColor: ecosystem.primaryColor }} />
                
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 pr-4">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-text-muted mb-2 line-clamp-1">
                      {objective?.name || 'Indicador General'}
                    </p>
                    <h3 className="font-bold text-text text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {ind.name}
                    </h3>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border shadow-sm ${getTrendColor(ind.trend)}`}>
                    {getTrendIcon(ind.trend)}
                  </div>
                </div>
                
                <p className="text-sm text-text-muted/80 font-medium line-clamp-2 mb-6 flex-1">
                  {ind.description}
                </p>
                
                <div className="pt-4 border-t border-border/50 flex items-end justify-between">
                  <div>
                    <p className="text-xs font-bold text-text-muted uppercase mb-1">Valor Actual</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-text">{ind.value}</span>
                      <span className="text-sm font-bold text-text-muted">{ind.unit}</span>
                    </div>
                  </div>
                  
                  {delta !== null && (
                    <div className="text-right">
                      <p className="text-xs font-bold text-text-muted uppercase mb-1">vs Mes Anterior</p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${delta > 0 ? 'text-success bg-success/10' : delta < 0 ? 'text-destructive bg-destructive/10' : 'text-text-muted bg-slate-100'}`}>
                        {delta > 0 ? '+' : ''}{delta.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {indicators.length === 0 && (
          <div className="text-center py-20 glass-panel rounded-3xl border border-border/50">
            <BarChart3 className="w-16 h-16 mx-auto text-text-muted/30 mb-6" />
            <h3 className="text-xl font-bold text-text mb-2">Sin Indicadores</h3>
            <p className="text-text-muted max-w-md mx-auto">
              Aún no se han publicado indicadores estratégicos para este ecosistema.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
