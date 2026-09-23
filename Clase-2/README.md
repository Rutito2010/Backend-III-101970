# ShipNow API

API de logística con Node.js, Express y MongoDB (Backend III — Coderhouse).

Arquitectura por capas: `Router → Controller → Service → Repository → Model`.

## Requisitos

- Node.js 18+
- MongoDB local o remoto

## Instalación

```bash
npm install
cp .env.example .env
```

Completá `.env` y levantá:

```bash
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

## Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/health` | Health check |
| CRUD | `/api/users` | Usuarios |
| CRUD | `/api/orders` | Pedidos |
| CRUD | `/api/deliveries` | Entregas |

Formato de éxito: `{ "status": "success", "payload": ... }`  
Formato de error: `{ "status": "error", "message": "..." }`

## Postman

1. Importá `postman/ShipNow-Clase-2.postman_collection.json`
2. Importá `postman/ShipNow-Clase-2.postman_environment.json`
3. Seleccioná **ShipNow Clase-2 Local**

## Scripts

| Comando | Uso |
| --- | --- |
| `npm run dev` | Desarrollo |
| `npm start` | Producción |
