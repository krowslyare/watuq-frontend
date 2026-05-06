import { NextRequest, NextResponse } from 'next/server';

// ─── Mock Domain Mapping ──────────────────────────────────────────────
// En producción, esto consultará a la base de datos (Redis/DynamoDB)
// para verificar a qué 'tenantId' pertenece el dominio que hace la petición.
const domainMap: Record<string, string> = {
  'lima.localhost:3000': 'eco-lima',
  'miraflores.localhost:3000': 'eco-miraflores',
  'lima.watuq.pe': 'eco-lima',
  'miraflores.watuq.pe': 'eco-miraflores',
};

export const config = {
  matcher: [
    /*
     * Ignoramos archivos estáticos, imágenes, y rutas de API
     */
    '/((?!api/|_next/|_static/|_vercel|favicon.ico|sitemap.xml).*)',
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  // Obtenemos el host completo (ej. lima.localhost:3000 o lima.gob.pe)
  let hostname = req.headers.get('host') || 'localhost:3000';

  // Si estamos en Vercel, limpiamos el host si usa el dominio por defecto de Vercel
  hostname = hostname.replace('.vercel.app', '');

  // 1. Dominio Principal (Hub Marketing de WATUQ)
  // Si entran a localhost:3000 directo, o a watuq.pe, mostramos la Landing Page de WATUQ
  if (
    hostname === 'localhost:3000' ||
    hostname === 'watuq.pe' ||
    hostname === 'www.watuq.pe'
  ) {
    // Evitamos que alguien intente acceder a un tenant directamente por URL (ej. watuq.pe/eco-lima)
    // En producción podríamos bloquearlo, por ahora en dev lo dejamos pasar.
    return NextResponse.next();
  }

  // 2. Multi-Tenant: Resolución de Ecosistema
  const ecosystemSlug = domainMap[hostname];

  if (!ecosystemSlug) {
    // El dominio no está registrado en nuestra plataforma
    // Podríamos redirigir a una página de "Dominio no configurado"
    return NextResponse.next();
  }

  // 3. Reescritura Invisible (Rewrite)
  // El usuario ve: lima.localhost:3000/forums
  // Next.js renderiza: /eco-lima/forums
  return NextResponse.rewrite(
    new URL(`/${ecosystemSlug}${url.pathname}${url.search}`, req.url)
  );
}
