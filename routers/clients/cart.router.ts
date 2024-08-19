import { Router } from 'express';
const router: Router = Router()
import * as controller from "../../controllers/clients/cart.controller"
router.get("/",controller.index)
router.post("/add/:product_id",controller.add)
export default router