import mocksServices from "../services/mocks.services.js";

class MocksController{
    getUsers(req, res, next){
        try {
            const result = mocksServices.getUsers(req.query.qty)
            res.json({status: "success",payload: result})
        } catch (error) {
            next(error)
        }
    }

    async seedUsers(req, res, next){
        try {
            const result = await mocksServices.seedUsers(req.query.qty)
            res.status(201).json({status: "success",payload: result})
        } catch (error) {
            next(error)
        }
    }

    async generateData(req, res, next){
        try {
            const { users, orders, deliveries } = req.query
            const result = await mocksServices.generateData({ users, orders, deliveries })
            res.status(201).json({status: "success",payload: result})
        } catch (error) {
            next(error)
        }
    }
}

export default new MocksController()
