import { Router } from 'express';
const router: Router = Router();
import * as controller from "../../controllers/admin/stock.controller";
router.get("/",controller.index)
router.get("/detail/:id",controller.detail)
router.patch("/change-quantity/:id",controller.changeQuantity)

export default router