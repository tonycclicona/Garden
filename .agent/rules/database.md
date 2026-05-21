---
trigger: always_on
---

# Reglas de Base de Datos

## Migraciones
- Nunca edites migraciones existentes. Crea siempre una nueva.
- Antes de crear una migración, revisa que no haya datos que puedan perderse.
- Comando seguro: `npx prisma migrate dev --name <descripción> --create-only`

## Consultas
- Usa siempre `select` explícito para evitar over-fetching.
- Las consultas que devuelvan listas deben tener paginación (`take`, `skip`).
- Usa `include` solo para relaciones directas. Para relaciones anidadas, usa `select`.