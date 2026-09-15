# ShipNow API — Versión 1 (punto de partida)

API de logística de ShipNow **tal como llega al inicio de la semana**. Corre, crea usuarios, pedidos y entregas, y habla con MongoDB.

Eso no significa que esté lista para crecer.

## Qué vas a encontrar

- Express + Mongoose en un solo `src/server.js`
- Rutas que validan, calculan, consultan la base y responden HTTP en el mismo archivo
- Puerto, URI de Mongo y secretos escritos en el código
- Roles y estados como strings sueltos (`'admin'`, `'created'`, `'delivered'`)

El material de la clase está en `docs-clase/`. El paso a paso parte de **este** árbol y lo lleva a una arquitectura por capas.

Snapshots en `docs-clase/demo/`:

| Carpeta | Rol |
| --- | --- |
| `start/` | Partida congelada de esta clase (seed v1). Sirve para resetear. |
| `solucion/` | Llegada de esta clase. **Es el start de Clase-2.** |

No arranques la semana desde `solucion/`.

## Instalación

```bash
npm install
npm run dev
```

MongoDB tiene que estar levantado. La app se conecta a `mongodb://localhost:27017/shipnow` (valor fijo en `src/server.js`).

## Postman

En `postman/`:

1. Importá `ShipNow-Clase-1.postman_collection.json`
2. Importá `ShipNow-Clase-1.postman_environment.json`
3. Seleccioná el environment **ShipNow Clase-1 Local**
4. Corré la carpeta **00 - Flujo completo** (Run collection) o request por request

Los scripts guardan `userId`, `driverId`, `orderId` y `deliveryId` solos. Sirven en v1 (objeto plano) y después del refactor (`{ status, payload }`).

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/health | Health check |
| GET | /api/users | Listar usuarios |
| GET | /api/users/:id | Obtener usuario por ID |
| POST | /api/users | Crear usuario |
| PUT | /api/users/:id | Actualizar usuario |
| DELETE | /api/users/:id | Eliminar usuario |
| GET | /api/orders | Listar pedidos |
| GET | /api/orders/:id | Obtener pedido por ID |
| POST | /api/orders | Crear pedido |
| PUT | /api/orders/:id | Actualizar pedido |
| DELETE | /api/orders/:id | Eliminar pedido |
| GET | /api/deliveries | Listar entregas |
| GET | /api/deliveries/:id | Obtener entrega por ID |
| POST | /api/deliveries | Crear entrega |
| PUT | /api/deliveries/:id | Actualizar entrega |
| DELETE | /api/deliveries/:id | Eliminar entrega |

## Objetivo de la semana

Pasar de este proyecto a:

- `Router → Controller → Service → Repository → Model`
- Configuración de entorno validada al arranque
- Constantes de dominio (roles, estados, prioridades)
