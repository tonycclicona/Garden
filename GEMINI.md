# GEMINI.md — Control de Contexto para Antigravity

## 🔍 Regla de Carga Inteligente
Antes de ejecutar cualquier tarea, analiza su naturaleza y carga ÚNICAMENTE los archivos de reglas pertinentes de `.agent/rules/`:
- Si la tarea involucra esquemas, migraciones o consultas → carga `.agent/rules/database.md`
- Si la tarea es sobre lógica de negocio, controladores o servicios → carga `.agent/rules/architecture.md` y `.agent/rules/code-style.md`
- Si la tarea es sobre tests → carga `.agent/rules/testing.md`
- Si la tarea maneja datos de usuario, autenticación o tokens → carga `.agent/rules/security.md`

## ⚡ Principios Innegociables
- NUNCA generes código sin haber leído las reglas relevantes.
- Antes de responder, confirma en tu pensamiento: "He leído las reglas [X] para esta tarea".
- Prioriza siempre la simplicidad: menos código, menos tokens, menos bugs.