import { config } from 'dotenv';
import { getConnection } from './config/database';
import express from "express";
//config env 
config()
//connect database
getConnection()
//connect redis 
import redis from './config/redis';
redis
const app = express();
//router
import adminRouter from "./routers/admin/index.router";
adminRouter(app)
//error handle 
import { errorHandler } from './middlewares/handleError.middleware';
app.use(errorHandler)

app.listen(process.env.PORT,() => {
    console.log("Server is running on port", process.env.PORT)
})