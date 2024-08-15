import {Express} from "express"
import system from "../../config/system"
//routers 
import productRouter from "../../routers/admin/product.router";
import categoryRouter from "../../routers/admin/category.router";
const path = `/api/${system.prefixAdmin}`
export default (app: Express) => {
    app.use(`${path}/products`,productRouter)
    app.use(`${path}/categories`,categoryRouter)
}