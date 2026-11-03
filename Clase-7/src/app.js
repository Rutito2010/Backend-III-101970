import express from 'express';
import cors from 'cors';
import apiRouter from './routes/index.js';
import {errorHandler } from "./middlewares/errorHandler.js"
import { routeNotFoundHandle } from "./middlewares/routeNotFoundHandle.js"
import { loggerHttp } from './middlewares/httpLogger.js';
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./config/swagger.js"
import path from "path"


const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerHttp)

app.use("/uploads", express.static(path.resolve("uploads")))//--> sabiendo el archivo podemos exponer carpetas especificas para facil acceso o previsualizacion

app.use("/api/docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))

app.use('/api', apiRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// rutas no matcheadas
app.use(routeNotFoundHandle);

// manejo de errores
app.use(errorHandler);

export default app;
