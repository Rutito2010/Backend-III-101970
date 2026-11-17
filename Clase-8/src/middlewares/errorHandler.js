import {createError, ErrorDictionary} from "../utils/errors.js"
import logger from "../utils/logger.js"
export const errorHandler = (err,req,res,next) =>{
    //Id de Mongo mal formado
    if(err.name === "CastError"){
        err = createError(ErrorDictionary.INVALID_ID)
    }

    if(err.type === "entity.parse.failed"){
        err = createError(ErrorDictionary.INVALID_JSON)
    }

    // validaciones del schema de Mongoose
    if(err.name === "ValidationError"){
        err = createError({ ...ErrorDictionary.VALIDATION_ERROR, message: err.message })
    }
    
    const status = err.status ?? 500
    const meta = {
        requestId: req?.requestId ?? "",
        method: req?.method ?? "",
        path: req?.originalUrl,
        code: err.code ?? 0
    }

    if(status >=500){
        logger.error(`${err.name} - ${err.message}`, {...meta, stack: err.stack })
    }else{
        logger.warning(`${err.name} - ${err.message}`, meta)
    }
    
    res.status(status).json({
        status:"error",
        error:{
            name: err.name ? err.name : "InternalError",
            code:err.code ? err.code : 0,
            message:err.message? err.message : "Error interno del servidor"
        }
    })
}
