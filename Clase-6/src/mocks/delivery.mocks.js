import { faker } from "@faker-js/faker"
import { DELIVERY_STATUS } from "../constants/index.js"

export const generateMockDelivery = (order, driverId = null) =>{
    return {
        order: order._id,
        driver: driverId,
        status: driverId ? DELIVERY_STATUS.ASSIGNED : DELIVERY_STATUS.PENDING,
        priority: order.priority,
        assignedAt: driverId ? faker.date.recent({ days: 3 }) : null
    }
}

// una entrega por pedido; si no hay drivers queda pendiente
export const generateMockDeliveries = (orders, driverIds = []) =>{
    return orders.map((order) => {
        const driverId = driverIds.length ? faker.helpers.arrayElement(driverIds) : null
        return generateMockDelivery(order, driverId)
    })
}
