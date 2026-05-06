import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TenantProvider } from '@avp/tenant';
import { AdminLayout } from '../layouts/AdminLayout';
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ProtectedRoute,
} from '../features/auth';

// ─── Lazy-loaded Pages ─────────────────────────────────────
// Global pages
const GlobalDashboard = React.lazy(() => import('../features/dashboard/DashboardPage'));
const EcosystemsPage = React.lazy(() => import('../features/ecosystems/pages/EcosystemsPage'));
const AuditLogPage = React.lazy(() => import('../features/audit/pages/AuditLogPage'));
const ProfilePage = React.lazy(() => import('../features/auth/pages/ProfilePage'));

// Ecosystem-scoped pages (only accessible after selecting an ecosystem)
const EcoDashboard = React.lazy(() => import('../features/dashboard/DashboardPage'));
const EcoSettingsPage = React.lazy(() => import('../features/ecosystems/pages/EcosystemSettingsPage'));
const ContentPageView = React.lazy(() => import('../features/content/pages/ContentPage'));
const WidgetEditorPage = React.lazy(() => import('../features/content/pages/WidgetEditorPage'));
const IndicatorsPage = React.lazy(() => import('../features/indicators/pages/IndicatorsPage'));
const ForumsPage = React.lazy(() => import('../features/forums/pages/ForumsPage'));
const PollsPage = React.lazy(() => import('../features/polls/pages/PollsPage'));
const VotingScalesPage = React.lazy(() => import('../features/polls/pages/VotingScalesPage'));
const UsersPage = React.lazy(() => import('../features/users/pages/UsersPage'));

const UnauthorizedPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold text-destructive">403</h1>
      <p className="text-text-muted">No tiene permisos para acceder a esta sección.</p>
      <a href="/dashboard" className="text-primary hover:underline text-sm">
        Volver al Dashboard
      </a>
    </div>
  </div>
);

// ─── Query Client ──────────────────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 1 },
  },
});

const Loading = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

// ─── App Root ──────────────────────────────────────────────
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TenantProvider>
        <BrowserRouter>
          <React.Suspense fallback={<Loading />}>
            <Routes>
              {/* Public Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />

              {/* Protected Admin Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/dashboard" replace />} />

                {/* ─── Global (Platform) ─── */}
                <Route path="dashboard" element={<GlobalDashboard />} />
                <Route path="ecosystems" element={<EcosystemsPage />} />
                <Route path="audit" element={<AuditLogPage />} />
                <Route path="profile" element={<ProfilePage />} />

                {/* ─── Ecosystem-Scoped ─── */}
                <Route path="eco/dashboard" element={<EcoDashboard />} />
                <Route path="eco/settings" element={<EcoSettingsPage />} />
                <Route path="eco/content" element={<ContentPageView />} />
                <Route path="eco/content/editor" element={<WidgetEditorPage />} />
                <Route path="eco/indicators" element={<IndicatorsPage />} />
                <Route path="eco/forums" element={<ForumsPage />} />
                <Route path="eco/polls" element={<PollsPage />} />
                <Route path="eco/polls/scales" element={<VotingScalesPage />} />
                <Route path="eco/users" element={<UsersPage />} />
              </Route>

              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </React.Suspense>
        </BrowserRouter>
      </TenantProvider>
    </QueryClientProvider>
  );
}

export default App;
