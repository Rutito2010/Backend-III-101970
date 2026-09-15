import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import usersRouter from './routes/users.js';
import ordersRouter from './routes/orders.js';
import deliveriesRouter from './routes/deliveries.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/deliveries', deliveriesRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), secret: JWT_SECRET });
});

app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

export default app;
 //server.js --> se encarga inicilizar todas las partes del proyecto --> app - mongoose
 // app.js --> configuracion de app
