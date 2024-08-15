import { Express } from "express";
//router 
import homeRouter from "./home.router"
import productRouter from "./product.router";
export default (app: Express) => {
    app.use("/api",homeRouter)
    app.use("/api/products",productRouter)
}