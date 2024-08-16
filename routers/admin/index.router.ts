import {Express} from "express"
import system from "../../config/system"
//routers 
import productRouter from "./product.router";
import categoryRouter from "./category.router";
import stockRouter from "./stock.router";
import supplierRouter from "./supplier.router";
import wareHouseRouter from "./wareHouse.router";
import roleRouter from "./role.router";
import accountRouter from "./account.router"

const path = `/api/${system.prefixAdmin}`
export default (app: Express) => {
    app.use(`${path}/products`,productRouter)
    app.use(`${path}/categories`,categoryRouter)
    app.use(`${path}/stocks`,stockRouter)
    app.use(`${path}/suppliers`,supplierRouter)
    app.use(`${path}/ware-houses`,wareHouseRouter)
    app.use(`${path}/roles`,roleRouter)
    app.use(`${path}/accounts`,accountRouter)
}