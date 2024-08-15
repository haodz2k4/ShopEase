import { Router } from 'express';
const router: Router = Router();
import * as controller from "../../controllers/admin/stock.controller";
//validate 
import * as validate from "../../validate/admin/stock.validate";
router.get("/",controller.index)
router.get("/detail/:id",controller.detail)
router.patch("/change-quantity/:id",controller.changeQuantity)
router.post("/add",validate.create,controller.addStock)
export default router