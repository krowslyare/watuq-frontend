import React, { useState } from 'react';
import { mockForumTopics, mockComments } from '@avp/mocks';
import type { ForumTopic, Comment } from '@avp/api-client';
import { Button } from '@avp/ui';
import { Input } from '@avp/ui';
import {
  MessageSquare,
  Plus,
  Search,
  MessageCircle,
  Lock,
  Unlock,
  ChevronRight,
  ArrowLeft,
  Send,
  Clock,
  User,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

// ─── Topic Detail View ─────────────────────────────────────
function TopicDetail({
  topic,
  onBack,
}: {
  topic: ForumTopic;
  onBack: () => void;
}) {
  const [newComment, setNewComment] = useState('');
  const comments = mockComments.filter((c) => c.topicId === topic.id);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a foros
      </button>

      {/* Topic Header */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {topic.status === 'open' ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-success">
                  <Unlock className="w-3 h-3" /> Abierto
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-text-muted">
                  <Lock className="w-3 h-3" /> Cerrado
                </span>
              )}
            </div>
            <h1 className="text-xl font-bold text-text">{topic.title}</h1>
            <p className="text-sm text-text-muted mt-2">{topic.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" /> {topic.authorName}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {new Date(topic.createdAt).toLocaleDateString('es-PE', {
              day: '2-digit', month: 'short', year: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-3 h-3" /> {topic.commentCount} comentarios
          </span>
        </div>
      </div>

      {/* Comments Thread */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-text">Comentarios</h2>
        {comments.map((comment) => (
          <div
            key={comment.id}
            className={`bg-surface rounded-lg border border-border p-4 ${
              comment.parentCommentId ? 'ml-8 border-l-2 border-l-primary/30' : ''
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                {comment.authorName.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-medium text-text">{comment.authorName}</p>
                <p className="text-xs text-text-muted">
                  {new Date(comment.createdAt).toLocaleDateString('es-PE', {
                    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
            <p className="text-sm text-text leading-relaxed">{comment.content}</p>
          </div>
        ))}

        {comments.length === 0 && (
          <div className="text-center py-8 bg-surface rounded-lg border border-border">
            <MessageCircle className="w-8 h-8 text-text-muted mx-auto mb-2" />
            <p className="text-sm text-text-muted">Aún no hay comentarios.</p>
          </div>
        )}
      </div>

      {/* New Comment */}
      {topic.status === 'open' && (
        <div className="bg-surface rounded-lg border border-border p-4">
          <div className="flex gap-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario..."
              className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[80px] resize-none"
            />
          </div>
          <div className="flex justify-end mt-3">
            <Button size="sm" disabled={!newComment.trim()}>
              <Send className="w-4 h-4 mr-2" />
              Comentar
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─── Forums List ───────────────────────────────────────────
export default function ForumsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<ForumTopic | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filtered = mockForumTopics
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => statusFilter === 'all' || t.status === statusFilter);

  if (selectedTopic) {
    return (
      <TopicDetail topic={selectedTopic} onBack={() => setSelectedTopic(null)} />
    );
  }

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 relative z-10">
        <div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600 mb-1">
            Foros
          </h1>
          <p className="text-text-muted font-medium">Espacios de discusión y participación ciudadana.</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="hover-lift shadow-md bg-primary hover:bg-primary/90 text-white">
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Tema
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
        <div className="glass-panel p-6 rounded-2xl hover-lift">
          <p className="text-sm font-bold text-text-muted uppercase tracking-wider">Total Temas</p>
          <p className="text-4xl font-black text-text tracking-tight mt-2">{mockForumTopics.length}</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl hover-lift">
          <p className="text-sm font-bold text-text-muted uppercase tracking-wider">Abiertos</p>
          <p className="text-4xl font-black text-success tracking-tight mt-2">
            {mockForumTopics.filter((t) => t.status === 'open').length}
          </p>
        </div>
        <div className="glass-panel p-6 rounded-2xl hover-lift">
          <p className="text-sm font-bold text-text-muted uppercase tracking-wider">Comentarios</p>
          <p className="text-4xl font-black text-primary tracking-tight mt-2">
            {mockForumTopics.reduce((acc, t) => acc + t.commentCount, 0)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 relative z-10">
        <div className="relative flex-1 max-w-sm group hover-lift shadow-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted/60 group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Buscar tema..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-12 text-base bg-white/70 backdrop-blur-md border-border/50 rounded-xl"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-12 rounded-xl border border-border/50 bg-white/70 backdrop-blur-md px-4 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm hover-lift"
        >
          <option value="all">Todos los estados</option>
          <option value="open">Abiertos</option>
          <option value="closed">Cerrados</option>
        </select>
      </div>

      {/* Topics List */}
      <div className="space-y-4 relative z-10">
        {filtered.map((topic) => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopic(topic)}
            className="w-full text-left glass-panel rounded-2xl border border-border/50 p-6 hover-lift transition-all duration-300 group"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-lg text-text group-hover:text-primary transition-colors truncate">
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
                <p className="text-sm text-text-muted/80 font-medium line-clamp-1 mb-4">{topic.description}</p>
                <div className="flex flex-wrap items-center gap-6 text-xs text-text-muted font-medium bg-slate-50/50 p-2.5 rounded-lg border border-border/40 inline-flex">
                  <span>Por <span className="font-bold">{topic.authorName}</span></span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-3.5 h-3.5 text-primary" />
                    <span className="font-bold">{topic.commentCount}</span> respuestas
                  </span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    {new Date(topic.createdAt).toLocaleDateString('es-PE', {
                      day: '2-digit', month: 'short',
                    })}
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-border/50 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-colors shadow-sm">
                <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-white transition-colors" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 glass-panel rounded-2xl relative z-10">
          <MessageSquare className="w-12 h-12 text-text-muted/40 mx-auto mb-4" />
          <p className="text-sm font-medium text-text-muted">No se encontraron temas.</p>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface rounded-lg border border-border shadow-lg w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-lg font-semibold text-text mb-4">Nuevo Tema de Foro</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Título</label>
                <Input placeholder="Ej: Propuesta de mejora del transporte público" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Descripción</label>
                <textarea
                  className="flex w-full rounded-md border border-border bg-surface px-3 py-2 text-sm placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[100px]"
                  placeholder="Describa el tema de discusión..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text">Categoría</label>
                  <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <option value="general">General</option>
                    <option value="propuestas">Propuestas</option>
                    <option value="consultas">Consultas</option>
                    <option value="incidencias">Incidencias</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text">Estado Inicial</label>
                  <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <option value="open">Abierto</option>
                    <option value="closed">Cerrado</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>Cancelar</Button>
              <Button onClick={() => setShowCreateModal(false)}>Crear Tema</Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
