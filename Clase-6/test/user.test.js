import mongoose from "mongoose"
import dotenv from "dotenv"
import UsersRepository from  "../src/repositories/users.repo.js"
import {expect} from "chai"


dotenv.config()

mongoose.connect(process.env.MONGODB_URI_TEST)
const user = {
        id:"",
        firstName:"Jose",
        lastName:"Perez",
        email:"jose_perez@gmail.com",
        password:"123456"
}

describe("Testing Repository de Users", ()=>{

    before(async ()=>{
        await mongoose.connection.collection("users").deleteMany({})
    })

    it("Crear un usuario completo",async ()=>{
        const userCreated = await UsersRepository.create(user)
        user.id = userCreated._id
        expect(userCreated).to.have.property("_id")
        expect(userCreated).to.have.property("firstName","Jose")
        expect(userCreated).to.have.property("lastName","Perez")
    })

    it("Buscar usuario por id",async()=>{
        const userFinted = await UsersRepository.findById(user.id)
        expect(String(userFinted._id)).to.equal(String(user.id))
        expect(userFinted).to.have.property("firstName","Jose")
        expect(userFinted).to.have.property("lastName","Perez")
    })

    it("Buscar usuario por email",async()=>{
        const userFinted = await UsersRepository.findByEmail(user.email)
        expect(String(userFinted._id)).to.equal(String(user.id))
        expect(userFinted).to.have.property("email","jose_perez@gmail.com")
        expect(userFinted).to.have.property("firstName","Jose")
    })

    it("Buscar todos los usuarios",async()=>{
        const users = await UsersRepository.findAll()
        expect(users).to.be.an("array")
    })

    it("Actualizar un usuario",async()=>{
        const userUpdated = await UsersRepository.update(user.id,{firstName:"Jose Luis"})
        expect(String(userUpdated._id)).to.equal(String(user.id))
        expect(userUpdated).to.have.property("firstName","Jose Luis")
        expect(userUpdated).to.have.property("lastName","Perez")
    })

    it("Eliminar un usuario",async()=>{
        const userDeleted = await UsersRepository.delete(user.id)
        expect(String(userDeleted._id)).to.equal(String(user.id))
 
        const userFinted = await UsersRepository.findById(user.id)
        expect(userFinted).to.be.null
    })






})


