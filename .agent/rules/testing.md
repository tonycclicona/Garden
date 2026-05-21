---
trigger: always_on
---

# Reglas de Testing

## Framework y Herramientas
- **Unitarios:** Vitest + React Testing Library
- **Integración:** Vitest + Supertest
- **E2E:** Playwright

## Estructura de Tests
- Archivos de test junto al código fuente: `[nombre].test.ts`
- Carpeta `__tests__/` solo para tests de integración complejos.

## Cobertura Mínima
- Services/Utils: 90%
- Components: 80%
- Hooks: 85%
- No exigir 100% si el código restante es trivial.

## Nombrado de Tests
- Describir el comportamiento esperado: `should [comportamiento] when [condición]`
- Ejemplo: `should return 401 when token is expired`

## Patrones
- **Arrange-Act-Assert:** Estructura clara en 3 bloques.
- **Mock solo lo externo:** APIs, DB, servicios de terceros.
- **No mockear utilidades puras:** Si son funciones sin efectos secundarios, testearlas directamente.
- **Un assert por test:** Preferir tests atómicos con un solo concepto.