import { Router } from 'express';
const router: Router = Router();
import * as controller from "../../controllers/admin/stock.controller";
//validate 
router.get("/",controller.index)
router.get("/detail/:id",controller.detail)
router.patch("/change-quantity/:id",controller.changeQuantity)
router.post("/add",controller.addStock)
router.patch("/delete/:id",controller.deleteStock)
router.patch("/edit/:id",controller.editStock)
export default router