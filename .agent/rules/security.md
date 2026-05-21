---
trigger: always_on
---

# Reglas de Seguridad

## Autenticación y Autorización
- JWT con refresh tokens rotativos.
- Tokens en cookies httpOnly, nunca en localStorage.
- Validar roles/permisos en cada endpoint protegido.
- Rate limiting en endpoints de autenticación.

## Validación de Datos
- **Todo input externo debe ser validado con Zod/Yup.**
- Sanitizar datos antes de guardar en DB.
- Escapar output en el frontend (React lo hace por defecto).

## Secretos y Configuración
- **NUNCA** hardcodear secretos en el código.
- Usar variables de entorno (`.env`).
- El archivo `.env` NUNCA se commitea.
- Rotar secretos regularmente.

## Protección de APIs
- CORS configurado con orígenes específicos.
- Helmet.js para headers de seguridad.
- Rate limiting en todas las rutas públicas.
- Validar Content-Type en cada request.

## Datos Sensibles
- Encriptar datos sensibles en reposo (AES-256).
- Hashear contraseñas con bcrypt/argon2.
- No loggear datos sensibles (contraseñas, tokens, DNI).
- Enmascarar datos sensibles en logs.