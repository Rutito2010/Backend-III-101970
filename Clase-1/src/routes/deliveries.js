import { Router } from 'express';
import Delivery from '../models/delivery.model.js';
import Order from '../models/order.model.js';
import User from '../models/user.model.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const deliveries = await Delivery.find().populate('order').populate('driver');
    res.json(deliveries);
  } catch (error) {
    res.status(500).send('Error del servidor');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id).populate('order').populate('driver');
    if (!delivery) return res.status(404).send('Entrega no encontrada');
    res.json(delivery);
  } catch (error) {
    res.status(500).send('Error del servidor');
  }
});

router.post('/', async (req, res) => {
  try {
    if (!req.body.order) return res.status(400).send('Falta order');

    const order = await Order.findById(req.body.order);
    if (!order) return res.status(404).send('Pedido no encontrado');

    if (req.body.driver) {
      const driver = await User.findById(req.body.driver);
      if (!driver) return res.status(404).send('Repartidor no encontrado');
      if (driver.role !== 'driver') {
        return res.status(400).send('El usuario no es driver');
      }
    }

    const newDelivery = await Delivery.create({
      order: req.body.order,
      driver: req.body.driver || null,
      status: req.body.driver ? 'assigned' : 'pending',
      priority: req.body.priority || 'normal',
      assignedAt: req.body.driver ? new Date() : null
    });

    order.status = 'assigned';
    order.delivery = newDelivery._id;
    await order.save();

    res.status(201).json(newDelivery);
  } catch (error) {
    res.status(500).send('Error del servidor');
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (req.body.status === 'delivered') {
      req.body.deliveredAt = new Date();
    }

    const delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!delivery) return res.status(404).send('Entrega no encontrada');
    res.json(delivery);
  } catch (error) {
    res.status(500).send('Error del servidor');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndDelete(req.params.id);
    if (!delivery) return res.status(404).send('Entrega no encontrada');
    res.json({ message: 'Entrega eliminada' });
  } catch (error) {
    res.status(500).send('Error del servidor');
  }
});

export default router;
