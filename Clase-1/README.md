# ShipNow API

API de logística con Node.js, Express y MongoDB.

## Requisitos

- Node.js 18+
- MongoDB en local

## Instalación

```bash
npm install
npm run dev
```

La app se conecta a `mongodb://localhost:27017/shipnow` (valor en `src/server.js`) y escucha en el puerto `8080`.

## Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/health` | Health check |
| GET/POST | `/api/users` | Listar / crear usuarios |
| GET/PUT/DELETE | `/api/users/:id` | Obtener / actualizar / eliminar |
| GET/POST | `/api/orders` | Listar / crear pedidos |
| GET/PUT/DELETE | `/api/orders/:id` | Obtener / actualizar / eliminar |
| GET/POST | `/api/deliveries` | Listar / crear entregas |
| GET/PUT/DELETE | `/api/deliveries/:id` | Obtener / actualizar / eliminar |

## Postman

1. Importá `postman/ShipNow-Clase-1.postman_collection.json`
2. Importá `postman/ShipNow-Clase-1.postman_environment.json`
3. Seleccioná el environment **ShipNow Clase-1 Local**
4. Corré la carpeta **00 - Flujo completo**

## Scripts

| Comando | Uso |
| --- | --- |
| `npm run dev` | Desarrollo con nodemon |
| `npm start` | Producción |
