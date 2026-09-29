import deliveriesRepo from '../repositories/deliveries.repo.js';
import ordersRepo from '../repositories/orders.repo.js';
import usersRepo from '../repositories/users.repo.js';
import { USER_ROLES } from '../constants/index.js';
class DeliveriesService {
  async findAll(filter = {}) {
    return deliveriesRepo.findAll(filter);
  }

  async findById(id) {
    const delivery = await deliveriesRepo.findById(id);
    if (!delivery) {
      throw new Error('Entrega no encontrada', 404);
    }
    return delivery;
  }

  async create(deliveryData) {
    const order = await ordersRepo.findById(deliveryData.order);
    if (!order) {
      throw new Error('El pedido especificado no existe', 400);
    }
    if (deliveryData.driver) {
      const driver = await usersRepo.findById(deliveryData.driver);
      if (!driver) {
        throw new Error('El repartidor especificado no existe');
      }
      if (driver.role !== USER_ROLES.DRIVER) {
        throw new Error('El usuario no es driver');
      }
    }

    const newDelivery = await deliveriesRepo.create(deliveryData);
    return newDelivery;
  }

  async update(id, deliveryData) {
    const updatedDelivery = await deliveriesRepo.update(id, deliveryData);
    if (!updatedDelivery) {
      throw new Error('Entrega no encontrada');
    }
    return updatedDelivery;
  }

  async delete(id) {
    const deletedDelivery = await deliveriesRepo.delete(id);
    if (!deletedDelivery) {
      throw new Error('Entrega no encontrada');
    }
    return deletedDelivery;
  }
}

export default new DeliveriesService();
