import mocksControllers from "../controllers/mocks.controllers.js";
import { Router } from "express";


const router = Router()

router.get("/users", mocksControllers.getUsers)
router.post("/users", mocksControllers.seedUsers)
export default router