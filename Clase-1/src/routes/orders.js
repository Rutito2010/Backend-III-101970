import { Router } from 'express';
import OrderController from '../controllers/order.contoller.js';

const orderContoller = new OrderController()
const router = Router();

const emailProvider = {
  send: async (message) => {
    console.log('[EMAIL] ' + message);
  }
};

/**
 * Logica de negocio --> services
 * Acceso a los modelos --> repositorios
 * Validaciones --> middlewares o services
 * Logica de envio de emails --> su propio service o a un utils
 * Logica de controladores --> manejo de errores - paso de informacion - definicion de respuesta
 */
router.get('/', orderContoller.getAll );

router.get('/:id', orderContoller.getOrderById);

router.post('/', orderContoller.create);

router.put('/:id', orderContoller.update);

router.delete('/:id', orderContoller.delete);

export default router;
