---
trigger: always_on
---

## Principios de Diseño
- **Alta cohesión:** Cada módulo/servicio hace UNA cosa bien.
- **Bajo acoplamiento:** Los módulos se comunican a través de interfaces, no de implementaciones.
- **Inmutabilidad:** Preferir estructuras de datos inmutables.
- **Composición sobre herencia:** Usar composición de funciones y componentes.

## Patrones de API
- REST para operaciones CRUD.
- GraphQL solo si hay necesidades complejas de datos (aprobado por el equipo).
- Todas las respuestas deben seguir el formato canónico: `{ data, error, meta }`.