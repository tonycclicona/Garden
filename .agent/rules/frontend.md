---
trigger: always_on
---

# Reglas de Frontend

## Componentes
- **Server Components por defecto:** Usar 'use client' solo cuando sea necesario.
- **Tamaño máximo:** 300 líneas por componente.
- **Props:** Tipadas con `interface`. Usar `React.FC` solo si se necesitan children.

## Estado
- **Server State:** TanStack Query (React Query) para datos del servidor.
- **Client State:** Zustand para estado global del cliente.
- **Local State:** useState para estado local al componente.
- **NO usar Context API** para estado que cambia frecuentemente.

## Estilos
- Tailwind CSS para estilos.
- Componentes base de shadcn/ui.
- NO crear estilos personalizados si shadcn ya tiene el componente.
- Variables CSS en `globals.css` para colores/temas.

## Rendimiento
- `React.memo` para componentes puros con props complejas.
- `useMemo`/`useCallback` solo cuando haya problemas de rendimiento medibles.
- Carga diferida con `next/dynamic` para componentes pesados.
- Optimizar imágenes con `next/image`.

## Accesibilidad
- Usar atributos ARIA en componentes interactivos.
- Asegurar navegación por teclado.
- Contrastes de color WCAG AA mínimo.
- Labels en todos los inputs.