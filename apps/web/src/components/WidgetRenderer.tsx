import React from 'react';
import { PageWidget } from '@avp/api-client';
import { BarChart3, TrendingUp, Users, Info, AlignLeft, Image as ImageIcon } from 'lucide-react';

interface WidgetRendererProps {
  widgets: PageWidget[];
  ecosystemColor?: string;
}

export function WidgetRenderer({ widgets, ecosystemColor = '#4F46E5' }: WidgetRendererProps) {
  if (!widgets || widgets.length === 0) {
    return (
      <div className="py-20 text-center text-text-muted">
        <p>No hay contenido configurado para esta página aún.</p>
      </div>
    );
  }

  // A simple grid layout engine based on widget coordinates (x, y, w, h)
  // For simplicity in this demo renderer, we'll map them vertically or in CSS Grid
  
  return (
    <div className="grid grid-cols-12 gap-6 w-full">
      {widgets.sort((a, b) => a.y - b.y || a.x - b.x).map((widget) => {
        // Map widget 'w' (1-12) to Tailwind col-span classes
        const colSpan = `col-span-12 md:col-span-${Math.min(Math.max(widget.w, 1), 12)}`;
        
        return (
          <div key={widget.id} className={`${colSpan}`}>
            {renderWidgetContent(widget, ecosystemColor)}
          </div>
        );
      })}
    </div>
  );
}

function renderWidgetContent(widget: PageWidget, color: string) {
  switch (widget.type) {
    case 'text':
      return (
        <div className="glass-panel p-8 rounded-2xl h-full flex flex-col justify-center">
          {widget.settings?.content ? (
            <div 
              className="prose prose-slate max-w-none text-text"
              dangerouslySetInnerHTML={{ __html: widget.settings.content }} 
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-text-muted/50 py-8">
              <AlignLeft className="w-8 h-8 mb-2" />
              <p className="text-sm font-medium">Bloque de Texto Vacío</p>
            </div>
          )}
        </div>
      );
      
    case 'chart':
      return (
        <div className="glass-panel p-6 rounded-2xl h-full border-t-4" style={{ borderTopColor: color }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: `${color}15`, color }}>
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-text text-lg">{widget.settings?.title || 'Gráfico'}</h3>
              <p className="text-sm text-text-muted">Indicador asociado: {widget.settings?.indicatorId || 'No asignado'}</p>
            </div>
          </div>
          
          <div className="w-full h-64 bg-slate-50 rounded-xl border border-border/50 flex flex-col items-center justify-center text-text-muted">
             {/* In a real scenario, this would render Recharts with the indicator data */}
             <TrendingUp className="w-8 h-8 mb-2 opacity-50" />
             <p className="font-medium text-sm">Visualización del Indicador</p>
             <p className="text-xs opacity-70">Tipo: {widget.settings?.chartType || 'bar'}</p>
          </div>
        </div>
      );
      
    case 'metric':
      return (
        <div className="glass-panel p-6 rounded-2xl h-full flex flex-col justify-center relative overflow-hidden group hover-lift">
          <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 transition-transform group-hover:scale-150" style={{ backgroundColor: color }} />
          <p className="text-sm font-bold text-text-muted uppercase tracking-wider mb-2">
            {widget.settings?.title || 'Métrica Clave'}
          </p>
          <div className="flex items-end gap-2">
            <p className="text-4xl font-black text-text" style={{ color }}>
              {widget.settings?.value || '0.0'}
            </p>
            <p className="text-lg font-bold text-text-muted mb-1">
              {widget.settings?.unit || '%'}
            </p>
          </div>
        </div>
      );
      
    default:
      return (
        <div className="glass-panel p-6 rounded-2xl h-full flex flex-col items-center justify-center text-text-muted/50 border border-dashed border-border">
          <Info className="w-8 h-8 mb-2" />
          <p className="text-sm font-medium">Widget no soportado: {widget.type}</p>
        </div>
      );
  }
}
