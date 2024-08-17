import { Express } from "express";
//router 
import homeRouter from "./home.router"
import productRouter from "./product.router";
import userRouter from "./user.router"
export default (app: Express) => {
    app.use("/api",homeRouter)
    app.use("/api/products",productRouter)
    app.use("/api/users",userRouter)
}