import type { Ecosystem } from '@avp/api-client';

export const mockEcosystems: Ecosystem[] = [
  {
    id: 'eco-lima',
    name: 'Ecosistema Lima Metropolitana',
    description:
      'Plataforma de gobernanza estratégica para el monitoreo de indicadores urbanos, transporte, seguridad y desarrollo sostenible de Lima Metropolitana.',
    purpose: 'Transparencia y participación ciudadana en la gestión pública de Lima.',
    logoUrl: null,
    primaryColor: '#2563EB',
    secondaryColor: '#1D4ED8',
    isActive: true,
    createdAt: '2026-01-15T08:00:00Z',
    secretaryId: 'usr-002',
  },
  {
    id: 'eco-arequipa',
    name: 'Ecosistema Arequipa Sostenible',
    description:
      'Plataforma estratégica para el seguimiento de metas de desarrollo sostenible, calidad del aire y gestión hídrica de la región Arequipa.',
    purpose: 'Monitoreo de ODS y participación ciudadana en Arequipa.',
    logoUrl: null,
    primaryColor: '#7C3AED',
    secondaryColor: '#6D28D9',
    isActive: true,
    createdAt: '2026-02-01T10:00:00Z',
    secretaryId: 'usr-005',
  },
];
