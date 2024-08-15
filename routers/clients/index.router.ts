import { Express } from "express";
//router 
import productRouter from "./home.router"
export default (app: Express) => {
    app.use("/api",productRouter)
}