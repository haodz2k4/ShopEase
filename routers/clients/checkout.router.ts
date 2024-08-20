import { Router } from 'express';
const router: Router = Router()
import * as controller from "../../controllers/clients/checkout.controller"
router.post("/order",controller.order)
router.get("/success/:id",controller.checkoutSuccess) 

export default router