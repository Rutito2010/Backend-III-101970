import { faker } from "@faker-js/faker"
import { ORDER_STATUS, DELIVERY_PRIORITY } from "../constants/index.js"

const generateMockItem = () => ({
    name: faker.commerce.productName(),
    quantity: faker.number.int({ min: 1, max: 5 }),
    price: Number(faker.commerce.price({ min: 500, max: 20000, dec: 0 }))
})

export const generateMockOrder = (customerId) =>{
    const items = faker.helpers.multiple(generateMockItem, { count: { min: 1, max: 3 } })
    const itemsTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    // costo fijo de desarrollo, igual que calculateShippingCost fuera de production
    const shippingCost = 10

    return {
        customer: customerId,
        items,
        deliveryAddress: faker.location.streetAddress(),
        declaredValue: itemsTotal,
        shippingCost,
        total: itemsTotal + shippingCost,
        status: ORDER_STATUS.CREATED,
        priority: faker.helpers.arrayElement(Object.values(DELIVERY_PRIORITY))
    }
}

export const generateMockOrders = (qty, customerIds) =>{
    const ordersData = []

    for (let i = 0; i < qty; i++){
        ordersData.push(generateMockOrder(faker.helpers.arrayElement(customerIds)))
    }

    return ordersData
}
