import { Router } from 'express';
import usersRouter from './users.router.js';
import ordersRouter from './orders.router.js';
import deliveriesRouter from './deliveries.router.js';
import mocksRouter from "./mocks.router.js"
import loggerRouter from "./logger.router.js"
import config from '../config/index.js';
const router = Router();

router.use('/users', usersRouter);
router.use('/orders', ordersRouter);
router.use('/deliveries', deliveriesRouter);
router.use("/logger", loggerRouter )
// mocks solo fuera de production
if (config.nodeEnv !== 'production') {
  router.use("/mocks", mocksRouter)
}

export default router;
