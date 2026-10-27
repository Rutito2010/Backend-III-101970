import { expect } from "chai"
import supertest from "supertest"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

mongoose.connect(process.env.MONGODB_URI_TEST)

const requester = supertest("http://localhost:8080")

const user = {
        firstName:"Jose",
        lastName:"Perez",
        email:"jose_perez@gmail.com",
        password:"123456"
}

const user2 = {
        firstName:"Maria",
        lastName:"Gomez",
        email:"maria_gomez@gmail.com",
        password:"123456"
}

let userId = ""
let user2Id = ""

const idInvalido = "123abc"
const idInexistente = new mongoose.Types.ObjectId().toString()
const jsonMalFormado = '{"firstName":"Jose","lastName":'

const cookie = {
    name:"",
    value:""
}

describe("Test de enpoints de user",()=>{

    before(async ()=>{
            await mongoose.connection.collection("users").deleteMany({})
    })

    it("Registro: Crear un usuario",async () => {
        const response = await requester.post("/api/users").send(user)
        expect(response._body).to.have.property("status","success")
        expect(response._body.payload).to.have.property("_id")
        expect(response._body.payload).to.have.property("firstName","Jose")
        expect(response._body.payload).to.have.property("lastName","Perez")
        userId = response._body.payload._id
    })

    it("Registro: Crear un segundo usuario",async () => {
        const response = await requester.post("/api/users").send(user2)
        expect(response.status).to.equal(201)
        expect(response._body).to.have.property("status","success")
        expect(response._body.payload).to.have.property("_id")
        user2Id = response._body.payload._id
    })

    it("Registro: Faltan campos obligatorios",async () => {
        const response = await requester.post("/api/users").send({firstName:"Pedro",lastName:"Diaz"})
        expect(response.status).to.equal(400)
        expect(response._body).to.have.property("status","error")
        expect(response._body.error).to.have.property("name","ValidationError")
        expect(response._body.error).to.have.property("code",2)
    })

    it("Registro: JSON mal formado",async () => {
        const response = await requester.post("/api/users").set("Content-Type","application/json").send(jsonMalFormado)
        expect(response.status).to.equal(400)
        expect(response._body).to.have.property("status","error")
        expect(response._body.error).to.have.property("name","InvalidJson")
        expect(response._body.error).to.have.property("code",2)
    })

    it("Registro: No se puede crear un admin",async () => {
        const admin = {...user2,email:"ana_admin@gmail.com",role:"admin"}
        const response = await requester.post("/api/users").send(admin)
        expect(response.status).to.equal(403)
        expect(response._body).to.have.property("status","error")
        expect(response._body.error).to.have.property("name","AdminCreationForbidden")
        expect(response._body.error).to.have.property("code",6)

        const adminEnDb = await mongoose.connection.collection("users").findOne({email:admin.email})
        expect(adminEnDb).to.be.null
    })

    it("Registro: El usuario ya existe",async () => {
        const response = await requester.post("/api/users").send(user)
        expect(response.status).to.equal(409)
        expect(response._body).to.have.property("status","error")
        expect(response._body.error).to.have.property("name","UserAlreadyExists")
        expect(response._body.error).to.have.property("code",5)
    })

    it("Listar: Obtener todos los usuarios",async () => {
        const response = await requester.get("/api/users")
        expect(response.status).to.equal(200)
        expect(response._body).to.have.property("status","success")
        expect(response._body.payload).to.be.an("array").with.lengthOf(2)

        const ids = response._body.payload.map(u => String(u._id))
        expect(ids).to.include.members([userId,user2Id])
    })

    it("Buscar por id: Usuario encontrado",async () => {
        const response = await requester.get(`/api/users/${userId}`)
        expect(response.status).to.equal(200)
        expect(response._body).to.have.property("status","success")
        expect(response._body.payload).to.have.property("_id",userId)
        expect(response._body.payload).to.have.property("firstName","Jose")
        expect(response._body.payload).to.have.property("lastName","Perez")
        expect(response._body.payload).to.have.property("email","jose_perez@gmail.com")
    })

    it("Buscar por id: ID inválido",async () => {
        const response = await requester.get(`/api/users/${idInvalido}`)
        expect(response.status).to.equal(400)
        expect(response._body).to.have.property("status","error")
        expect(response._body.error).to.have.property("name","InvalidId")
        expect(response._body.error).to.have.property("code",2)
    })

    it("Buscar por id: Usuario no encontrado",async () => {
        const response = await requester.get(`/api/users/${idInexistente}`)
        expect(response.status).to.equal(404)
        expect(response._body).to.have.property("status","error")
        expect(response._body.error).to.have.property("name","UserNotFound")
        expect(response._body.error).to.have.property("code",4)
    })

    it("Actualizar: Usuario actualizado",async () => {
        const response = await requester.put(`/api/users/${userId}`).send({lastName:"Gonzalez",isAvailable:false})
        expect(response.status).to.equal(200)
        expect(response._body).to.have.property("status","success")
        expect(response._body.payload).to.have.property("_id",userId)
        expect(response._body.payload).to.have.property("firstName","Jose")
        expect(response._body.payload).to.have.property("lastName","Gonzalez")
        expect(response._body.payload).to.have.property("isAvailable",false)

        const userFinded = await requester.get(`/api/users/${userId}`)
        expect(userFinded._body.payload).to.have.property("lastName","Gonzalez")
    })

    it("Actualizar: ID inválido",async () => {
        const response = await requester.put(`/api/users/${idInvalido}`).send({firstName:"Otro"})
        expect(response.status).to.equal(400)
        expect(response._body).to.have.property("status","error")
        expect(response._body.error).to.have.property("name","InvalidId")
        expect(response._body.error).to.have.property("code",2)
    })

    it("Actualizar: JSON mal formado",async () => {
        const response = await requester.put(`/api/users/${userId}`).set("Content-Type","application/json").send(jsonMalFormado)
        expect(response.status).to.equal(400)
        expect(response._body).to.have.property("status","error")
        expect(response._body.error).to.have.property("name","InvalidJson")
        expect(response._body.error).to.have.property("code",2)
    })

    it("Actualizar: Usuario no encontrado",async () => {
        const response = await requester.put(`/api/users/${idInexistente}`).send({firstName:"Otro"})
        expect(response.status).to.equal(404)
        expect(response._body).to.have.property("status","error")
        expect(response._body.error).to.have.property("name","UserNotFound")
        expect(response._body.error).to.have.property("code",4)
    })

    it("Eliminar: ID inválido",async () => {
        const response = await requester.delete(`/api/users/${idInvalido}`)
        expect(response.status).to.equal(400)
        expect(response._body).to.have.property("status","error")
        expect(response._body.error).to.have.property("name","InvalidId")
        expect(response._body.error).to.have.property("code",2)
    })

    it("Eliminar: Usuario no encontrado",async () => {
        const response = await requester.delete(`/api/users/${idInexistente}`)
        expect(response.status).to.equal(404)
        expect(response._body).to.have.property("status","error")
        expect(response._body.error).to.have.property("name","UserNotFound")
        expect(response._body.error).to.have.property("code",4)
    })




})