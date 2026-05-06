# Contexto y Lineamientos para LLMs (IA)

> **Nota para Desarrolladores:** Si estás utilizando un asistente de código basado en IA (como Cursor, Copilot, Cline, o ChatGPT), asegúrate de que el modelo lea este archivo antes de comenzar a generar o refactorizar código en este repositorio.

Este documento establece las reglas arquitectónicas y convenciones estrictas para el monorepo de **WATUQ**.

## 1. Arquitectura del Monorepo (Nx)

Este proyecto es un monorepo gestionado con Nx. El código nunca debe duplicarse.
- `apps/admin`: SPA en React + Vite + React Router. Contiene la lógica del CMS y el Backoffice.
- `apps/web`: SSR/SSG en Next.js 15 (App Router). Es una aplicación pública multi-tenant basada en rutas dinámicas `/[ecosystem]/...`.
- `libs/*`: Aquí reside toda la lógica de negocio compartida, diseño y utilidades.

## 2. Reglas Estrictas de Importación (Imports)

**NUNCA** utilices rutas relativas profundas para importar código entre librerías o aplicaciones. Utiliza siempre los alias definidos en `tsconfig.base.json`.

- ✅ **Correcto**: `import { Button } from '@avp/ui';`
- ❌ **Incorrecto**: `import { Button } from '../../../libs/ui/src/components/Button';`

Si creas un nuevo componente, servicio o hook en una librería, asegúrate de exportarlo primero en el archivo `index.ts` principal de esa librería.

## 3. Sistema de Diseño (Design System)

- **Aesthetics (Glassmorphism):** Se debe priorizar el uso de paneles tipo "glass" (ej. clases `glass-panel`) con desenfoques (`backdrop-blur`) en lugar de colores sólidos simples.
- **Colores Corporativos:** El sistema utiliza un Emerald Green (`#059669`) como color primario, y un Slate Grey (`#475569`) como color de marca. No utilices morados o índigos a menos que sean estrictamente necesarios para un gradiente específico.
- **Tailwind CSS:** Usa siempre clases utilitarias de Tailwind en lugar de CSS personalizado. Los estilos globales o variables de entorno CSS se definen únicamente en los archivos `styles.css` principales.

## 4. Estructura de Componentes React

- Usa componentes funcionales con TypeScript estricto.
- Define interfaces para las `Props` de todos los componentes.
- Mantén los componentes pequeños y de responsabilidad única. Si un componente supera las 150-200 líneas de código estructural, divídelo.

## 5. Next.js 15 (App Router) - Reglas Específicas

- Recuerda que en Next.js 15, la propiedad `params` en Layouts y Pages **es una Promesa** (`Promise<{ parametro: string }>`) y debe ser resuelta de manera asíncrona (`const { parametro } = await params;`).
- Diferencia claramente los Componentes de Servidor (RSC) de los de Cliente. Usa la directiva `'use client'` estrictamente solo cuando necesites interactividad (hooks de React, eventos onClick).

## 6. Solución de Problemas con Nx

- Si Nx no detecta un cambio en una librería (`/libs`), sugiere al desarrollador detener y reiniciar el servidor de desarrollo (`npx nx serve`).
- Si encuentras un falso positivo de linting o un error en la construcción que no tiene sentido lógico, sugiere limpiar la caché de Nx: `npx nx reset`.

## 7. Flexibilidad y Desarrollo Visual (Leeway)

- **Prototipado rápido (Mock-First):** Al construir nuevas vistas, utiliza la librería `@avp/mocks` como fuente de datos temporal. La conexión a la API real (React Query/Zustand) es el último paso.
- **Libertad Creativa:** Tienes total libertad para diseñar la disposición interna de los componentes, márgenes, y micro-animaciones (Tailwind `transition`, `hover`, etc.), siempre y cuando respetes la paleta de colores base (Emerald/Slate) y la estética "Premium/Glass". No reinventes la rueda visual si ya existen componentes base en `@avp/ui`. **La creatividad no debe romper la consistencia sistémica:** mantén un equilibrio visual entre pantallas (ej. evita sobrecargar de animaciones una vista si el resto del sistema es sobrio).

