import type { ForumTopic, Comment } from '@avp/api-client';

export const mockForumTopics: ForumTopic[] = [
  {
    id: 'forum-001',
    ecosystemId: 'eco-lima',
    title: '¿Cómo mejorar el transporte público en Lima Norte?',
    description:
      'Espacio para discutir propuestas ciudadanas sobre la mejora del sistema de transporte en los distritos del cono norte.',
    status: 'open',
    relatedIndicatorId: 'ind-001',
    authorId: 'usr-002',
    authorName: 'María Gutiérrez',
    commentCount: 3,
    createdAt: '2026-04-01T10:00:00Z',
  },
  {
    id: 'forum-002',
    ecosystemId: 'eco-lima',
    title: 'Resultados del programa de áreas verdes 2026',
    description:
      'Debate sobre los avances y desafíos del programa municipal de reforestación urbana.',
    status: 'open',
    relatedIndicatorId: 'ind-002',
    authorId: 'usr-002',
    authorName: 'María Gutiérrez',
    commentCount: 1,
    createdAt: '2026-04-10T14:00:00Z',
  },
  {
    id: 'forum-003',
    ecosystemId: 'eco-lima',
    title: 'Presupuesto participativo: prioridades para el 2027',
    description: 'Foro cerrado con las conclusiones del proceso participativo.',
    status: 'closed',
    relatedIndicatorId: null,
    authorId: 'usr-002',
    authorName: 'María Gutiérrez',
    commentCount: 12,
    createdAt: '2026-03-15T08:00:00Z',
  },
];

export const mockComments: Comment[] = [
  {
    id: 'comment-001',
    topicId: 'forum-001',
    authorId: 'usr-004',
    authorName: 'Ana Torres',
    authorAvatarUrl: null,
    content:
      'Creo que deberían ampliar las rutas del Metropolitano hacia Carabayllo. Actualmente los vecinos dependemos de combis informales.',
    parentCommentId: null,
    isModerated: false,
    createdAt: '2026-04-02T09:30:00Z',
  },
  {
    id: 'comment-002',
    topicId: 'forum-001',
    authorId: 'usr-003',
    authorName: 'Jorge Ramírez',
    authorAvatarUrl: null,
    content:
      'Totalmente de acuerdo, Ana. Además sería bueno implementar ciclovías conectadas a las estaciones.',
    parentCommentId: 'comment-001',
    isModerated: false,
    createdAt: '2026-04-02T11:15:00Z',
  },
  {
    id: 'comment-003',
    topicId: 'forum-001',
    authorId: 'usr-004',
    authorName: 'Ana Torres',
    authorAvatarUrl: null,
    content:
      'Exacto, Jorge. La integración multimodal es clave. ¿Saben si hay algún plan al respecto?',
    parentCommentId: 'comment-002',
    isModerated: false,
    createdAt: '2026-04-03T08:00:00Z',
  },
];
