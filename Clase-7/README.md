# ShipNow API

API de logística con Node.js, Express y MongoDB (Backend III — Coderhouse).

Arquitectura por capas (`Router → Controller → Service → Repository → Model`),
módulo de mocking, manejo centralizado de errores, logging con Winston, Swagger
y suite de tests funcionales.

## Requisitos

- Node.js 18+
- MongoDB local o remoto

## Instalación

```bash
npm install
cp .env.example .env
npm run dev
```

Servidor en `http://localhost:8080`.

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `PORT` | Puerto (default `8080`) |
| `MONGODB_URI` | Conexión a MongoDB |
| `JWT_SECRET` | Secreto JWT |
| `NODE_ENV` | `development` \| `test` \| `production` |
| `LOG_LEVEL` | Nivel mínimo de logs (default `debug`) |

## Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/health` | Health check |
| CRUD | `/api/users` | Usuarios |
| CRUD | `/api/orders` | Pedidos |
| CRUD | `/api/deliveries` | Entregas |
| GET | `/api/mocks/users?qty=N` | Usuarios mock sin guardar |
| POST | `/api/mocks/users?qty=N` | Inserta N usuarios mock |
| POST | `/api/mocks/generateData?users=N&orders=N&deliveries=N` | Seed mock |
| GET | `/api/docs` | Swagger UI |
| GET | `/api/logger` | Prueba de niveles de log |

`/api/mocks` no existe con `NODE_ENV=production`. `qty` va de 1 a 50.

## Manejo de errores

Todos los errores pasan por un middleware global:

```json
{ "status": "error", "error": { "name": "UserNotFound", "code": 4, "message": "Usuario no encontrado" } }
```

**Decisión técnica:** los services lanzan errores del diccionario y los
controllers solo hacen `next(error)`. Así el status y el mensaje viven en un
solo lugar.

## Postman

1. Importá `postman/ShipNow-Clase-7.postman_collection.json`
2. Importá `postman/ShipNow-Clase-7.postman_environment.json`
3. Seleccioná **ShipNow Clase-7 Local**

## Scripts

| Comando | Uso |
| --- | --- |
| `npm run dev` | Desarrollo |
| `npm start` | Producción |
