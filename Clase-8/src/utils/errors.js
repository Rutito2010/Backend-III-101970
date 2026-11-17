export const EErrors = {
  ROUTING_ERROR:1,
  INVALID_TYPES_ERROR:2,
  DATABASE_ERROR:3,
  NOT_FOUND_ERROR:4,
  RESOURCE_ALREADY_EXISTS:5,
  INVALID_RESOURSE_PROPERTY:6,
  MISSING_API_KEY:7,
}

export const ErrorDictionary = {
  USER_NOT_FOUND: {name:"UserNotFound", code:EErrors.NOT_FOUND_ERROR, status:404, message:"Usuario no encontrado" },
  ORDER_NOT_FOUND: {name:"OrderNotFound", code:EErrors.NOT_FOUND_ERROR, status:404, message:"Pedido no encontrado" },
  DELIVERY_NOT_FOUND: {name:"DeliveryNotFound", code:EErrors.NOT_FOUND_ERROR, status:404, message:"Entrega no encontrada" },
  ORDER_REQUIRED: {name:"OrderRequired", code:EErrors.INVALID_RESOURSE_PROPERTY, status:400, message:"El pedido especificado no existe" },
  DRIVER_NOT_FOUND: {name:"DriverNotFound", code:EErrors.NOT_FOUND_ERROR, status:400, message:"El repartidor especificado no existe" },
  INVALID_DRIVER_ROLE: {name:"InvalidDriverRole", code:EErrors.INVALID_RESOURSE_PROPERTY, status:400, message:"El usuario no es driver" },
  INVALID_STATUS: {name:"InvalidStatus", code:EErrors.INVALID_TYPES_ERROR, status:400, message:"Estado de pedido invalido" },
  ADMIN_CREATION_FORBIDDEN:{name:"AdminCreationForbidden", code:EErrors.INVALID_RESOURSE_PROPERTY, status:403, message:"No se puede crear un admin desde este endpoint"},
  USER_ALREADY_EXISTS:{name:"UserAlreadyExists", code:EErrors.RESOURCE_ALREADY_EXISTS, status:409, message:"Ya existe un usuario"},
  INVALID_QUANTITY: { name: "InvalidQuantity", code: EErrors.INVALID_RESOURSE_PROPERTY, status: 400, message: "Cantidad inválida"},
  NO_USERS_FOR_MOCK: { name: "NoUsersForMock", code: EErrors.INVALID_RESOURSE_PROPERTY, status: 400, message: "No hay usuarios suficientes para generar los datos mock"},
  MISSING_API_KEY: {name: "MissingApiKey", code: EErrors.MISSING_API_KEY, status: 500, message: "Configuración inválida: falta API Key"},
  INVALID_ID:{ name: "InvalidId", code: EErrors.INVALID_TYPES_ERROR,  status: 400, message: "El ID recibido no es válido" },
  VALIDATION_ERROR:{ name: "ValidationError", code: EErrors.INVALID_TYPES_ERROR, status: 400, message: "Datos inválidos" },
  INVALID_JSON:{ name: "InvalidJson",   code: EErrors.INVALID_TYPES_ERROR,  status: 400, message: "El cuerpo de la petición no es un JSON válido" },
  ROUTE_NOT_FOUND: { name: "RouteNotFound", code: EErrors.ROUTING_ERROR, status: 404, message: "Ruta no encontrada" },
}


export const createError = ({name, code, status, message, cause}) => {
  const error = new Error(message,{cause})
  error.name= name
  error.code = code
  error.status = status
  return error
}
