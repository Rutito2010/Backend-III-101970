import {createError, ErrorDictionary} from "../utils/errors.js"

export const errorHandler = (err,req,res,next) =>{
    //Id de Mongo mal formado
    if(err.name === "CastError"){
        err = createError(ErrorDictionary.INVALID_ID)
    }

    if(err.type === "entity.parse.failed"){
        err = createError(ErrorDictionary.INVALID_JSON)
    }

    res.status(err.status ? err.status :"500").json({
        status:"error",
        error:{
            name: err.name ? err.name : "InternalError",
            code:err.code ? err.code : 0,
            message:err.message? err.message : "Error interno del servidor"
        }
    })
}