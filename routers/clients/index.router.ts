import { Express } from "express";
import { requireAuth } from "../../middlewares/admin/auth.middleware";
//router 
import homeRouter from "./home.router"
import productRouter from "./product.router";
export default (app: Express) => {
    app.use("/api",requireAuth,homeRouter)
    app.use("/api/products",requireAuth,productRouter)
}