import type { Objective } from '@avp/api-client';

export const mockObjectives: Objective[] = [
  {
    id: 'obj-001',
    ecosystemId: 'eco-lima',
    name: 'Desarrollo Económico Inclusivo',
    description: 'Promover el crecimiento económico sostenible y la generación de empleo digno.',
    order: 1,
  },
  {
    id: 'obj-002',
    ecosystemId: 'eco-lima',
    name: 'Servicios Públicos de Calidad',
    description: 'Garantizar acceso universal a servicios básicos y ejecución eficiente del presupuesto.',
    order: 2,
  },
  {
    id: 'obj-003',
    ecosystemId: 'eco-arequipa',
    name: 'Sostenibilidad Ambiental',
    description: 'Reducir el impacto ambiental y avanzar en las metas ODS.',
    order: 1,
  },
];
