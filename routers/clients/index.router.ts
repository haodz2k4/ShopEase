import { Express } from "express";
//router 
import homeRouter from "./home.router"
import productRouter from "./product.router";
import userRouter from "./user.router"
import authRouter from "./auth.router"

import { requireAuth } from "../../middlewares/clients/auth.middleware";
export default (app: Express) => {
    app.use("/api",homeRouter)
    app.use("/api/products",productRouter)
    app.use("/api/users",requireAuth,userRouter)
    app.use("/api/auth",authRouter)
}