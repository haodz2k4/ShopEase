import { Router } from 'express';
const router: Router = Router()
import * as controller from "../../controllers/clients/cart.controller"
import { clearCacheMiddleware } from '../../middlewares/cache.middleware';
import { CACHE_KEY_GROUP } from './../../config/cache';
router.get("/",controller.index)
router.post("/add/:product_id",controller.add,clearCacheMiddleware(CACHE_KEY_GROUP.CARTS))
router.patch("/change-quantity/:product_id",controller.changeQuantity,clearCacheMiddleware(CACHE_KEY_GROUP.CARTS))
export default router