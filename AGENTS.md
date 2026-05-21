# AGENTS.md — Reglas Universales del Proyecto

## 🏗️ Stack Tecnológico (Inmutable)
- **Backend:** Node.js 22 + Express 5 + TypeScript 5.7 (strict mode)
- **Frontend:** React 19 + Next.js 15 (App Router) + TypeScript
- **DB:** PostgreSQL 16 + Prisma 6 (última versión estable)
- **Estado:** Zustand 5 (global), TanStack Query 5 (servidor)
- **Estilos:** Tailwind CSS 4 + shadcn/ui (componentes base)

## 🚫 Zonas de Alta Prioridad — Mínimo Contexto Requerido
Para modificar estas áreas, el agente DEBE leer las reglas específicas:
- **Autenticación** → `.agent/rules/security.md`
- **Esquema de DB** → `.agent/rules/database.md`
- **APIs Públicas** → `.agent/rules/architecture.md`

## 🔒 Servicios Canónicos (Única Fuente de Verdad)
- `src/lib/db.ts` — Cliente Prisma. PROHIBIDO instanciar `PrismaClient` en otro lugar.
- `src/lib/auth.ts` — Lógica de JWT. PROHIBIDO crear helpers de sesión paralelos.
- `src/services/billing.ts` — Único servicio de Stripe. PROHIBIDO usar la SDK de Stripe fuera de aquí.
- `src/utils/errors.ts` — Clase `AppError`. PROHIBIDO lanzar `Error` nativo.
- `src/utils/response.ts` — Clase `AppResponse`. Forma canónica de respuesta: `{ data, error, meta }`.

## 📐 Patrones Obligatorios
- **Consultas DB:** Prisma `findMany`/`findUnique` con `select` explícito. NUNCA `select: *`.
- **Manejo de errores:** Siempre `throw new AppError(code, message, statusCode)`. NUNCA `throw new Error()`.
- **Tipado:** `unknown` para datos externos. `zod` para validación. PROHIBIDO el uso de `any`.
- **Funciones:** Preferir composición funcional (`map`, `filter`, `reduce`) sobre bucles imperativos.
- **Commits:** Formato Conventional Commits (`feat:`, `fix:`, `chore:`, etc.).

## ⚙️ Workflow de Ejecución (Ciclo Riguroso)
1.  **Análisis:** Identifica la tarea y los archivos de reglas relevantes.
2.  **Carga:** Lee las reglas específicas necesarias de `.agent/rules/`.
3.  **Plan:** Genera un plan de 3 pasos con los archivos exactos que se modificarán.
4.  **Validación:** Pide aprobación del usuario antes de escribir código.
5.  **Implementación:** Escribe el código siguiendo TODAS las reglas cargadas.
6.  **Verificación:** Revisa que no se hayan introducido duplicados ni violaciones de servicios canónicos.