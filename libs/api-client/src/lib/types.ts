import { z } from 'zod';

// ──────────────────────────────────────────────
// User & Auth
// ──────────────────────────────────────────────

export const UserRoleSchema = z.enum([
  'SUPER_ADMIN',
  'SECRETARY',
  'EDITOR',
  'REGISTERED',
  'PUBLIC',
]);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  role: UserRoleSchema,
  avatarUrl: z.string().nullable(),
  hierarchyLevel: z.number().default(1),
  ecosystemId: z.string().nullable(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
});
export type User = z.infer<typeof UserSchema>;

// ──────────────────────────────────────────────
// Ecosystem (Tenant)
// ──────────────────────────────────────────────

export const EcosystemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  purpose: z.string(),
  logoUrl: z.string().nullable(),
  primaryColor: z.string().default('#2563EB'),
  secondaryColor: z.string().default('#1D4ED8'),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  secretaryId: z.string().nullable(),
});
export type Ecosystem = z.infer<typeof EcosystemSchema>;

// ──────────────────────────────────────────────
// Strategic Objectives & Indicators
// ──────────────────────────────────────────────

export const ObjectiveSchema = z.object({
  id: z.string(),
  ecosystemId: z.string(),
  name: z.string(),
  description: z.string(),
  order: z.number(),
});
export type Objective = z.infer<typeof ObjectiveSchema>;

export const IndicatorTrendSchema = z.enum(['up', 'down', 'stable']);
export type IndicatorTrend = z.infer<typeof IndicatorTrendSchema>;

export const IndicatorSchema = z.object({
  id: z.string(),
  ecosystemId: z.string(),
  objectiveId: z.string(),
  name: z.string(),
  description: z.string(),
  importance: z.string(),
  analysis: z.string(),
  value: z.number(),
  previousValue: z.number().nullable(),
  unit: z.string(),
  trend: IndicatorTrendSchema,
  dataSourceType: z.enum(['manual', 'csv', 'api']),
  lastUpdated: z.string().datetime(),
});
export type Indicator = z.infer<typeof IndicatorSchema>;

// ──────────────────────────────────────────────
// Forums
// ──────────────────────────────────────────────

export const ForumStatusSchema = z.enum(['open', 'closed']);

export const ForumTopicSchema = z.object({
  id: z.string(),
  ecosystemId: z.string(),
  title: z.string(),
  description: z.string(),
  status: ForumStatusSchema,
  relatedIndicatorId: z.string().nullable(),
  authorId: z.string(),
  authorName: z.string(),
  commentCount: z.number(),
  createdAt: z.string().datetime(),
});
export type ForumTopic = z.infer<typeof ForumTopicSchema>;

export const CommentSchema = z.object({
  id: z.string(),
  topicId: z.string(),
  authorId: z.string(),
  authorName: z.string(),
  authorAvatarUrl: z.string().nullable(),
  content: z.string(),
  parentCommentId: z.string().nullable(),
  isModerated: z.boolean(),
  createdAt: z.string().datetime(),
});
export type Comment = z.infer<typeof CommentSchema>;

// ──────────────────────────────────────────────
// Polls & Voting
// ──────────────────────────────────────────────

export const PollStatusSchema = z.enum(['draft', 'scheduled', 'active', 'closed', 'archived']);

export const PollOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  voteCount: z.number(),
  weightedTotal: z.number(),
});
export type PollOption = z.infer<typeof PollOptionSchema>;

export const PollSchema = z.object({
  id: z.string(),
  ecosystemId: z.string(),
  question: z.string(),
  description: z.string(),
  type: z.enum(['single', 'multiple']),
  status: PollStatusSchema,
  options: z.array(PollOptionSchema),
  hidePartialResults: z.boolean(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  totalVotes: z.number(),
  createdAt: z.string().datetime(),
});
export type Poll = z.infer<typeof PollSchema>;

// ──────────────────────────────────────────────
// CMS Pages & Widgets
// ──────────────────────────────────────────────

export const PageWidgetSchema = z.object({
  id: z.string(),
  type: z.enum(['text', 'chart', 'metric', 'image']),
  x: z.number(),
  y: z.number(),
  w: z.number(),
  h: z.number(),
  settings: z.any().optional(),
});
export type PageWidget = z.infer<typeof PageWidgetSchema>;

export const PageSchema = z.object({
  id: z.string(),
  ecosystemId: z.string(),
  slug: z.string(),
  title: z.string(),
  status: z.enum(['published', 'draft']),
  widgets: z.array(PageWidgetSchema),
  updatedAt: z.string().datetime(),
});
export type Page = z.infer<typeof PageSchema>;

