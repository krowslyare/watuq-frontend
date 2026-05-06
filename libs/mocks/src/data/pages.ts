import { Page } from '@avp/api-client';

export const mockPages: Page[] = [
  {
    id: 'page-lima-home',
    ecosystemId: 'eco-lima',
    slug: 'home',
    title: 'Visión General',
    status: 'published',
    updatedAt: '2026-05-01T10:00:00Z',
    widgets: [
      {
        id: 'w-1',
        type: 'metric',
        x: 0,
        y: 0,
        w: 4,
        h: 2,
        settings: { title: 'Población Atendida', value: '4.2M', unit: 'hab' }
      },
      {
        id: 'w-2',
        type: 'chart',
        x: 4,
        y: 0,
        w: 8,
        h: 4,
        settings: { title: 'Evolución de Calidad del Aire', chartType: 'line', indicatorId: 'ind-lima-1' }
      },
      {
        id: 'w-3',
        type: 'text',
        x: 0,
        y: 4,
        w: 12,
        h: 4,
        settings: { content: '<h3>Avances 2026</h3><p>Este año hemos logrado reducir las emisiones en un 15% de acuerdo a las metas estipuladas.</p>' }
      }
    ]
  },
  {
    id: 'page-lima-plan',
    ecosystemId: 'eco-lima',
    slug: 'plan-urbano',
    title: 'Plan de Desarrollo Urbano',
    status: 'published',
    updatedAt: '2026-05-05T12:00:00Z',
    widgets: [
      {
        id: 'w-4',
        type: 'text',
        x: 0,
        y: 0,
        w: 12,
        h: 6,
        settings: { content: '<h3>Plan de Desarrollo</h3><p>Descripción detallada de los objetivos a largo plazo para la ciudad.</p>' }
      }
    ]
  }
];
