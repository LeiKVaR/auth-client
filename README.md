# AuthLab — Cliente de Autenticación (React + Vite)

Un cliente React para autenticación que incluye registro, inicio de sesión, perfil de usuario y protección de rutas. Esta versión está adaptada a tu proyecto local y a la API de ejemplo usada en el código.

## Características principales
- Registro, inicio de sesión y cierre de sesión.
- Manejo de token (localStorage / sessionStorage) y protección de rutas.
- Perfil de usuario con llamada a la API.
- Estado global con Context API y hooks personalizados.
- Estilos modulares (CSS Modules).

## Estructura relevante
- Punto de entrada: `src/main.jsx`
- Componente root / proveedor: `src/App.jsx`
- Ruteo: `src/router.jsx`
- Contexto de autenticación: `src/features/auth/context/AuthContext.jsx`
- Re-export hook: `src/features/auth/hooks/useAuth.js`
- Servicios HTTP: `src/features/auth/services/authServices.js` y `src/features/profile/services/profileServices.js`
- Rutas protegidas: `src/components/ProtectedRoute.jsx`
- Páginas: `src/features/auth/pages/{Login,Register}.jsx`, `src/features/profile/pages/Profile.jsx`

## Instalación & ejecución
1. Instala dependencias:
   ```sh
   npm install
   ```
2. Ejecuta en desarrollo:
   ```sh
   npm run dev
   ```
3. Abre la app en:
   ```
   http://localhost:5173
   ```

## Scripts útiles (package.json)
- `npm run dev` — servidor de desarrollo (Vite)
- `npm run build` — empaquetado
- `npm run preview` — previsualizar build
- `npm run lint` — ESLint

## API usada (configurada en el servicio)
Base URL (actual):  
`https://reflexoperu-v3.marketingmedico.vip/backend/public/api/`

Endpoints importantes:
- POST `/register` → registro
- POST `/login` → login (devuelve `token`)
- GET `/profile` → perfil (Authorization: Bearer <token>)
- DELETE `/logout` → cerrar sesión

Ejemplo de body para login:
```json
{
  "email": "usuario@ejemplo.com",
  "password": "tuPassword"
}
```

> Nota: El token se guarda en `localStorage` / `sessionStorage` desde `src/features/auth/services/authServices.js`.

## Cómo funciona (resumen técnico)
- `AuthProvider` verifica token al montar; si existe, llama a `/profile` para poblar `user`.
- `authService` inyecta el token en los headers via interceptor de Axios.
- `ProtectedRoute` usa `useAuth()` para permitir o redirigir a `/login`.
- `useProfile` encapsula lógica de fetch/actualización de perfil.

## Buenas prácticas / recomendaciones
- Mover la URL base a una variable de entorno (ej. `VITE_API_BASE_URL`) en `vite.config` o usar `import.meta.env`.
- Considerar almacenamiento seguro (httpOnly cookies) en backend para mayor seguridad.
- Añadir manejo uniforme de errores y un spinner global si la app crece.
- Agregar tests para los hooks y servicios.

## Enlaces rápidos al código (abre los archivos)
- [src/main.jsx](src/main.jsx)  
- [src/App.jsx](src/App.jsx) (`App`)  
- [src/router.jsx](src/router.jsx) (`AppRouter`)  
- [src/components/ProtectedRoute.jsx](src/components/ProtectedRoute.jsx) (`ProtectedRoute`)  
- [src/features/auth/context/AuthContext.jsx](src/features/auth/context/AuthContext.jsx) (`AuthProvider`, `useAuth`)  
- [src/features/auth/hooks/useAuth.js](src/features/auth/hooks/useAuth.js) (`useAuth` re-export)  
- [src/features/auth/services/authServices.js](src/features/auth/services/authServices.js) (`authService`)  
- [src/features/profile/services/profileServices.js](src/features/profile/services/profileServices.js) (`profileService`)  
- [package.json](package.json)

## Contribuir
Abre un issue o PR si quieres:
- Añadir variables de entorno
- Internacionalización
- Tests unitarios / E2E

---
Archivo generado para tu proyecto local. Ajusta las secciones de API/entorno según necesites.