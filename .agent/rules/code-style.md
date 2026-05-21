---
trigger: always_on
---

# Guía de Estilo de Código

## Nombrado
- **Archivos:** `kebab-case.ts`
- **Componentes React:** `PascalCase.tsx`
- **Funciones/Variables:** `camelCase`
- **Constantes globales:** `SCREAMING_SNAKE_CASE`

## Estructura de Componentes
- Un componente por archivo.
- Si tiene lógica compleja, extraer a un hook personalizado en `hooks/useX.ts`.
- Props tipadas con `interface`, nunca con `type`.

## Imports
- Librerías externas primero.
- Luego módulos internos absolutos (`@/components/...`).
- Finalmente imports relativos (`./utils`).