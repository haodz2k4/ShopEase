import { Express } from "express";
//router 
import homeRouter from "./home.router"
import productRouter from "./product.router";
import userRouter from "./user.router"
import authRouter from "./auth.router"
export default (app: Express) => {
    app.use("/api",homeRouter)
    app.use("/api/products",productRouter)
    app.use("/api/users",userRouter)
    app.use("/api/auth",authRouter)
}