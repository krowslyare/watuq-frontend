import Link from 'next/link';
import {
  BarChart3,
  Globe,
  MessageSquare,
  Vote,
  ArrowRight,
  TrendingUp,
  Users,
  Shield,
} from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'Indicadores Estratégicos',
    description: 'Monitoreo en tiempo real de KPIs urbanos, ambientales y económicos.',
  },
  {
    icon: MessageSquare,
    title: 'Foros Ciudadanos',
    description: 'Espacios de discusión para la participación activa de la ciudadanía.',
  },
  {
    icon: Vote,
    title: 'Votaciones',
    description: 'Encuestas y votaciones ponderadas para la toma de decisiones.',
  },
  {
    icon: Shield,
    title: 'Transparencia',
    description: 'Acceso público a datos estratégicos y rendición de cuentas.',
  },
];

const stats = [
  { label: 'Ecosistemas Activos', value: '2' },
  { label: 'Indicadores Monitoreados', value: '24' },
  { label: 'Ciudadanos Registrados', value: '1,245' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">WTQ</span>
            </div>
            <span className="font-semibold text-text text-sm">
              Valor Público
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-text-muted hover:text-text transition-colors">
              Características
            </Link>
            <Link href="#ecosystems" className="text-sm text-text-muted hover:text-text transition-colors">
              Ecosistemas
            </Link>
            <Link href="http://localhost:4200/login" className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">
              Iniciar Sesión →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-medium mb-6">
              <Globe className="w-3 h-3" />
              Plataforma de Gobernanza
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-text leading-tight">
              Gobernanza estratégica{' '}
              <span className="text-primary">transparente</span>{' '}
              y participativa
            </h1>

            <p className="mt-6 text-lg text-text-muted leading-relaxed">
              Monitoree indicadores urbanos, participe en foros de discusión y
              contribuya a la toma de decisiones de su ecosistema público.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#ecosystems"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-primary-hover transition-colors"
              >
                Explorar Ecosistemas
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="http://localhost:4200/register"
                className="inline-flex items-center gap-2 border border-border bg-surface text-text px-6 py-3 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Crear Cuenta
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-b border-border bg-surface">
          <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl lg:text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-text-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-text">
              Herramientas para la gobernanza
            </h2>
            <p className="mt-4 text-text-muted">
              Una plataforma integral para la gestión transparente de ecosistemas públicos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-surface p-6 rounded-lg border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-text">{feature.title}</h3>
                <p className="text-sm text-text-muted mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystems Preview */}
      <section id="ecosystems" className="py-24 bg-background border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-text mb-4">
              Ecosistemas Activos
            </h2>
            <p className="text-text-muted font-medium">
              Explora las comunidades que ya están utilizando WATUQ para impulsar su gobernanza participativa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Dynamic Ecosystems from mock */}
            {[{ id: 'eco-lima', name: 'Lima Metropolitana', desc: 'Monitoreo de indicadores urbanos: desempleo, calidad del aire, y cobertura de servicios.', color: '#4F46E5', count: 4 }, { id: 'eco-arequipa', name: 'Arequipa Sostenible', desc: 'Seguimiento de metas ODS: emisiones de CO2, gestión hídrica y calidad ambiental.', color: '#7C3AED', count: 1 }].map(eco => (
              <Link href={`/${eco.id}`} key={eco.id} className="glass-panel p-6 rounded-2xl border border-border/50 hover-lift transition-all duration-300 group flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-110" style={{ backgroundColor: eco.color }}>
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text group-hover:text-primary transition-colors text-lg leading-tight">{eco.name}</h3>
                    <p className="text-xs font-bold text-text-muted mt-1 uppercase tracking-wider">{eco.count} indicadores</p>
                  </div>
                </div>
                <p className="text-sm text-text-muted/80 font-medium leading-relaxed flex-1">
                  {eco.desc}
                </p>
                <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-sm font-bold" style={{ color: eco.color }}>
                  <span>Explorar Ecosistema</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">WTQ</span>
              </div>
              <span className="text-sm text-slate-300">
                Asociación Valor Público
              </span>
            </div>
            <p className="text-sm">
              © {new Date().getFullYear()} WATUQ. Plataforma de Gobernanza Estratégica.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
