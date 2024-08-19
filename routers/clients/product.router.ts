import { Router } from 'express';
const router: Router = Router();
import * as controller from "../../controllers/clients/product.controller"
//middleware 
import { CACHE_KEY_GROUP } from '../../config/cache';
import { cacheByMethodAndUrl } from '../../middlewares/cache.middleware';
router.get("/",cacheByMethodAndUrl(3600, CACHE_KEY_GROUP.PRODUCTS),controller.index)
router.get("/:slugCategory",controller.category)
router.get("/detail/:slug",cacheByMethodAndUrl(3600),controller.detail)
export default router