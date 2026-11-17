import mocksControllers from "../controllers/mocks.controllers.js";
import { Router } from "express";


const router = Router()

router.get("/users", mocksControllers.getUsers)
router.post("/users", mocksControllers.seedUsers)
router.post("/generateData", mocksControllers.generateData)
export default router
