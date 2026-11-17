import { Router } from 'express';
import ordersController from '../controllers/orders.controller.js';
const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Pizza muzzarella
 *         quantity:
 *           type: integer
 *           minimum: 1
 *           example: 2
 *         price:
 *           type: number
 *           minimum: 0
 *           example: 8500
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 6ad6b1eb0f2bce6b04fb30dc
 *         customer:
 *           type: string
 *           description: ID del usuario cliente
 *           example: 6ad6b1eb0f2bce6b04fb30db
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         deliveryAddress:
 *           type: string
 *           example: Av. Rivadavia 1234, Morón
 *         total:
 *           type: number
 *           example: 17000
 *         shippingCost:
 *           type: number
 *           example: 1500
 *         declaredValue:
 *           type: number
 *           example: 17000
 *         status:
 *           type: string
 *           enum: [created, assigned, picked_up, in_transit, delivered, cancelled]
 *           example: created
 *         priority:
 *           type: string
 *           enum: [low, normal, high]
 *           example: normal
 *         delivery:
 *           type: string
 *           nullable: true
 *           description: ID de la entrega asociada
 *           example: null
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-10-20T00:12:27.808Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-10-20T00:12:27.808Z"
 *         __v:
 *           type: integer
 *           example: 0
 */

/**
 * @openapi
 * /api/orders:
 *   get:
 *     summary: Obtener todos los pedidos
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 */
router.get('/', ordersController.findAll);

/**
 * @openapi
 * /api/orders/{id}:
 *   get:
 *     summary: Obtener un pedido por ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6ad6b1eb0f2bce6b04fb30dc
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: El ID recibido no es válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               error:
 *                 name: InvalidId
 *                 code: 2
 *                 message: El ID recibido no es válido
 *       404:
 *         description: Pedido no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               error:
 *                 name: OrderNotFound
 *                 code: 4
 *                 message: Pedido no encontrado
 */
router.get('/:id', ordersController.findById);

/**
 * @openapi
 * /api/orders:
 *   post:
 *     summary: Crear un pedido
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer
 *               - items
 *               - deliveryAddress
 *             properties:
 *               customer:
 *                 type: string
 *                 description: ID del usuario cliente
 *                 example: 6ad6b1eb0f2bce6b04fb30db
 *               items:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   $ref: '#/components/schemas/OrderItem'
 *               deliveryAddress:
 *                 type: string
 *                 example: Av. Rivadavia 1234, Morón
 *               shippingCost:
 *                 type: number
 *                 example: 1500
 *               declaredValue:
 *                 type: number
 *                 example: 17000
 *               priority:
 *                 type: string
 *                 enum: [low, normal, high]
 *                 example: normal
 *     responses:
 *       201:
 *         description: Pedido creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Datos inválidos o cuerpo de la petición con JSON mal formado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               ValidationError:
 *                 summary: Datos inválidos
 *                 value:
 *                   status: error
 *                   error:
 *                     name: ValidationError
 *                     code: 2
 *                     message: Datos inválidos
 *               InvalidJson:
 *                 summary: JSON mal formado
 *                 value:
 *                   status: error
 *                   error:
 *                     name: InvalidJson
 *                     code: 2
 *                     message: El cuerpo de la petición no es un JSON válido
 *       404:
 *         description: El cliente especificado no existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               error:
 *                 name: UserNotFound
 *                 code: 4
 *                 message: Usuario no encontrado
 */
router.post('/', ordersController.create);

/**
 * @openapi
 * /api/orders/{id}:
 *   put:
 *     summary: Actualizar un pedido
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6ad6b1eb0f2bce6b04fb30dc
 *         description: ID del pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   $ref: '#/components/schemas/OrderItem'
 *               deliveryAddress:
 *                 type: string
 *                 example: Av. Rivadavia 5678, Morón
 *               shippingCost:
 *                 type: number
 *                 example: 2000
 *               declaredValue:
 *                 type: number
 *                 example: 20000
 *               status:
 *                 type: string
 *                 enum: [created, assigned, picked_up, in_transit, delivered, cancelled]
 *                 example: cancelled
 *               priority:
 *                 type: string
 *                 enum: [low, normal, high]
 *                 example: high
 *     responses:
 *       200:
 *         description: Pedido actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: ID inválido, datos inválidos, estado inválido o JSON mal formado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               InvalidId:
 *                 summary: ID inválido
 *                 value:
 *                   status: error
 *                   error:
 *                     name: InvalidId
 *                     code: 2
 *                     message: El ID recibido no es válido
 *               ValidationError:
 *                 summary: Datos inválidos
 *                 value:
 *                   status: error
 *                   error:
 *                     name: ValidationError
 *                     code: 2
 *                     message: Datos inválidos
 *               InvalidStatus:
 *                 summary: Estado inválido
 *                 value:
 *                   status: error
 *                   error:
 *                     name: InvalidStatus
 *                     code: 2
 *                     message: Estado de pedido invalido
 *               InvalidJson:
 *                 summary: JSON mal formado
 *                 value:
 *                   status: error
 *                   error:
 *                     name: InvalidJson
 *                     code: 2
 *                     message: El cuerpo de la petición no es un JSON válido
 *       404:
 *         description: Pedido no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               error:
 *                 name: OrderNotFound
 *                 code: 4
 *                 message: Pedido no encontrado
 */
router.put('/:id', ordersController.update);

/**
 * @openapi
 * /api/orders/{id}:
 *   delete:
 *     summary: Eliminar un pedido
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6ad6b1eb0f2bce6b04fb30dc
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Pedido eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: El ID recibido no es válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               error:
 *                 name: InvalidId
 *                 code: 2
 *                 message: El ID recibido no es válido
 *       404:
 *         description: Pedido no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               error:
 *                 name: OrderNotFound
 *                 code: 4
 *                 message: Pedido no encontrado
 */
router.delete('/:id', ordersController.delete);

export default router;