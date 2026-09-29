import express from 'express';
import cors from 'cors';
import apiRouter from './routes/index.js';
import {errorHandler } from "./middlewares/errorHandler.js"
import { routeNotFoundHandle } from "./middlewares/routeNotFoundHandle.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// rutas no matcheadas
app.use(routeNotFoundHandle);

// manejo de errores
app.use(errorHandler);

export default app;
