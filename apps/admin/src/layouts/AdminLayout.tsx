import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useUIStore } from '@avp/shared';
import { useTenant } from '@avp/tenant';
import { useAuthStore } from '../features/auth';
import { useEcosystemStore } from '../features/ecosystems/store/useEcosystemStore';
import {
  LayoutDashboard,
  Globe,
  FileText,
  BarChart3,
  MessageSquare,
  Vote,
  Users,
  Settings,
  LogOut,
  Menu,
  ChevronLeft,
  Scale,
  ClipboardList,
  Blocks,
  Palette,
  ChevronDown,
  ArrowLeftRight,
} from 'lucide-react';

// ─── Navigation Structure ──────────────────────────────────
// Global items: visible always (Super Admin level)
const globalNavItems = [
  { to: '/dashboard', label: 'Dashboard Global', icon: LayoutDashboard },
  { to: '/ecosystems', label: 'Ecosistemas', icon: Globe },
  { to: '/audit', label: 'Auditoría', icon: ClipboardList },
];

// Ecosystem-scoped items: only visible when inside an ecosystem
const ecosystemNavItems = [
  { to: '/eco/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/eco/settings', label: 'Configuración', icon: Palette },
  { to: '/eco/content', label: 'Contenido', icon: FileText },
  { to: '/eco/indicators', label: 'Indicadores', icon: BarChart3 },
  { to: '/eco/forums', label: 'Foros', icon: MessageSquare },
  { to: '/eco/polls', label: 'Votaciones', icon: Vote },
  { to: '/eco/polls/scales', label: 'Escalas de Voto', icon: Scale },
  { to: '/eco/users', label: 'Usuarios', icon: Users },
];

export function AdminLayout() {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { activeTenant } = useTenant();
  const { user, logout } = useAuthStore();
  const { activeEcosystem, clearEcosystem } = useEcosystemStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleExitEcosystem = () => {
    clearEcosystem();
    navigate('/ecosystems');
  };

  const initials = user
    ? `${user.firstName[0]}${user.lastName[0]}`
    : 'AD';

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } glass-sidebar transition-all duration-300 ease-in-out flex flex-col shrink-0 z-20`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-border/50">
          {sidebarOpen ? (
            <div className="flex items-center gap-2">
              <span className="font-black text-text text-lg tracking-tight">
                WATUQ <span className="text-primary font-bold">Admin</span>
              </span>
            </div>
          ) : (
            <span className="font-black text-primary text-sm mx-auto">WTQ</span>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-md text-text-muted hover:bg-slate-100 hover:text-text transition-colors duration-200"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${!sidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {/* Global Section */}
          {sidebarOpen && (
            <p className="px-3 py-2 text-[10px] font-bold text-text-muted/70 uppercase tracking-widest">
              Plataforma
            </p>
          )}
          {globalNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `group relative w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 overflow-hidden ${
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'text-text-muted hover:bg-slate-100/80 hover:text-text hover:shadow-sm'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                  )}
                  <item.icon className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  {sidebarOpen && <span>{item.label}</span>}
                </>
              )}
            </NavLink>
          ))}

          {/* Ecosystem Context */}
          {activeEcosystem && (
            <>
              <div className="my-4 border-t border-border/50" />
              {sidebarOpen ? (
                <div className="px-3 py-3 mb-2 rounded-xl bg-white/50 border border-white/60 shadow-sm backdrop-blur-md relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundColor: activeEcosystem.primaryColor }} />
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105"
                        style={{ backgroundColor: activeEcosystem.primaryColor }}
                      >
                        <Globe className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex flex-col truncate">
                        <span className="text-xs font-bold text-text truncate">
                          {activeEcosystem.name}
                        </span>
                        <span className="text-[10px] text-text-muted">Activo</span>
                      </div>
                    </div>
                    <button
                      onClick={handleExitEcosystem}
                      className="p-1.5 rounded-md hover:bg-white/80 text-text-muted hover:text-text transition-colors shadow-sm bg-white/40"
                      title="Cambiar ecosistema"
                    >
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center mb-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md relative group cursor-pointer"
                    style={{ backgroundColor: activeEcosystem.primaryColor }}
                    onClick={handleExitEcosystem}
                    title="Cambiar Ecosistema"
                  >
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}

              {sidebarOpen && (
                <p className="px-3 py-2 mt-2 text-[10px] font-bold text-text-muted/70 uppercase tracking-widest">
                  Módulos
                </p>
              )}
              {ecosystemNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    `group relative w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 overflow-hidden ${
                      isActive
                        ? 'bg-surface border border-border shadow-sm text-primary'
                        : 'text-text-muted hover:bg-slate-100/80 hover:text-text'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-primary rounded-r-full" />
                      )}
                      <item.icon className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                      {sidebarOpen && <span>{item.label}</span>}
                    </>
                  )}
                </NavLink>
              ))}
            </>
          )}

          {/* No ecosystem selected hint */}
          {!activeEcosystem && sidebarOpen && (
            <>
              <div className="my-4 border-t border-border/50" />
              <div className="px-4 py-6 text-center bg-gradient-to-b from-transparent to-slate-50/50 rounded-xl">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-border/50 flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-5 h-5 text-text-muted/50" />
                </div>
                <p className="text-xs text-text-muted/80 font-medium">
                  Seleccione un ecosistema para acceder a sus módulos.
                </p>
              </div>
            </>
          )}
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-border/50 space-y-1.5 bg-gradient-to-b from-transparent to-slate-50/30">
          {sidebarOpen && user && (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-surface border border-border shadow-sm text-primary'
                    : 'text-text-muted hover:bg-white/80 hover:text-text hover:shadow-sm'
                }`
              }
            >
              <Settings className="w-5 h-5 shrink-0" />
              <span>Mi Perfil</span>
            </NavLink>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-text-muted hover:text-destructive hover:bg-red-50/80 rounded-xl transition-all duration-200"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Header - Glassmorphic */}
        <header className="h-16 glass-panel z-10 sticky top-0 border-b border-border/40 flex items-center px-6 justify-between shrink-0">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md text-text-muted hover:bg-slate-100/80 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            {activeEcosystem && (
              <div className="hidden sm:flex items-center gap-2 bg-white/60 border border-white/40 shadow-sm backdrop-blur-md px-3 py-1.5 rounded-full">
                <div className="w-2.5 h-2.5 rounded-full shadow-inner" style={{ backgroundColor: activeEcosystem.primaryColor }} />
                <span className="text-xs font-semibold text-text">{activeEcosystem.name}</span>
              </div>
            )}
            <div className="h-8 w-px bg-border/60 hidden sm:block mx-1" />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-text tracking-tight">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-[10px] font-medium text-text-muted/80 uppercase tracking-widest">{user?.role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-indigo-400 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white cursor-pointer hover:scale-105 transition-transform">
              {initials}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto relative z-0">
          <div className="max-w-7xl mx-auto h-full">
            <React.Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            }>
              <Outlet />
            </React.Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
