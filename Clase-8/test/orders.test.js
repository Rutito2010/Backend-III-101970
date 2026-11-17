import mongoose from "mongoose"
import dotenv from "dotenv"
import OrdersRepository from  "../src/repositories/orders.repo.js"
import UsersRepository from  "../src/repositories/users.repo.js"
import "../src/models/delivery.model.js" // registra el modelo Delivery para que funcione populate("delivery")
import {expect} from "chai"


dotenv.config()

mongoose.connect(process.env.MONGODB_URI_TEST)

const customerData = {
        firstName:"Ana",
        lastName:"Gomez",
        email:"ana_gomez_orders@gmail.com",
        password:"123456"
}

const orderData = {
        items:[
            { name:"Notebook", quantity:1, price:1500 },
            { name:"Mouse", quantity:2, price:50 }
        ],
        deliveryAddress:"Av. Siempre Viva 742",
        total:1600,
        shippingCost:200,
        declaredValue:1600,
        priority:"high"
}

let customerId = ""
let orderId = ""

describe("Testing Repository de Orders", ()=>{

    before(async ()=>{
        await mongoose.connection.collection("orders").deleteMany({})
        await mongoose.connection.collection("users").deleteMany({email:customerData.email})
        const customer = await UsersRepository.create(customerData)
        customerId = customer._id
    })

    after(async ()=>{
        await mongoose.connection.collection("orders").deleteMany({})
        await UsersRepository.delete(customerId)
    })

    it("Crear una orden completa",async ()=>{
        const orderCreated = await OrdersRepository.create({...orderData, customer:customerId})
        orderId = orderCreated._id
        expect(orderCreated).to.have.property("_id")
        expect(String(orderCreated.customer)).to.equal(String(customerId))
        expect(orderCreated).to.have.property("deliveryAddress","Av. Siempre Viva 742")
        expect(orderCreated).to.have.property("delivery",null)
    })

    it("Buscar orden por id",async()=>{
        const orderFound = await OrdersRepository.findById(orderId)
        expect(String(orderFound._id)).to.equal(String(orderId))
        expect(orderFound.customer).to.have.property("firstName","Ana")
        expect(orderFound.customer).to.have.property("email","ana_gomez_orders@gmail.com")
    })

    it("Buscar todas las órdenes",async()=>{
        const orders = await OrdersRepository.findAll()
        expect(orders).to.be.an("array")
        expect(orders[0].customer).to.have.property("lastName","Gomez")
    })

    it("Actualizar una orden",async()=>{
        const orderUpdated = await OrdersRepository.update(orderId,{status:"assigned", priority:"normal"})
        expect(String(orderUpdated._id)).to.equal(String(orderId))
        expect(orderUpdated).to.have.property("status","assigned")
        expect(orderUpdated).to.have.property("priority","normal")
        expect(orderUpdated).to.have.property("deliveryAddress","Av. Siempre Viva 742")
    })

    it("Eliminar una orden",async()=>{
        const orderDeleted = await OrdersRepository.delete(orderId)
        expect(String(orderDeleted._id)).to.equal(String(orderId))

        const orderFound = await OrdersRepository.findById(orderId)
        expect(orderFound).to.be.null
    })

})