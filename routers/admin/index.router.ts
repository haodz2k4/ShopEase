import { requireAuth } from './../../middlewares/admin/auth.middleware';
import {Express} from "express"
import system from "../../config/system"
//routers 
import dashboardRouter from "./dashboard.router"
import productRouter from "./product.router";
import categoryRouter from "./category.router";
import stockRouter from "./stock.router";
import supplierRouter from "./supplier.router";
import wareHouseRouter from "./wareHouse.router";
import roleRouter from "./role.router";
import accountRouter from "./account.router"
import authRouter from "./auth.router";
import myAccountRouter from "./my-account.router";

const path = `/api/${system.prefixAdmin}`
export default (app: Express) => {
    app.use(`${path}/dashboard`,requireAuth,dashboardRouter)
    app.use(`${path}/products`,requireAuth,productRouter)
    app.use(`${path}/categories`,requireAuth,categoryRouter)
    app.use(`${path}/stocks`,requireAuth,stockRouter)
    app.use(`${path}/suppliers`,requireAuth,supplierRouter)
    app.use(`${path}/ware-houses`,requireAuth,wareHouseRouter)
    app.use(`${path}/roles`,requireAuth,roleRouter)
    app.use(`${path}/accounts`,requireAuth,accountRouter)
    app.use(`${path}/auth`,authRouter)
    app.use(`${path}/my-accounts`,myAccountRouter)
}