# WATUQ Frontend Platform

Bienvenido al repositorio frontend de **WATUQ**, la Plataforma de Gobernanza Estratégica. 

Este proyecto está construido bajo una arquitectura de **Monorepo** utilizando **Nx**, React, y Next.js. El objetivo de este documento es ayudar al equipo de desarrollo (actual y futuros integrantes) a entender la estructura del proyecto y cómo comenzar a trabajar de manera inmediata.

## ¿Qué es un Monorepo?

Un monorepo (repositorio monolítico) es una estrategia de desarrollo donde múltiples aplicaciones y paquetes compartidos conviven en un único repositorio de control de versiones. 

**Beneficios en WATUQ:**
1. **Código Compartido:** Las librerías de UI, mocks, validaciones (Zod) y clientes API se comparten fácilmente entre la aplicación pública y el panel administrativo sin necesidad de publicarlas en un registro externo (como npm).
2. **Consistencia:** Todas las aplicaciones usan la misma versión de las dependencias (React, Tailwind, etc.).
3. **Refactorización Simplificada:** Un cambio en un componente base (`libs/ui`) se refleja instantáneamente en todas las aplicaciones que lo consumen.

## Estructura del Proyecto

El código está dividido en dos grandes directorios principales: `apps` (las aplicaciones ejecutables) y `libs` (el código reutilizable).

```text
watuq-frontend/
├── apps/
│   ├── admin/               # (SPA) React + Vite: Panel de administración interno (CMS, Configuración, Usuarios)
│   └── web/                 # (SSR/SSG) Next.js 15: Aplicación pública ciudadana multi-tenant
│
├── libs/
│   ├── api-client/          # Tipos (Zod/TypeScript) y hooks (React Query) para la API
│   ├── shared/              # Utilidades genéricas, formateadores de fechas, validadores
│   ├── ui/                  # Componentes base (Botones, Inputs, Layouts) compartidos (Design System)
│   └── mocks/               # Datos de prueba para desarrollo local sin backend
│
├── nx.json                  # Configuración principal de Nx (caché, tareas)
└── package.json             # Dependencias globales del monorepo
```

## Stack Tecnológico Principal

- **Gestor de Monorepo:** Nx
- **Gestor de Paquetes:** pnpm
- **Frameworks:** React 18, Next.js 15 (App Router), Vite
- **Estilos:** Tailwind CSS v4, Lucide React (Íconos)
- **Estado y Data Fetching:** Zustand, React Query (@tanstack/react-query)
- **Routing (Admin):** React Router v6

## Requisitos Previos

Asegúrate de tener instalado en tu entorno de desarrollo:
- Node.js (v18.17 o superior)
- pnpm (v9 o superior)

## Instalación y Configuración

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd watuq-frontend
   ```

2. Instalar las dependencias (ubicado en la raíz del proyecto):
   ```bash
   pnpm install
   ```

## Comandos Principales

Nx utiliza comandos centralizados para ejecutar aplicaciones y tests. 

### Ejecutar las Aplicaciones (Desarrollo Local)

Para iniciar el Panel de Administración (Vite) en el puerto 4200:
```bash
npx nx serve admin
```

Para iniciar la Web Pública (Next.js) en el puerto 3000:
```bash
npx nx serve web
```

### Construcción (Producción)

Genera los estáticos optimizados para producción:

```bash
npx nx build admin
npx nx build web
```

## 🤖 Trabajo con Asistentes de IA (LLMs)

Si utilizas asistentes de código como GitHub Copilot, Cursor, o cualquier otro LLM para programar en este repositorio, **es obligatorio** proporcionarles el contexto de nuestro proyecto.

Por favor, asegúrate de que el modelo lea el archivo [`LLM_CONTEXT.md`](./LLM_CONTEXT.md) antes de solicitar refactorizaciones o creación de nuevo código. Este archivo contiene reglas estrictas sobre el enrutamiento del monorepo (Nx), las importaciones mediante alias, y el sistema de diseño (Glassmorphism / Emerald Green).
