import mongoose from "mongoose"
import dotenv from "dotenv"
import DeliveriesRepository from  "../src/repositories/deliveries.repo.js"
import {expect} from "chai"


dotenv.config()

mongoose.connect(process.env.MONGODB_URI_TEST)

