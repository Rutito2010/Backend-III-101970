import { generateMockUsers } from "../mocks/user.mocks.js";
import { generateMockOrders } from "../mocks/order.mocks.js";
import { generateMockDeliveries } from "../mocks/delivery.mocks.js";
import usersRepo from "../repositories/users.repo.js";
import ordersRepo from "../repositories/orders.repo.js";
import deliveriesRepo from "../repositories/deliveries.repo.js";
import bcrypt from "bcrypt"
import { MOCKING_PARAMETERS, USER_ROLES, ORDER_STATUS } from "../constants/index.js";
import { createError, ErrorDictionary } from "../utils/errors.js";

class MocksService {
    parseQty(qty = MOCKING_PARAMETERS.DEFAULT, { min = 1 } = {}){
        const parsedQty = Number(qty)
        if(!Number.isInteger(parsedQty) || parsedQty < min || parsedQty > MOCKING_PARAMETERS.MAX){
            throw createError({
                ...ErrorDictionary.INVALID_QUANTITY,
                message: `qty debe ser un entero entre ${min} y ${MOCKING_PARAMETERS.MAX}`
            })
        }
        return parsedQty
    }

    getUsers(qty){
        return generateMockUsers(this.parseQty(qty))
    }

    async seedUsers(qty){
        const users = this.getUsers(qty)
        const usersToInsert = await Promise.all(
            users.map(async (user)=>({
                ...user,
                password: await bcrypt.hash(user.password, 10)
            }))
        )
        const usersInserted = await usersRepo.insertMany(usersToInsert)
        return {
            inserted: usersInserted.length,
            users: usersInserted,
            collection: "users"
        }
    }

    // si no recibe customers, usa los que ya están en la base
    async seedOrders(qty, customers){
        const parsedQty = this.parseQty(qty)
        const candidates = customers ?? await usersRepo.findByRole(USER_ROLES.CUSTOMER)
        const customerIds = candidates.map((customer) => customer._id)

        if(!customerIds.length){
            throw createError(ErrorDictionary.NO_USERS_FOR_MOCK)
        }

        const ordersInserted = await ordersRepo.insertMany(generateMockOrders(parsedQty, customerIds))
        return {
            inserted: ordersInserted.length,
            orders: ordersInserted,
            collection: "orders"
        }
    }

    async seedDeliveries(orders, drivers){
        const candidates = drivers ?? await usersRepo.findByRole(USER_ROLES.DRIVER)
        const driverIds = candidates
            .filter((driver) => driver.isAvailable)
            .map((driver) => driver._id)

        const deliveriesInserted = await deliveriesRepo.insertMany(generateMockDeliveries(orders, driverIds))

        // el pedido queda apuntando a su entrega
        await Promise.all(
            deliveriesInserted.map((delivery) => ordersRepo.update(delivery.order, {
                delivery: delivery._id,
                status: delivery.driver ? ORDER_STATUS.ASSIGNED : ORDER_STATUS.CREATED
            }))
        )

        return {
            inserted: deliveriesInserted.length,
            collection: "deliveries"
        }
    }

    async generateData({ users, orders, deliveries } = {}){
        const usersQty = this.parseQty(users)
        const ordersQty = this.parseQty(orders)
        const deliveriesQty = this.parseQty(deliveries ?? ordersQty, { min: 0 })

        if(deliveriesQty > ordersQty){
            throw createError({
                ...ErrorDictionary.INVALID_QUANTITY,
                message: "deliveries no puede superar a orders"
            })
        }

        const usersResult = await this.seedUsers(usersQty)
        const customers = usersResult.users.filter((user) => user.role === USER_ROLES.CUSTOMER)
        const drivers = usersResult.users.filter((user) => user.role === USER_ROLES.DRIVER)

        const ordersResult = await this.seedOrders(ordersQty, customers.length ? customers : undefined)
        const deliveriesResult = await this.seedDeliveries(
            ordersResult.orders.slice(0, deliveriesQty),
            drivers.length ? drivers : undefined
        )

        return {
            users: usersResult.inserted,
            orders: ordersResult.inserted,
            deliveries: deliveriesResult.inserted
        }
    }
}

export default new MocksService()
