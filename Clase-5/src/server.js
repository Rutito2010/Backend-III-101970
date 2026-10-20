import mongoose from 'mongoose';
import app from './app.js';
import config from './config/index.js';
import logger from './utils/logger.js';

const gracefullExit = (code) =>{
  logger.on("finish", ()=> process.exit(code))
  logger.end()
}
async function startServer() {
  try {
    await mongoose.connect(config.mongoUri);
    logger.info("MongoDB connected")
    app.listen(config.port, () => {
      logger.info(`Servidor en puerto ${config.port}`, { env: config.nodeEnv} )
    });
  } catch (error) {
      logger.fatal(error)
    gracefullExit(1)
  }
}

startServer();


/**
 * fatal - 0
 * error - 1
 * warning - 2
 * info - 3
 * http - 4
 * debug - 5
 */