import { Router } from 'express';
const router: Router = Router();
import * as controller from "../../controllers/clients/product.controller"
//middleware 
import { CACHE_KEY_GROUP } from '../../config/cache';
import { cacheMiddleware } from '../../middlewares/cache.middleware';
const cacheKey = 'products_cache'
router.get("/",cacheMiddleware(3600, CACHE_KEY_GROUP.PRODUCTS),controller.index)
router.get("/:slugCategory",controller.category)
router.get("/detail/:slug",cacheMiddleware(3600),controller.detail)
export default router